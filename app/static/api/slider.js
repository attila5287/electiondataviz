var map = null;
// Store our API endpoint inside queryUrl
var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
initMap();
function initMap () {
  d3.json( queryUrl, function ( data ) {
    // console.log(data)
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures( data, 7 );
  } );
}

function createFeatures( data, n ) {
  console.log( 'test data :>> ', data.features[ n - 1 ].properties.place );
  const earthquakeData = {
    features: []
  };
  const copyWithoutChange = [
    "type", "metadata", "bbox"
  ];
  copyWithoutChange.forEach( key => {
    earthquakeData[ key ] = data[ key ];
  } )
  for ( let i = 0; i < n; i++ ) {
    // console.log('i :>> ', i);
    // console.log('test for loop :>> ', data.features[i] );
    earthquakeData.features.push( data.features[ i ] );
  }

  // console.log('earthq :>> ', earthquakeData);
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature( feature, layer ) {
    layer.bindPopup( "<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date( feature.properties.time ) + "</p>" );
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON( earthquakeData, {
    onEachFeature: onEachFeature
  } );
  

  // Sending our ``earthquakes`` layer to the createMap function
  createMap( earthquakes );
  // updateMap( earthquakes );
}

function updateMap( earthquakes ) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw" );

  var darkmap = L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw" );

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  
  updateLayers(earthquakes);

  function updateLayers(earthquakes) {
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map( "map", {
      center: [
        37.09, -116.71
      ],
      zoom: 5,
      layers: [ streetmap, earthquakes ]
    } );

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers( baseMaps, overlayMaps, {
      collapsed: false
    } ).addTo( myMap );
  }
}

function createMap( earthquakes ) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw" );

  var darkmap = L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw" );

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  updateLayers(earthquakes);

  function updateLayers(earthquakes) {
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map( "map", {
      center: [
        37.09, -116.71
      ],
      zoom: 5,
      layers: [ streetmap, earthquakes ]
    } );

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers( baseMaps, overlayMaps, {
      collapsed: false
    } ).addTo( myMap );
  }
}

function slideMyYears( slider ) {
  // adjust the text on the range slider
  d3.select( "#sliderValue" ).text( slider );
  d3.select( "#slider" ).property( "value", slider );
}

function updateM4p ( data ) {
  console.log('object :>> ', data);
  for (i=0;i<points.length;i++) {
  map.removeLayer(points[i]);
} 
points=[];
//  Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers( baseMaps, overlayMaps, {
  collapsed: false
} ).addTo( myMap );
}

d3.select( "#slider" ).on( "input", function () {
  let thisValue = this.value;
  slideMyYears( +this.value );
  // console.log( '+this.value in slider :>> ', +this.value );
  // console.log( 'test slider value :>> ', +this.value );
  
  // Perform a GET request to the query URL
  d3.json( queryUrl, function ( data ) {
    console.log( 'thisValue :>> ', thisValue );
    // console.log(data);
    // console.log(thisValue);


    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures( data, thisValue );
  } );

} );
