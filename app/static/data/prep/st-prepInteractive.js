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

  nested.forEach( d => {
    let sumEach = 0;
    d.values.forEach( v => {
      sumEach = sumEach + v[ "value" ];
    } )
  ;
  
  let red = { // r object stores year for x axis then both y perc/count values for interactive chart
    year :  +d.key, 
    ye4r :  +d.key, 
    count : +d.values.filter( d => d.key == "republican" )[ 0 ].value,
    perc :  +d.values.filter( d => d.key == "republican" )[ 0 ].value / sumEach, 
    nam3 :  'r', 
  };
  let blue = {
    year :  +d.key+1.50, // trick req'd to display two different color bars in the same chart with perspective
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
const keys = { 0 : 'perc', 1 : 'count',};
let result = { // zero 1 are switch keys on the 
    state: state,
    keys: keys,
    formats: { 'perc' : ".0%", 'count' : ",",},
    titles: { 
      perc : `Vote Percentage ${state}`, 
      'count' : `Vote Count for  ${state}`, 
    },
    set : [rSeries,bSeries] ,
    domains: generateDomains( keys, bSeries, rSeries ),
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

