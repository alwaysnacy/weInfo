const TOKEN = 'pk.eyJ1IjoiYWx3YXlzbmFjeSIsImEiOiJja3EyNDhna2kwMGltMm9vOWs2MWoxbXh1In0.q64q2fm-Gs47J0VPYlomhQ'
const tileUrl = `https://api.mapbox.com/styles/v1/alwaysnacy/tiles/{z}/{x}/{y}?access_token={${TOKEN}}`
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
let country = "vietnam"
//import wprldinfo from './worldinfo.js';
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

const mymap = L.map('mapid').setView([0, 0], 1);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN
}).addTo(mymap);

const countryForm = document.querySelector("#countryForm")

countryForm.addEventListener('submit', function(e) {
    country = countryForm.elements.country.value;
    console.log(country, 'hic')
    info = mydata.find(element => element.country_code === country)
    console.log(info)
    //var marker = L.marker([lat, lng],{}).addTo(map);
    console.log(info.latitude, info.longitude)
    var zoom = 5;
    mymap.setView([info.latitude, info.longitude], zoom);
    e.preventDefault();
    
})


var marker = L.marker([90, 180]).addTo(mymap);
var marker2 = L.marker([-90, -180]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

async function onMapClick(e) {
    var popup = L.popup();
    const OWM_KEY = "0e6aaaf70d0751c80e78751f4c53c371"
    const URL_OWM = `http://api.openweathermap.org/data/2.5/weather?appid=${OWM_KEY}&units=metric`
    let lat = e.latlng.lat;
    let lng = e.latlng.lng
    console.log(lat, lng)
    fetch((`${URL_OWM}&lat=${lat}&lon=${lng}`))
        .then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            popup
            .setLatLng(e.latlng)
            .setContent(`You clicked the map at ${data.main.temp} ℃`)
            .openOn(mymap);
        }).catch(e => {
            console.log(e)
        })
}

mymap.on('click', onMapClick);
