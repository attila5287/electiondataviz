// well, after much seeking i realized it's well documented at http://leafletjs.com/examples/layers-control.html

// i've ended not repainting the map, but print it once and repaint the points on each new ajax call, so the problem was how to clean up the old points and print only the new ones. i've ended doing this:

// so, at each new ajax call, before painting the new points, i do the following:

for (i=0;i<points.length;i++) {
  map.removeLayer(points[i]);
}
points=[];

// so far, so good :-)


<div id="weathermap"></div>


function buildMap(lat,lon)  {
    document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    var map = new L.Map('map');
    map.setView(new L.LatLng(lat,lon), 9 );
    map.addLayer(osmLayer);
    var validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
    map.addLayer(validatorsLayer);
}
