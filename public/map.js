const TOKEN = 'pk.eyJ1IjoiYWx3YXlzbmFjeSIsImEiOiJja3EyNDhna2kwMGltMm9vOWs2MWoxbXh1In0.q64q2fm-Gs47J0VPYlomhQ'
const tileUrl = `https://api.mapbox.com/styles/v1/alwaysnacy/tiles/{z}/{x}/{y}?access_token={${TOKEN}}`
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// initialize variables
let country;
let mydata;
let info = {
    Latitude: 0,
    Longtiude: 0
};

fetch("./worldinfo.json")
.then(response => {
   return response.json();
})
.then(data => {
    console.log(data[1]);
    mydata = data;
});

let mapStyles = 'satellite-streets-v11';

const mymap = L.map('mapid').setView([-5, 20], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: `mapbox/${mapStyles}`,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN
}).addTo(mymap);

const countryForm = document.querySelector("#countryForm")
// zoom to specific country
countryForm.addEventListener('submit', function(e) {
    country = countryForm.elements.country.value;
    info = mydata.find(element => element.country === country)
    console.log(info)
    console.log(info.latitude, info.longitude)
    var zoom = 5;
    mymap.setView([info.latitude, info.longitude], zoom);
    e.preventDefault();
    
})

let popup = L.popup();
// when a spot is clicked, get the latitude and longitude of that spot --> send API request to OpenWeather
// Get the place's geographical information and weather information
async function onMapClick(e) {
    const OWM_KEY = "0e6aaaf70d0751c80e78751f4c53c371"
    const URL_OWM = `http://api.openweathermap.org/data/2.5/weather?appid=${OWM_KEY}&units=metric`
    let lat = e.latlng.wrap().lat;
    let lng = e.latlng.wrap().lng
    console.log(lat, lng)
    fetch((`${URL_OWM}&lat=${lat}&lon=${lng}`))
        .then(res => {
            return res.json()
        }).then(data => {
            popup
            .setLatLng(e.latlng)
            .setContent(`<p>This is <b>${data.name}</b><br> The temperature is <b>${data.main.temp} ℃ </b><br> Today is ${data.weather[0].main}<br>
            <a class="click" href="/map">details</a></p>`)
            .openOn(mymap)
            .on('click', async function () {
                console.log("HI")
            });
            
        }).catch(e => {
            console.log(e)
        })
}

mymap.on('click', onMapClick);

// hide the datalist when there is nothing the input yet
const datalist = document.querySelector('datalist');
const input = document.querySelector('input')
input.addEventListener('input', () => {
    datalist.id = "datalistOptions"
})

function setStyles(str) {
    mapStyles = str;
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: `mapbox/${mapStyles}`,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN
}).addTo(mymap);
}