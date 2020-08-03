init("Colorado");

function init (stateName) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    stateFocusMap(data, stateName);
    
    const dataRe4dy = prepTimeSerData( data, stateName );
    barsPercUp( dataRe4dy );
    barsCountUp( dataRe4dy );
    timeSersPercUp( dataRe4dy);
    // timeSersCountUp( dataRe4dy );
    gaugeUp( dataRe4dy );
    stNumbersUpdate( stateName );
    dropDownYearUp ( 2016, data );
    startCountingNumbers(stateName);
  } ); 
}
