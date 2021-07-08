// let statesData;

// fetch("./us-states.js")
// .then(response => {
//    return response.json();
// })
// .then(data => {
//     console.log(data[1]);
//     statesData = data;
// });


const TOKEN = 'pk.eyJ1IjoiYWx3YXlzbmFjeSIsImEiOiJja3EyNDhna2kwMGltMm9vOWs2MWoxbXh1In0.q64q2fm-Gs47J0VPYlomhQ'
// Initialize the map
const mymap = L.map('mapid').setView([37.8, -96], 5);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// mymap.on('load', function() {

//     // Add source for admin-1 Boundaries
//     mymap.addSource('admin-1', {
//       type: 'vector',
//       url: 'mapbox://mapbox.boundaries-adm1-v3'
//     });
  
//     // Add a layer with boundary polygons
//     mymap.addLayer(
//       {
//         id: 'admin-1-fill',
//         type: 'fill',
//         source: 'admin-1',
//         'source-layer': 'boundaries_admin_1',
//         paint: {
//           'fill-color': '#CCCCCC'
//         }
//       },
//       // This final argument indicates that we want to add the Boundaries layer
//       // before the `waterway-label` layer that is in the map from the Mapbox
//       // Light style. This ensures the admin polygons will be rendered on top of
//       // the
//       'waterway-label'
//     );
//   });


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN
}).addTo(mymap);

L.geoJson(statesData).addTo(mymap);

function onMapClick(e) {
    var popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
        d > 100  ? '#FC4E2A' :
        d > 50   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };                
}

L.geoJson(statesData, {style: style}).addTo(mymap);

function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
}
info.update(layer.feature.properties);
}

var geojson;
function resetHighlight(e) {
 geojson.resetStyle(e.target);
 info.update();
}

function zoomToFeature(e) {
mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
});
}

geojson = L.geoJson(statesData, {
style: style,
onEachFeature: onEachFeature
}).addTo(mymap);

var info = L.control();

info.onAdd = function (map) {
this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
this.update();
return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
};

info.addTo(mymap);