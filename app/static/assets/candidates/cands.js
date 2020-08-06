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

function prezTableTopUp( year ) {
  const urlPrezWTest = '../static/data/csv/prezWinners.csv';
  d3.csv( urlPrezWTest,
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {
        function slideWinner( data, sliderYear ) {
          // [ "year", "president", "party", "prior" ]
          console.log( 'prezWinnersUp sliderYear :>> ', sliderYear );
          const d = data.filter( d => d[ "year" ] == sliderYear )[ 0 ];
          const imgPrez = '../static/img/prez/' + sliderYear + '.jpg';
          const imgParty = '../static/img/party/' + d.party + '.png';
          d3.select( '#prez-name' ).text( d.president );
          // d3.select( '#prez-img' ).attr( "src", imgPrez );
          d3.select( '#party-img' ).attr( "src", imgParty );
          d3.select( '#party-name' ).text( d.party );
        }

        // --------------------- SLIDER ----------------
        d3.select( "#slider" ).on( "input", function () {
          slideWinner( data, +this.value );
        } );


      }
    } );
}

prezTableUp( urlPrezT3st, 2016 );
prezTableTopUp( 2016 );



function candsVotesUp( yearUpdated ) {
  d3.csv( urlTickets, function ( err, data ) {
    const nested = d3.nest()
      .key( d => d.party )
      .entries( data.filter( d => d[ "year" ] == yearUpdated ) );

    // console.log('nested.filter :>> ', nested);
    const dict = {};

    nested.forEach( e => {
      // console.log('e.values[0] :>> ', e.values[0]["party"]);
      dict[ e.values[ 0 ][ "party" ] ] = e.values[ 0 ];
    } );
    // console.log('dict :>> ', dict['R']);
    // console.log('blue["prezName"] :>> ', blue["prezName"]);
    // -------------blue d3-select one by one
    const blue = dict[ 'D' ];
    d3.select( '#dem-prez' ).text( blue[ "prezName" ] );
    d3.select( '#dem-vp' ).text( blue[ "vpName" ] );
    d3.select( '#dem-vp-prior' ).text( blue[ "prior" ] );
    d3.select( '#dem-prez-prior' ).text( blue[ "prezPrior" ] );
    d3.select( '#dem-elec-vote' ).text( blue[ "eleVo" ] );
    d3.select( '#dem-pop-vote' ).text( blue[ "popVo" ] );
    d3.select( '#blue-popvote-perc' ).text( blue[ "popVo" ] );
    d3.select( '#blue-elecvote-perc' ).text( blue[ "eleVo" ] );

    // src="../static/img/cands/vp2016d.jpg" 
    d3.select( '#dem-vp-img' ).attr( "src", '../static/img/cands/vp' + yearUpdated + "d.jpg" );
    d3.select( '#dem-prez-img' ).attr( "src", '../static/img/cands/p' + yearUpdated + "d.jpg" );
    // -------------red  d3-select one by one
    const red = dict[ 'R' ];
    
    // // console.log('red :>> ', red);
    d3.select( '#rep-prez' ).text( red[ "prezName" ] );
    d3.select( '#rep-vp' ).text( red[ "vpName" ] );
    d3.select( '#rep-prez-prior' ).text( red[ "prezPrior" ] );
    d3.select( '#rep-vp-prior' ).text( red[ "prior" ] );
    d3.select( '#rep-vp-prior' ).text( red[ "prior" ] );

    d3.select( '#rep-elec-vote' ).text( red[ "eleVo" ] );
    d3.select( '#rep-pop-vote' ).text( red[ "popVo" ] );
    d3.select( '#red-popvote-perc' ).text( red[ "popVo" ] );
    d3.select( '#red-elecvote-perc' ).text( red[ "eleVo" ] );

    d3.select( '#rep-vp-img' ).attr( "src", '../static/img/cands/vp' + yearUpdated + "r.jpg" );
    d3.select( '#rep-prez-img' ).attr( "src", '../static/img/cands/p' + yearUpdated + "r.jpg" );
    // d3.select( '#dem-p-img' ).attr("src", '../static/img/cands/vp'+yearUpdated+"d.jpg" );
d3.select( '#blue-house-seats' ).text( Math.round(blue[ "eleVo" ]*535/100) );
    d3.select( '#red-house-seats' ).text( Math.round(red[ "eleVo" ]*535/100) );
  } );
}

candsVotesUp( 2016 );
