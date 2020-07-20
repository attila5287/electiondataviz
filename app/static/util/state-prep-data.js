function prepTimeSerData( data, state ) {
  // console.log( 'state :>> ', state );
  const colors = {
    republican: "red",
    democrat: "blue"
  };
  let winners = {};

  const nested = d3.nest()
    .key( d => d.year )
    .key( d => d.party )
    .rollup( v => d3.max( v, d => +d.candidatevotes ) )
    .entries( data.filter( d => d[ "state" ] == state ) );
  // V~otes store integer {count vs. year} objects
  let bluesV = {
    name: 'Democrats(Votes)',
    values: []
  };
  let redsV = {
    name: 'Republicans(Votes)',
    values: []
  };
  // P~ercentage store integer {perc vs. year} objects
  let bluesP = {
    name: 'Democrats(Perc%)',
    values: []
  };
  let redsP = {
    name: 'Republicans(Perc%)',
    values: []
  };

  nested.forEach( d => {
    let blueCount = {};
    let redCount = {};
    let bluePerc = {};
    let redPerc = {};
    let sumEach = 0;
    // console.log( 'year; :>> ', d.key );

    blueCount[ "year" ] = +d.key;
    blueCount[ "count" ] = +d.values.filter( d => d.key == "democrat" )[ 0 ].value;


    redCount[ "year" ] = +d.key;
    redCount[ "count" ] = +d.values.filter( d => d.key == "republican" )[ 0 ].value;

    redsV.values.push( redCount );
    bluesV.values.push( blueCount );

    d.values.forEach( v => {
      // console.log('this.value :>> ', +v.value)
      sumEach = sumEach + v[ "value" ];
      // console.log( 'sumEach :>> ', sumEach );
    } );

    redPerc[ "year" ] = +d.key;
    redPerc[ "perc" ] = redCount[ "count" ] / sumEach;
    bluePerc[ "year" ] = +d.key;
    bluePerc[ "perc" ] = blueCount[ "count" ] / sumEach;

    redsP.values.push( redPerc );
    bluesP.values.push( bluePerc );
    // console.log('test percentages :>> ', redPerc.value + bluePerc.value);
  } );

  // console.log( 'bluesV~otes :>> ', bluesV );
  // console.log( 'redsV~otes :>> ', redsV );

  // console.log( 'redsP~ercentage :>> ', redsP );
  // console.log( 'bluesP~ercentage :>> ', bluesP.values[0] );

  let timeSeriesData = {
		state: state,
    blue: {
      count: bluesV,
      perc: bluesP
    },
    red: {
      count: redsV,
      perc: redsP
    }
  };
  return timeSeriesData;
}
