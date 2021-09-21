//Author Buddy Collins

// I liked this map better than the gray one 

var map = L.map('mapid').setView([20, 0], 2);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYnVkZHl0aGVlbGYiLCJhIjoiY2p2czYxbHNlMndjdzN5cGI3ejI4aWJ5dyJ9.5IPoN9dD2-6boYGfX4ondQ'
}).addTo(map);

//-----------------------------------------------------------------------------------------------------------------------
// addes the popups to each Feature
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

$.getJSON("data/MegaCities.geojson", function(response){
  //create a Leaflet GeoJSON layer and add it to the map
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  L.geoJson(response, {
    pointToLayer: function (feature, latlng){
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});
