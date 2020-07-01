
const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
d3.json(url, function(error, data) {
  if (error) {
    console.log('error :>> ', error);
  } else {
    
    bubbleUpMyWorld(data);
  }
});


// bubbleUpMyWorld(testdata);

function bubbleUpMyWorld(data) {
  const format = d3.format( ',' );
let coordByName = {},
    abCodeByName = {},
    popByName = {};

data.locations.forEach(d => { 
  const name = d.country;
  coordByName[name] = d.coordinates;
  popByName[name] = +d.country_population;
  abCodeByName[name] = d.country_code;
}) 

// console.log('coordByName:',coordByName);
// console.log('popByName :>> ', popByName);

const groupedByDeaths = d3.nest()
  .key(function(d) { return d.country; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.latest.deaths; }); })
  .entries(data.locations);
  // console.log('groupedByDeaths :>> ', groupedByDeaths.length)

const names = groupedByDeaths.map((d) => d.key);
// console.log('names :>> ', names);

const groupedByConfirmed = d3.nest()
  .key(function(d) { return d.country; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.latest.confirmed; }); })
  .entries(data.locations)
  ;

  // console.log('groupedByConfirmed :>> ', groupedByConfirmed.length);

let deathsByName = {},
    confirmedByName = {};

groupedByDeaths.forEach(d => {
  deathsByName[d.key] = +d.value;
})

groupedByConfirmed.forEach((d) => {
  confirmedByName[d.key] = +d.value;
})

// console.log('deathsByName :>> ', deathsByName);
// console.log('confirmedBy :>> ', confirmedByName);



// quick info: need to generate unique objects with coordinate and figures
// refresh memory: there are 266 entries but only 187 unique country names

const locations = names.map(name => {
  return {
    coordinates: [coordByName[name].latitude, coordByName[name].longitude],
    confirmed: {
      'name': abCodeByName[name],
      'numOfPersons' : confirmedByName[name]
    },
    deaths: {
      'name': name,
      'numOfPersons' : deathsByName[name]
    }
  };
  
})



// Function to determine marker size based on numOfPersons
function markerSize( numOfPersons ) {
  return numOfPersons * 2;
}

// Define arrays to hold created city and state markers
var deathsMarkers = [];
var confirmedMarkers = [];

// Loop through locations and create city and state markers
for ( var i = 0; i < locations.length; i++ ) {
  // Setting the marker radius for the state by passing numOfPersons into the markerSize function
  confirmedMarkers.push(
    L.circle( locations[ i ].coordinates, {
      stroke: false,
      fillOpacity: 0.45,
      color: "#002B36",
      fillColor: "#002B36",
      radius: markerSize( locations[ i ].confirmed.numOfPersons )
    } ).bindPopup(`<h2>${locations[ i ].confirmed.name}</h2><hr><h3>Confirmed:${format(locations[ i ].confirmed.numOfPersons)}</h3>`)
  );
  // Setting the marker radius for the city by passing numOfPersons into the markerSize function
  deathsMarkers.push(
    L.circle( locations[ i ].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "#2aa198",
      radius: markerSize( locations[ i ].deaths.numOfPersons ),
    } )
    .bindPopup(`<h3>${locations[ i ].deaths.name}</h3><hr><h3>Deaths:${format(locations[ i ].deaths.numOfPersons)}</h3>`)
    );
}
var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw"
);

// Define variables for our base layers
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw"
);

// Create two separate layer groups: one for deaths and one for states
var confirmed = L.layerGroup( confirmedMarkers );
var deaths = L.layerGroup( deathsMarkers );

// Create a baseMaps object
var baseMaps = {
  "Dark Map": darkmap,
  "Street Map": streetmap,
};

// Create an overlay object
var overlayMaps = {
  "Confirmed Cases": confirmed,
  "Deaths": deaths
};

// Define a map object
var myMap = L.map( "map", {
  center: [ 37.09, -95.71 ],
  zoom: 3,
  layers: [ darkmap, confirmed, deaths ]
} );

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers( baseMaps, overlayMaps, {
  collapsed: false
} ).addTo( myMap );

  
}


// change
