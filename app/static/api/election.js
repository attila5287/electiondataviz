// CODE WORKS HOWEVER RUNS SLOWLY DUE TO NEW MAP EVERY CHANGE ON SLIDER
const urlPrezTest = '../static/data/csv/president.csv';

function presidentialUp( url, year ) {
  const formt = d3.format( ',' );
  const formatDecimal = d3.format( '.4' );
  var map = null;
  d3.csv( url, ( error, data ) => {
    if ( error ) {
      console.error( error );
    } else {
      // ------------ 
      const colors = {
        republican: "red",
        democrat: "blue"
      };

      let winners = {};

      const nested = d3.nest()
        .key( function ( d ) {
          return d.state;
        } )
        .key( function ( d ) {
          return d.party;
        } )
        .rollup( function ( v ) {
          return d3.max( v, function ( d ) {
            return d.candidatevotes;
          } );
        } )
        .entries( data.filter( d => d[ "year" ] == year ) );

      nested.forEach( d => {
        winners[ d.key ] = d.values[ 0 ].key;
      } );

      console.log( 'winners :>> ', winners );

      statesData.features.forEach( d => {
        const nameState = d.properties.name;
        d.properties[ "winner" ] = winners[ nameState ];
        d.properties[ "color" ] = colors[ winners[ nameState ] ];
        // console.log('d :>> ', d.properties);
      } );

      // -------------------------------
    }

    var mapboxAccessToken = "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";

    var container = L.DomUtil.get( 'map' );

    if ( container != null ) {
      container._leaflet_id = null;
    }

    map = L.map( 'map' ).setView( [ 37.8, -96 ], 4 );

    L.tileLayer( 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
      id: 'mapbox/dark-v10',
      attribution: '<a href="https://www.openstreetmap.org/"> @attila5287 </a> Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        'Imagery © ' + '<a href="https://www.mapbox.com/">Mapbox</a>',
      tileSize: 512,
      zoomOffset: -1
    } ).addTo( map );

    map.createPane( 'labels' );
    map.getPane( 'labels' ).style.zIndex = 650;
    map.getPane( 'labels' ).style.pointerEvents = 'none';

    var positronLabels = L.tileLayer( 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    } ).addTo( map );

    function style( feature ) {
      return {
        fillColor: getColor( feature.properties.winner ),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

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

    // method that we will use to update the control based on 
    // feature properties passed

    info.update = function ( props ) {
      const dictInfoText = {
        republican: "text-danger",
        democrat: "text-primary"
      };
      this._div.innerHTML = '<h4>US Election </h4>' + ( props ?
        '<i class="text-secondary ' + dictInfoText[ props.winner ] + ' ">' + props.name + '<br />' + props.winner :
        'Hover over a state</i>'
      );
    };

    info.addTo( map );

    var legend = L.control( {
      position: 'bottomright'
    } );

    legend.onAdd = function ( map ) {
      var div = L.DomUtil.create( 'div', 'info legend' ),
        partyNames = [ "republican", "democrat" ],
        colors = [ "#d73027", "#4575b4" ];

      // loop through our deaths intervals and generate a label with a colored square for each interval
      for ( var i = 0; i < partyNames.length; i++ ) {
        div.innerHTML +=
          '<h4 class="text-light rounded-xl px-2 py-1 mb-2" style="background:' + colors[ i ] +
          ';">' +
          partyNames[ i ] +
          '</h4> ';
      }

      return div;

    };

    legend.addTo( map );

    geojson = L.geoJson( statesData, {
      style: style,
      onEachFeature: onEachFeature
    } ).addTo( map );

    function getColor( d ) {
      const partyColor = {
        republican: "#d73027",
        democrat: "#4575b4"
      };
      // console.log( 'colors[d] :>> ', partyColor[ d ] );
      return partyColor[ d ];
    } 

    // --------------------- SLIDER ----------------
    // console.log('data :>> ', data);

    d3.select( "#slider" ).on( "change", function () {
      slideMyYears( +this.value );
      // console.log('test d3-slider: +this.value :>> ', +this.value);
      presidentialUp( urlPrezTest, +this.value );
      onlyColorUp( +this.value );
    } );

    function slideMyYears( slider ) {
      // adjust the text on the range slider
      d3.select( "#sliderValue" ).text( slider );
      d3.select( "#slider" ).property( "value", slider );
    }

    function onlyColorUp( selectedYear ) {
      console.log( 'onlyColorUp selected year :>> ', selectedYear );
      const colors = {
        republican: "red",
        democrat: "blue"
      };
      let winners = {};
      const nested = d3.nest()
        .key( function ( d ) {
          return d.state;
        } )
        .key( function ( d ) {
          return d.party;
        } )
        .rollup( function ( v ) {
          return d3.max( v, function ( d ) {
            return d.candidatevotes;
          } );
        } )
        .entries( data.filter( d => d[ "year" ] == selectedYear ) );


      nested.forEach( d => {
        winners[ d.key ] = d.values[ 0 ].key;
      } );

      // console.log( 'winners :>> ', winners );

      statesData.features.forEach( d => {
        const nameState = d.properties.name;
        d.properties[ "winner" ] = winners[ nameState ];
        d.properties[ "color" ] = colors[ winners[ nameState ] ];
        // console.log('d :>> ', d.properties);
      } );

      geojson = L.geoJson( statesData, {
        style: style,
        onEachFeature: onEachFeature
      } ).addTo( map );


    }

    slideMyYears( year );

  } );

}

presidentialUp( urlPrezTest, 2008 );
