
function createMap() {
  // Add a tile layers
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});
    // Create a baseMaps object to hold the street & lightmap layer
  var baseMaps = {
    "Light Map": lightMap,
    "Dark Map": darkMap
  };

  // Create an overlayMaps object to hold the earthquake layer
  var overlayMaps = {
    "Earthquakes": earthquake
  };

  // Create the map object with options
  // Create a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [lightMap,earthquake]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });
  // Then add all the details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var magnitude = [0, 1, 2, 3, 4, 5];
    var colorKey = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colorKey[i] + "'></i> " +
        magnitude[i] + (magnitude[i + 1] ? "&ndash;" + magnitude[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // Finally, we our legend to the map.
  legend.addTo(map);
}


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function getRadius(magnitude) {
    return magnitude * 3.5;
};

var earthquake = new L.LayerGroup();

d3.json(url, function(eqData) {
     //console.log(eqData);
     // Here we add a GeoJSON layer to the map once the file is loaded.
     L.geoJSON(eqData.features,{
       // We turn each feature into a circleMarker on the map.
       pointToLayer:function (eqPoint, latlng) {
         return L.circleMarker(latlng, {radius: getRadius(eqPoint.properties.mag)});
       },

       // We set the style for each circleMarker using our style function.
       style: function (eqDataFeature) {
         return {
           fillColor: color(eqDataFeature.properties.mag),
           fillOpacity: 0.75,
           weight: 0.1,
           color: 'white'
         }

       },
       // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
       onEachFeature: function (feature, layer) {
         layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
       }
     }).addTo(earthquake);
     createMap(earthquake);
   });


function color(magnitude) {
    // We create a fillColor for the style function using magnitude
    if (magnitude > 5) {
        return "#C0392B"
    } else if (magnitude > 4) {
        return "#D35400"
    } else if (magnitude > 3) {
        return "#E67E22"
    } else if (magnitude > 2) {
        return "#F39C12"
    } else if (magnitude > 1) {
        return "#F1C40F"
    } else {
        return "#2ECC71"
    }
};

function legend() {


}
