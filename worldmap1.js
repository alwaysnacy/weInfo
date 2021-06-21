const TOKEN = 'pk.eyJ1IjoiYWx3YXlzbmFjeSIsImEiOiJja3EyNDhna2kwMGltMm9vOWs2MWoxbXh1In0.q64q2fm-Gs47J0VPYlomhQ'
const mymap = L.map('mapid').setView([0, 0], 1);
const tileUrl = `https://api.mapbox.com/styles/v1/alwaysnacy/tiles/{z}/{x}/{y}?access_token={${TOKEN}}`
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN
}).addTo(mymap);
var marker = L.marker([51.5, -0.09]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

function onMapClick(e) {
    var popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);