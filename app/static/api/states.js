const formt = d3.format( ',' );
const formatDecimal = d3.format( '.4' );
let strdate = getOffsetDate( 1, "mm-dd-yyyy" );
console.log( 'strdate :>> ', strdate );
// console.log('statesData :>> ', statesData);
var urlBase = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/';

let urlCompiled = urlBase + strdate + ".csv";

d3.csv( urlCompiled,
    ( error, csvData ) => {
        if ( error ) {
            console.error( error );
        } else {
            let dictDeaths = {};
            let dictConfirmed = {};
            for ( let index = 0; index < csvStateNames.length; index++ ) {
                const name = csvStateNames[ index ];
                const row = csvData[ index ];
                dictDeaths[ name ] = +row.Deaths;
                dictConfirmed[ name ] = +row.Confirmed;
            }
            statesData.features.forEach( stateJSON => {
                stateJSON.properties[ 'deaths' ] = dictDeaths[ stateJSON.properties.name ]
                stateJSON.properties[ 'confirmed' ] = dictConfirmed[ stateJSON.properties.name ]
            } );
            // renderDynamicTable(prepDataFromCSV(csvData));
            // renderDynamicTable(prepDataFromCSV(csvData));
            // console.log( 'statesData AFTER :>> ', statesData );

            var mapboxAccessToken = "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";
            var map = L.map( 'map' ).setView( [ 37.8, -96 ], 4 );

            L.tileLayer( 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
                id: 'mapbox/dark-v10',
                attribution: '<a href="https://www.openstreetmap.org/"> @attila5287 </a> Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    'Imagery © ' + '<a href="https://www.mapbox.com/">Mapbox</a>',
                tileSize: 512,
                zoomOffset: -1
            } ).addTo( map );

            map.createPane('labels');
            map.getPane('labels').style.zIndex = 650;
            map.getPane('labels').style.pointerEvents = 'none';    

            var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
                    attribution: '©OpenStreetMap, ©CartoDB',
                    pane: 'labels'
            }).addTo(map);              
        }
            
            // feature fill colors gets colors from obj-prop-deaths value
            function style( feature ) {
                return {
                    fillColor: getColor( feature.properties.deaths ),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }

            // Adding Interaction
            function highlightFeature( e ) {
                var layer = e.target;

                layer.setStyle( {
                    weight: 5,
                    color: '#2aa198',
                    dashArray: '',
                    fillOpacity: 0.7
                } );

                info.update( layer.feature.properties );
            }

            function zoomToFeature( e ) {
                map.fitBounds( e.target.getBounds() );
            }

            function resetHighlight( e ) {
                geojson.resetStyle( e.target );
                info.update();
            }

            function onEachFeature( feature, layer ) {
                layer.on( {
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                } );
            }

            var info = L.control();

            info.onAdd = function ( map ) {
                this._div = L.DomUtil.create( 'div', 'info' ); // create a div with a class "info"
                this.update();
                return this._div;
            };

            info.update = function ( props ) {
                this._div.innerHTML = '<h4>US States COVID-19</h4>' + ( props ?
                    '<b>' + props.name + '</b><br />' + formt( props.deaths ) + ' deaths ' + formt( props.confirmed ) + ' confirmed' :
                    'Hover over a state' );
            };
            info.addTo( map );

            var legend = L.control( {
                position: 'bottomright'
            } );

            legend.onAdd = function ( map ) {

                var div = L.DomUtil.create( 'div', 'info legend' ),
                    grades = [ 0, 200, 500, 500, 1000, 2000, 5000, 10000 ],
                    labels = [];

                // loop through our deaths intervals and generate a label with a colored square for each interval
                for ( var i = 0; i < grades.length; i++ ) {
                    div.innerHTML +=
                        '<i style="background:' + getColor( grades[ i ] + 1 ) + ';"></i> ' +
                        grades[ i ] + ( grades[ i + 1 ] ? '&ndash;' + grades[ i + 1 ] + '<br>' : '+' );
                }

                return div;
            };

            legend.addTo( map );

            geojson = L.geoJson( statesData, {
                style: style,
                onEachFeature: onEachFeature
            } ).addTo( map );


            // Adding colorBrewer colors
            function getColor( d ) {
                return d > 10000 ? '#084594' :
                    d > 5000 ? '#2181b5' :
                    d > 1000 ? '#4292c6' :
                    d > 500 ? '#6baed6' :
                    d > 250 ? '#9ecae1' :
                    d > 100 ? '#c6dbef' :
                    d > 50 ? '#f7fbff' :
                    '#deebf7';
            }


            geojson = L.geoJson( statesData, {
                style: style,
                onEachFeature: onEachFeature
            } ).addTo( map );


    } );

//function to get date string with offset and format
function getOffsetDate( offset, format ) {
    var tday;
    var today = new Date();

    today.setDate( today.getDate() - offset );
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if ( dd < 10 ) {
        dd = '0' + dd;
    }

    if ( mm < 10 ) {
        mm = '0' + mm;
    }

    if ( format == "yyyy-mm-dd" )
        tday = yyyy + '-' + mm + '-' + dd;
    else if ( format == "mm-dd-yyyy" )
        tday = mm + '-' + dd + '-' + yyyy;
    else
        tday = yyyy + '-' + mm + '-' + dd;

    return tday;
}
