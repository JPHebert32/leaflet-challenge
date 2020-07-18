d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(earthquakeData) {
     console.log(earthquakeData);

     // Create a map object
     var myMap = L.map("map", {
       center: [37.09, -95.71],
       zoom: 5
     });

     // Add a tile layer
     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
       tileSize: 512,
       maxZoom: 18,
       zoomOffset: -1,
       id: "mapbox/streets-v11",
       accessToken: API_KEY
     }).addTo(myMap);

     earthquakeData.forEach(function(data) {
        if (data.features && data.features.coordinates) {
            var latlng = [data.geometry.coordinates[1], data.geometry.coordinates[0]];
            console.log(latlng);
            // var marker = L.marker(latlng)
            //marker.bindPopup(`<p>${data.descript}</p>`);
            marker.addTo(myMap);
        }
    });

    // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  function styleInfo(feature) {
      return {
  }}
  function getColor(magnitude) {
  }
  function getRadius(magnitude) {
  }


});
