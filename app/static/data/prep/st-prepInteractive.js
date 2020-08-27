function prepInteractiveData( data, state ) { // 
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

    // year and count is necessary for data viz
    // ye4r and nam3 only needed for extravaganza tooltip

    blueCount[ "year" ] = +d.key;
    blueCount[ "value" ] = +d.values.filter( d => d.key == "democrat" )[ 0 ].value;
    blueCount[ "ye4r" ] = +d.key;
    blueCount[ "nam3" ] = 'd';


    redCount[ "year" ] = +d.key;
    redCount[ "ye4r" ] = +d.key;
    redCount[ "nam3" ] = 'r';
    redCount[ "value" ] = +d.values.filter( d => d.key == "republican" )[ 0 ].value;

    redsV.values.push( redCount );
    bluesV.values.push( blueCount );

    d.values.forEach( v => {
      // console.log('this.value :>> ', +v.value)
      sumEach = sumEach + v[ "value" ];
      // console.log( 'sumEach :>> ', sumEach );
    } );

    redPerc[ "year" ] = +d.key;
    redPerc[ "value" ] = redCount[ "value" ] / sumEach;
    bluePerc[ "year" ] = +d.key;
    bluePerc[ "value" ] = blueCount[ "value" ] / sumEach;

    // these four only req'd for tooltip to show img's
    redPerc[ "ye4r" ] = +d.key;
    redPerc[ "nam3" ] = 'r';
    bluePerc[ "ye4r" ] = +d.key;
    bluePerc[ "nam3" ] = 'd';
    redsP.values.push( redPerc );
    bluesP.values.push( bluePerc );
  } );

  // console.log( 'bluesV~otes :>> ', bluesV );
  // console.log( 'redsV~otes :>> ', redsV );

  // console.log( 'redsP~ercentage :>> ', redsP );
  // console.log( 'bluesP~ercentage :>> ', bluesP.values[0] );

  let timeSeriesData = {
    state: state,
    count : {
      blue: bluesV,
      red: redsV,
    },
    perc : {
      blue: bluesP,
      red: redsP,
    }
  };
  return timeSeriesData;
}
