// d3 works w/ slider in two ways input or change but we have three CSVs so one of them needs to be imported every call, which
function importPrezCSV( year ) { //second csv import w/ slider update
  const fComma = d3.format( ',' );
  const fDecimal = d3.format( '.3' );
    
  d3.csv( '../static/data/csv/president.csv',
    ( error, data ) => {//all functions using this csv after async csv import 
      
      updateRows( data, 2016 ); //tr elements
      slideMyYears( 2016 );
      houseSeatsCirclesUp( data, 2016 ); //d3 svg

      // --------------------- SLIDER ----------------
      d3.select( "#slider" ).on( "change", function () {
        updateRows( data, +this.value );
        onlyColorUp( +this.value ); //update map colors ea. elctn
        slideMyYears( +this.value );
        houseSeatsCirclesUp( data, +this.value );
      } );

      //  ----------- update each row ------
      function updateRows( data, year ) {//all 51 <tr>'s not table
        const rowsData = dataPrepRows( data, year );

        d3.selectAll( ".tbl" )
          .data( [] );
        // ----- table rows tr
        let rows = d3.selectAll( ".tbl" )
          .data( rowsData )
          .attr( 'class', d => {
            const redWins = ( d[ "REP" ] > d[ "DEM" ] );
            if ( redWins ) {
              return 'tbl bg-brick anime-danger text-danger';
            } else {
              return 'tbl bg-ocean anime-primary text-info';
            }
          } )
          .on( "mouseover", function ( d, i ) {
            //  console.log('d :>> ', d);
            //  d3.select( this ).attr( "class", "bg-transparent add-anime" );
          } )
          .on( "mouseout", function ( d ) {
            //  console.log('d :>> ', d);
            //  d3.select( this ).attr( "class", "bg-transparent add-anime" );
          } );

        let cells = rows.selectAll( "td" )
          .data( function ( row ) {
            return Object.keys( row ).map( function ( d, i ) {
              if ( d == "Flag" ) {
                return {
                  i: d,
                  value: row[ d ].trim().toLowerCase().replace( ' ', '-' )
                };
              } else {
                return {
                  i: d,
                  value: row[ d ]
                };
              }
            } );
          } )
          .enter()
          .append( "td" )
          .attr( "class", "bg-transparent" )
          .html( function ( d ) {
            if ( d.i == "Flag" ) {
              return '<img class="img-thumbnail shadow-before border-0  p-0 m-0 rnd-xl" src="' +
                '/static/img/states/' +
                d.value +
                '-flag-small.png' +
                '" alt="' +
                d.value +
                '  " style="height: 1.25rem; opacity:70%"></img>';
            } else if ( d.i == "StateName" ) {
              return '<strong class="text-md text-outlined shadow-after">' +
                d.value +
                '</strong>';
            } else if ( d.i == "PO" ) {
              return '<strong class="text-robo text-md text-dark opac-70">' +
                '<em>' +
                d.value +
                '</em>' +
                '</strong>';
            } else {
              return '<i class="text-comfo text-sm text-dark">' + fDecimal( d.value ) + '</i>';
            }
          } );


      }

      function slideMyYears( slider ) {
        // adjust the text on the range slider
        d3.select( "#sliderValue" ).text( slider );
        d3.select( "#slider" ).property( "value", slider );
      }

      function onlyColorUp( selectedYear ) {//update st colors 
        // console.log( 'onlyColorUp|modify map layer for selected year :>> ', selectedYear );
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
      
      //#region MAP START// ----------------
      
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
          zoomOffset: -1
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
            democrat: "bg-info"
          };
    
          const btnColors = {
            republican: "btn-danger",
            democrat: "btn-info"
          };
    
          const textColors = {
            republican: "text-danger",
            democrat: "text-primary"
          };
    
          const partyAbbr = {
            "republican": "(R)",
            "democrat": "(D)",
          };
          this._div.innerHTML = '<a class="btn bg-glass text-md text-balo text-center shadow-after text-light rnd-2xl py-2 px-3 mb-2 "> US Presidential </a>' + ( props ?
            '<br><a class="btn btn-lg shadow-after text-balo text-onerem text-nowrap text-center text-light py-1 px-3 rnd-2xl mt-2 ' +
            btnColors[ props.winner ] +
            '">' +
            props.name +
            ' ' +
            partyAbbr[ props.winner ] +
            '</a>' :
            '<br><strong class="text-balo text-secondary">Hover over a state</strong>'
          );
        };
    
        info.addTo( map );
    
        var legend = L.control( {
          position: 'bottomright'
        } );
    
        legend.onAdd = function ( map ) {
          var div = L.DomUtil.create( 'div', 'legend' ),
            partyNames = [ "republican", "democrat" ],
            colors = [
              "#d73027",
              "#4575b4",
            ];
    
          // loop through our deaths intervals and generate a label with a colored square for each interval
          for ( var i = 0; i < partyNames.length; i++ ) {
            div.innerHTML +=
              '<h4 class="text-light text-balo text-center rnd-2xl px-2 py-1 mb-2" style="background:' + colors[ i ] +
              ';">' +
              partyNames[ i ] +
              '</h4> ';
          }
    
          return div;
    
        };
    
        legend.addTo( map );
    
        var geojson = L.geoJson( statesData, {
          style: style,
          onEachFeature: onEachFeature
        } ).addTo( map );
    
        function getColor( d ) {
          const partyColor = {
            republican: "#d73027",
            democrat: "#4575b4",
            "democratic-farmer-labor": "#4575b4"
          }; // console.log( 'colors[d] :>> ', partyColor[ d ] );
          return partyColor[ d ];
        }
        //#endregion
      // map end -----------------
      } );
}
