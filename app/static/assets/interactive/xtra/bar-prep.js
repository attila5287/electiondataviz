function prepInteractiveData( data, state ) { // prepTimeSeries->new key 
  // console.log('data :>> ', data);
  // console.log( 'state :>> ', state );
  const colors = {
    republican: "red",
    democrat: "blue"
  };

  const nested = d3.nest()
    .key( d => d.year )
    .key( d => d.party )
    .rollup( v => d3.max( v, d => +d.candidatevotes ) )
    .entries( data.filter( d => d[ "state" ] == state ) );

  let rSeries = {
    name: 'Republicans',
    fillColor:  "#8A0101",
    values: [],
  };
  
  let bSeries = {
    name: 'Democrats',
    fillColor:  "#01018B",
    values: [],
  }
  ;

  nested.forEach( d => { // sum of all votes
    let sumEach = 0;
    d.values.forEach( v => {
      sumEach = sumEach + v.value;
    });
  
    let red = { // r object stores year for x axis then both y perc/count values for interactive chart
      year :  +d.key, 
      ye4r :  +d.key, 
      count : +d.values.filter( d => d.key == "republican" )[ 0 ].value,
      perc :  +d.values.filter( d => d.key == "republican" )[ 0 ].value / sumEach, 
      nam3 :  'r', 
    };
    let blue = { // one obj to store them all
      year :  +d.key+2, // trick req'd to display two different color bars in the same chart with perspective
      ye4r :  +d.key, 
      count : +d.values.filter( d => d.key == "democrat" )[ 0 ].value,
      perc :  +d.values.filter( d => d.key == "democrat" )[ 0 ].value / sumEach, 
      nam3 :  'd', 
    };
    rSeries.values.push( red );
    bSeries.values.push( blue );
  } );
  // year and count/perc  are necessary for data viz
  // ye4r and nam3 only needed for extravaganza tooltip
  const keys = { 0 : 'perc', 1 : 'count',} ;
  let result = { 
    main : [bSeries, rSeries] , // blue first to keep behind
    name: state,
    keys: keys, // indexed keys for switch
    formats: { 'perc' : ".0%", 'count' : ",",},
    colors: {"r" :  "#8A0101","d" : "#01018B",},
    titles: { // titles for series
      perc : `Vote Percentage ${state}`, 
      'count' : `Vote Count for  ${state}`, 
    },
    domains: generateDomains( keys, bSeries, rSeries ),
    domainsYr: generateDomainsYr( keys, bSeries, rSeries, "ye4r" ),
  };

  return result;
}

function generateDomains ( keys, bSeries, rSeries ) {
  let doms = {};
  for ( let i = 0; i < Object.keys( keys ).length; i++ ) {
    let k = keys[ i ]; // only two keys for now perc/count
    let keyValue = d => +d[ k ]; // callback function for  min-max count percentage
    let lows = [
      d3.min( bSeries.values, keyValue ),
      d3.min( rSeries.values, keyValue ),
    ];

    let highs = [
      d3.max( bSeries.values, keyValue ),
      d3.max( rSeries.values, keyValue ),
    ];

    doms[ k ] = [ d3.min( lows, d => d * 0.95 ), d3.max( highs, d => d * 1 ) ];
  }
  return doms;
}

function generateDomainsYr ( keys, bSeries, rSeries, fieldForYear ) {
  let doms = {};
  for ( let i = 0; i < Object.keys( keys ).length; i++ ) {
    let k = keys[ i ]; // only two keys for now perc/count
    let keyValue = d => +d[ fieldForYear ]; // callback function for  min-max year
    let lows = [
      d3.min( bSeries.values, keyValue ),
      d3.min( rSeries.values, keyValue ),
    ];

    let highs = [
      d3.max( bSeries.values, keyValue ),
      d3.max( rSeries.values, keyValue ),
    ];

    doms[ k ] = [ d3.min( lows, d => d  ), d3.max( highs, d => d  ) ];
  }
  // console.log('doms :>> ', doms);
  return doms;
}
