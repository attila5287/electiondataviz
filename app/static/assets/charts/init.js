
function init (stateName) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    const dataRe4dy = prepTimeSerData( data, stateName );
    console.log( '*init dataReady*  :>> ', dataRe4dy.blue.perc.values );
    barsPercUp( dataRe4dy );
    barsCountUp( dataRe4dy );
    timeSersPercUp( dataRe4dy );
    timeSersCountUp( dataRe4dy );
  } );
}

init("Colorado");
