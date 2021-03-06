// Author:Buddy Collins

// I liked this map better than the gray one

var map = L.map('mapid').setView([40.7393024, -73.9652925], 11);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//-----------------------------------------------------------------------------------------------------------------------
// addes the popups to each Feature
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add all feature property names and values to html string not just the ones you want all
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

$.getJSON("data/pickup_sample.geojson", function(response){
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "blue",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };
  L.geoJson(response, {
    pointToLayer: function (feature, latlng){
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});
