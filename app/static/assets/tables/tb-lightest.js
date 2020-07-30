// console.log('test global var seatByStatePO :>> ', seatByStatePO);
// console.log('test global var nameByStatePO :>> ', nameByStatePO);
var mitPrez1976_2016 = '../static/data/csv/president.csv';
function prezTableUp( url, year ) {
  d3.csv( url, ( error, data ) => {
    if ( error ) {
      console.error( error );
    } else {
        const geoStateNames = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Diamond Princess",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  d3.select( "#table-goes-here" )
    .select( "table" )
    .remove();
  // --------------
  const fComma = d3.format( ',' );
  const fDecimal = d3.format( '.3' );
  // --------------
  let table = d3.select( "#table-goes-here" )
    .append( "table" )
    .attr( "class", "table table-sm table-borderless bg-transparent text-center mx-4" ),
    thead = table.append( "thead" ),
    tbody = table.append( "tbody" ).attr( 'class', '' )
  ;

      let columns = [];
      const rowsData = dataPrepRows( data );

      Object.keys( rowsData[ 0 ] ).forEach( key => {
        // console.log('key :>> ', key);
        columns.push( key )
      } );
      // console.log('columns :>> ', columns);
      let header = thead.append( "tr" ).attr( 'class', 'bg-transparent' )
        .selectAll( "th" )
        .data( columns )
        .enter()
        .append( "th" )
        .attr( 'class', 'text-sm  bg-coral rounded-lg add-anime pb-2 pt-1 text-light' )
        .text( d => d )
        .on( "click", function ( d ) {
          if ( d == "StateName" ) {
            rows.sort( function ( a, b ) {
              if ( a[ d ] < b[ d ] ) {
                return -1;
              }
              if ( a[ d ] > b[ d ] ) {
                return 1;
              } else {
                return 0;
              }
            } );
          } else if ( d == "margin" ) {
            rows.sort( function ( a, b ) {
              return a[ d ] - b[ d ];              
            } );
          } else {
            rows.sort( function ( a, b ) {
              return b[ d ] - a[ d ];
            } );
          }
         } );
          // ----- table rows tr
      let rows = tbody.selectAll( "tr" )
        .data( rowsData )
        .enter()
        .append( "tr" )
        .attr( 'class', d => {
          const redWins = ( d[ "REP" ] > d[ "DEM" ] );
          if ( redWins ) {
            return 'anime-danger text-balo text-danger';
          } else {
            return 'anime-primary text-balo text-dark';
          }
        } )
        .on( "mouseover", function ( d, i ) {
          //  console.log('d :>> ', d);
          //  d3.select( this ).attr( "class", "add-anime" );
        } )
        .on( "mouseout", function ( d ) {
          //  console.log('d :>> ', d);
          //  d3.select( this ).attr( "class", " add-anime" );
        } )
        .on( "click", function ( d ) {
          init(d.StateName);
        })
        ;


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
        .attr( "class", "bg-tableMini pb-2" )
        .html( function ( d ) {
          if ( d.i == "Flag" ) {
            return '<img class="img-thumbnail border-0 p-0 my-0 mx-2" src="' +
              '/static/img/states/' +
              d.value +
              '-flag-small.png' +
              '" alt="' +
              d.value +
              '  " style="height: 1rem;opacity:70%"></img>';
          } else if ( d.i == "StateName" ) {
            return '<strong class="text-balo text-md">'  +
              d.value + '</strong>';
          } else if ( d.i == "PO" ) {
            return '<strong class="text-balo text-md opac-70">' +
              '<em>' +
              d.value +
              '</em>' +
              '</strong>';
          } else {
            return '<strong class="text-balo text-md">' + fDecimal( d.value ) + '</strong>';
          }
        } );
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

      geoStateNames.forEach( d => {
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
      row[ "margin" ] = Math.abs(row['DEM']-row['REP']);
      row[ "Seats" ] = seatByStatePO[ d.key ];
      // console.log('row :>> ', row);
      r0ws.push( row );
    } );

    // console.log( 'rows test for Colorado :>> ', r0ws[5] );
    return r0ws;
  }

}

prezTableUp( mitPrez1976_2016, 2016 );

