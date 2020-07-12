// console.log('test global var seatByStatePO :>> ', seatByStatePO);
// console.log('test global var nameByStatePO :>> ', nameByStatePO);
var urlPrezT3st = '../static/data/csv/president.csv';

function prezTableUp( url, year ) {
  d3.select( "#table-goes-here" )
  .select( "table" )
  .remove();
  // --------------
  const fComma = d3.format( ',' );
  const fDecimal = d3.format( '.3' );
  // --------------
  let table = d3.select( "#table-goes-here" )
       .append( "table" )
       .attr( "class", "table table-sm bg-transparent table-bordered text-center text-comfo px-4" ),
       thead = table.append( "thead" )
       tbody = table.append( "tbody" ).attr('class','bg-transparent');
     
  d3.csv( url, ( error, data ) => {
    if ( error ) {
      console.error( error );
    } else {
      let columns = [ ];
      const rowsData = dataPrepRows( data );

      Object.keys(rowsData[0]).forEach(key =>{
        // console.log('key :>> ', key);
        columns.push(key)
      });
      console.log('columns :>> ', columns);
      let header = thead.append( "tr" ).attr('class','bg-transparent')
      .selectAll( "th" )
       .data(  columns )
       .enter()
       .append( "th" )
       .attr('class','text-sm  bg-dark rounded-xl add-anime pb-2 pt-1 text-light')
       .text(  d =>  d )
        ;
      // ----- table rows tr
      const partyColors = {
        "REP" :'text-danger' ,
        "DEM" :'text-primary' ,
      };
      let x = 'text-danger'
      let rows = tbody.selectAll( "tr" )
       .data( rowsData )
       .enter()
       .append( "tr" )
       .attr('class',d => {
         const redWins = (d["REP"]>d["DEM"]);
         if (redWins) {
           return 'bg-transparent add-anime text-danger';
         } else {
           return 'bg-transparent add-anime text-primary';
         }
       })
       .on( "mouseover", function ( d, i ) {
         console.log('d :>> ', d);
        //  d3.select( this ).attr( "class", "bg-transparent add-anime" );
       } )
       .on( "mouseout", function ( d ) {
         console.log('d :>> ', d);
        //  d3.select( this ).attr( "class", "bg-transparent add-anime" );
       } );
      let cells = rows.selectAll( "td" )
       .data( function ( row ) {
         return Object.keys(row).map( function ( d, i ) {
           if ( d == "Flag" ) {
             return {
               i: d,
               value: row[d].trim().toLowerCase().replace( ' ', '-' )
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
       .attr( "class", "bg-dark" )
       .html( function ( d ) {
         if ( d.i == "Flag" ) {
           return '<img class="img-thumbnail shadow-before  border-0  p-0 m-0 rounded-xl" src="' +
             '/static/img/states/' +
             d.value +
             '-flag-small.png' +
             '" alt="' +
             d.value +
             '  " style="height: 1.75rem;opacity:70%"></img>';
         } else if ( d.i == "StateName" ) {
           return '<strong class="text-robo text-larger text-outlined">' +
             '<em>' +
             d.value +
             '</em>' +
             '</strong>';
         } else if ( d.i == "PO" ) {
           return '<strong class="text-robo text-larger text-light">' +
             '<em>' +
             d.value +
             '</em>' +
             '</strong>';
         } else {
           return '<i class="text-comfo text-light">'+ fDecimal( d.value )+'</i>';
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

      statesData.features.forEach( d => {
        const nameState = d.properties.name;
        d.properties[ "winner" ] = winners[ nameState ];
        d.properties[ "color" ] = colors[ winners[ nameState ] ];
        // console.log('d :>> ', d.properties);
      } );
    }
    slideMyYears( year );
  } );

  function dataPrepRows ( data ) {
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

    // console.log( 'winners :>> ', winners );
    statesData.features.forEach( d => {
      const nameState = d.properties.name;
      d.properties[ "winner" ] = winners[ nameState ];
      d.properties[ "color" ] = colors[ winners[ nameState ] ];
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

    console.log( 'year filtered :>> ', year );
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
      row[ "Flag"] = nameByStatePO[d.key];
      row[ "StateName"] = nameByStatePO[d.key];
      row[ "REP" ] = d.values.filter( z => z.key == "republican" )[ 0 ].value / sumEach * 100;
      row[ "DEM" ] = d.values.filter( z => z.key == "democrat" || z.key == 'democratic-farmer-labor' )[ 0 ].value / sumEach * 100;
      row[ "Others" ] = 100 - row[ "REP" ] - row[ "DEM" ];
      row[ "Seats"] = seatByStatePO[d.key];
      row[ "PO" ] = d.key;
      // console.log('row :>> ', row);
      r0ws.push( row );
    } );

    console.log( 'rows test for Colorado :>> ', r0ws[5] );
    return r0ws;
  }

}

function prezTableTopUp( year ) {
  const urlPrezWTest = '../static/data/csv/prezWinners.csv';
  d3.csv(urlPrezWTest,
  (error, data) => {
    if (error) {
        console.error(error);
    } else {
      function slideWinner(data, sliderYear) {
        // [ "year", "president", "party", "prior" ]
        console.log('prezWinnersUp sliderYear :>> ', sliderYear);
        const d = data.filter(d=> d["year"] == sliderYear)[0];
        const imgPrez= '../static/img/prez/' + sliderYear + '.jpg';
        const imgParty = '../static/img/party/'+ d.party+'.png';
        d3.select('#prez-name').text(d.president);
        d3.select('#prez-img').attr("src", imgPrez);
        d3.select('#party-img').attr("src", imgParty);
        d3.select('#party-name').text(d.party);
      }

      // --------------------- SLIDER ----------------
      d3.select( "#slider" ).on( "input", function () {
        slideWinner( data, +this.value );
      } );
      

    }
  });
}

prezTableUp( urlPrezT3st, 2016 );
prezTableTopUp( 2016 );
