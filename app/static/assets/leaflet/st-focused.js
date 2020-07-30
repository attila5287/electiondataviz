function stateFocusMap(data, stateName){
  let mapWidth = $( `#map` ).width();
  let mapHeight = 0.4 * mapWidth;

  // console.log('mapW :>> ', mapWidth);
  let margin = {
    top: 20,
    right: 50,
    left: 50,
    bottom: 25,
  };
    // console.log('stateName :>> ', stateName);
      // ------------ 
      const colors = {
        republican: "red",
        democrat: "blue",
        "democratic-farmer-labor": "blue"
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
        .entries( data.filter( d => d[ "year" ] == "2016" ) );

      nested.forEach( d => {
        winners[ d.key ] = d.values[ 0 ].key;
      } );

      // console.log( 'winners :>> ', winners );

      statesData.features.forEach( d => {

        const nameState = d.properties.name;
        if (stateName == nameState) {
          // console.log('stateName :>> ', stateName);
          d.properties[ "winner" ] = 'selected';
        } else {
          d.properties[ "winner" ] = winners[ nameState ];
          // console.log('d :>> ', d.properties);
        }

      } );

      let totalByYear = d3.nest()
          .key( d =>  d.year )
          .key( d =>  d.party )
        .rollup( function ( v ) {
          return d3.max( v, function ( d ) {
            return d.candidatevotes;
          } );
        } )
        .entries( data );
      // console.log('presidentialUp|set up map for selected year :', year);  
      // // console.log('totalByYear :>> ', totalByYear);
      // -------------------------------
    

    var mapboxAccessToken = "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";

    var container = L.DomUtil.get( 'map' );

    if ( container != null ) {
      container._leaflet_id = null;
    }

    map = L.map( 'map' ).setView( [ 37.8, -96 ], 4 );

    L.tileLayer( 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
      id: 'mapbox/dark-v10',
      attribution: '<a href="https://github.com/attila5287/electiondataviz"> @attila5287 </a> <a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
        ' ' + '<a href="https://www.mapbox.com/">Mapbox</a>',
      tileSize: 512,
      zoomOffset: 0
    } ).addTo( map );

    map.createPane( 'labels' );
    map.getPane( 'labels' ).style.zIndex = 650;
    map.getPane( 'labels' ).style.pointerEvents = 'none';

    var positronLabels = L.tileLayer( 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: ' ©CartoDB',
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
      const bgColors = {
        republican: "bg-danger",
        democrat: "bg-info",
        selected: "bg-warning",
      };
      const btnColors = {
        republican: "btn-danger",
        democrat: "btn-info",
        selected: "btn-warning",
      };
      const textColors = {
        republican: "text-danger",
        democrat: "text-primary",
        selected : "text-info",
      };

      const partyAbbr = {
        "republican" : "(R)" ,
        "democrat" : "(D)" ,
        "selected" : "(current)" ,
      };
      this._div.innerHTML = '<a class="btn bg-coral text-md text-bold text-balo text-center shadow-after text-light rounded-2xl py-2 px-3  mb-2 ">Presidential 2016</a>' + ( props ?
        '<br><a class="btn btn-lg shadow-after text-balo text-onerem text-nowrap text-center text-light py-1 px-3 rounded-2xl mt-2 '
          + btnColors[ props.winner ] 
          +'">' 
          + props.name 
          + ' '
          + partyAbbr[props.winner] 
          + '</a>' :
        '<br><strong class="text-balo text-light">Hover over a state</strong>'
      );
    };

    info.addTo( map );

    var legend = L.control( {
      position: 'bottomright'
    } );

    legend.onAdd = function ( map ) {
      var div = L.DomUtil.create( 'div', 'legend' ),
        partyNames = [ 
          "republican", 
          "democrat", 
          "selected" ,
        ],
        colors = [ 
          "#d73027", 
          "#4575b4", 
          "#ffbb00", 
        ];

      // loop through our deaths intervals and generate a label with a colored square for each interval
      for ( var i = 0; i < partyNames.length; i++ ) {
        div.innerHTML +=
          '<h5 class="text-light text-balo text-center rounded-2xl px-2 py-1 mb-2" style="background:' + colors[ i ] +
          ';">' +
          partyNames[ i ] +
          '</h5> ';
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
        republican: "#ff6a657e",
        democrat: "#5093ff81",
        "democratic-farmer-labor": "#5093ff",
        "selected": "#ffbb00",
      };
      // console.log( 'colors[d] :>> ', partyColor[ d ] );
      return partyColor[ d ];
    } 

  }
