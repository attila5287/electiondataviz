// console.log('test global var seatByStatePO :>> ', seatByStatePO);
// console.log('test global var nameByStatePO :>> ', nameByStatePO);
var urlPrezT3st = '../static/data/csv/president.csv';

function prezUpTable( url, year ) {
  const fComma = d3.format( ',' );
  const fDecimal = d3.format( '.2' );
  // --------------
  let table = d3.select( "#table-goes-here" )
       .append( "table" )
       .attr( "class", "table table-condensed table-striped table-hover text-center text-xlarger py-0 text-success" ),
       thead = table.append( "thead" ),
       tbody = table.append( "tbody" );
  d3.csv( url, ( error, data ) => {
    if ( error ) {
      console.error( error );
    } else {
      // ------------ 
      const rows = dataPrepRows( data );
      // console.log('rows Test :>> ', rows);

      
      
    }      
    // --------------------- SLIDER ----------------
    // console.log('data :>> ', data);
    d3.select( "#slider" ).on( "change", function () {
      slideMyYears( +this.value );
      // console.log('test d3-slider: +this.value :>> ', +this.value);
      prezUpTable( urlPrezT3st, +this.value );
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
      row[ "PO" ] = d.key;
      row[ "Republican" ] = d.values.filter( z => z.key == "republican" )[ 0 ].value / sumEach * 100;
      row[ "Democrat" ] = d.values.filter( z => z.key == "democrat" )[ 0 ].value / sumEach * 100;
      row[ "Others" ] = 100 - row[ "Republican" ] - row[ "Democrat" ];
      row[ "StateName"] = nameByStatePO[d.key];
      row[ "NumOfSeats"] = seatByStatePO[d.key];
      // console.log('row :>> ', row);
      r0ws.push( row );
    } );

    // console.log( 'row for table per each state-51+ :>> ', r0ws );
    console.log( 'row test for Colorado :>> ', r0ws[5] );

    return r0ws;
  }
}

prezUpTable( urlPrezT3st, 2016 );
prezTableTopUp( 2016 );

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
