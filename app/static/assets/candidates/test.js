// console.log('test global var seatByStatePO :>> ', seatByStatePO);
// console.log('test global var nameByStatePO :>> ', nameByStatePO);
var urlPrezT3st = '../static/data/csv/president.csv';
var urlTickets = '../static/data/csv/prezTickets.csv';


function prezTableUp( url, year ) {
  console.log('test :>> ', url);
  // d3.select( "#table-goes-here" )
  //   .select( "table" )
  //   .remove();
  // --------------
  const fComma = d3.format( ',' );
  const fDecimal = d3.format( '.3' );
  // --------------

  d3.csv( url, ( error, data ) => {
    if ( error ) {
      console.error( error );
    } else {
      const rowsData = dataPrepRows( data );

      let arr = [];
      for ( let i = 0; i < 20; i++ ) {
        arr.push( i );
      }

      //  console.log('arr  :>> ', arr);
      //  console.log('arr  :>> ', arr.length);
      // d3.selectAll(".test").data(arr).text(d => d);
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

      function update( data ) {

        var selection = d3.select( "#content" ).selectAll( ".temps" )
          .data( austinTemps );

        selection.enter()
          .append( "div" )
          .classed( "temps", true )
          .merge( selection )
          .style( "height", function ( d ) {
            return d + "px";
          } );

        selection.exit().remove();
      }
      
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
            return '<img class="img-thumbnail shadow-before border-0  p-0 m-0 rounded-xl" src="' +
            '/static/img/states/' +
            d.value +
            '-flag-small.png' +
            '" alt="' +
            d.value +
            '  " style="height: 1.25rem;opacity:70%"></img>';
          } else if ( d.i == "StateName" ) {
            return '<strong class="text-md text-outlined shadow-after ">' +
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
      
        // cells.exit().remove();
        // console.log('d :>> ', cells);

        
      }
      
      // --------------------- SLIDER ----------------
      // console.log('data :>> ', data);
      // d3.select( "#slider" ).on( "change", function () {
    // slideMyYears( +this.value );
    // console.log('test d3-slider: +this.value :>> ', +this.value);
    // prezTableUp( urlPrezT3st, +this.value );
    // onlyColorUp( +this.value );
    // } );

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
    }
    slideMyYears( year );
  } );

  function dataPrepRows( data ) {
    //--
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
      .entries( data.filter( d => d[ "year" ] == year ) );

    nested.forEach( d => {
      winners[ d.key ] = d.values[ 0 ].key;
    } );
    const partyColor = {
      republican: "#d73027",
      democrat: "#4575b4",
      "democratic-farmer-labor": "#4575b4"
    };
    // console.log( 'winners :>> ', winners );
    statesData.features.forEach( d => {
      const nameState = d.properties.name;
      d.properties[ "winner" ] = winners[ nameState ];
      d.properties[ "color" ] = partyColor[ winners[ nameState ] ];
      // console.log('d :>> ', d.properties);
    } );

    let filteredStateTotals = d3.nest()
      .key( d => d.year )
      .key( d => d.state_po )
      .key( d => d.party )
      .rollup( function ( v ) {
        return d3.sum( v, function ( d ) {
          return d.candidatevotes;
        } );
      } )
      .entries( data )
      .filter( d => d.key == year )[ 0 ].values;

    // console.log( '*SLIDER-CHECK* year selected :>> ', year );
    // console.log('filteredStateTotals :>> ', filteredStateTotals);
    let r0ws = [];
    filteredStateTotals.forEach( d => {
      let sumEach = 0;
      let row = {};
      // console.log('d :>> ', d.key);
      // console.log('all parties  :>> ', d.values);
      d.values.forEach( z => {
        // console.log('z :>> ', z);
        sumEach = sumEach + z.value;
      } );
      // console.log('sumEach :>> ', sumEach);
      // will use below keys as Table Headers
      row[ "Flag" ] = nameByStatePO[ d.key ];
      row[ "StateName" ] = nameByStatePO[ d.key ];
      row[ "REP" ] = d.values.filter( z => z.key == "republican" )[ 0 ].value / sumEach * 100;
      row[ "DEM" ] = d.values.filter( z => z.key == "democrat" || z.key == 'democratic-farmer-labor' )[ 0 ].value / sumEach * 100;
      row[ "Others" ] = 100 - row[ "REP" ] - row[ "DEM" ];
      row[ "Seats" ] = seatByStatePO[ d.key ];
      row[ "PO" ] = d.key;
      // console.log('row :>> ', row);
      r0ws.push( row );
    } );

    // console.log( 'rows test for Colorado :>> ', r0ws[5] );
    return r0ws;
  }

}
