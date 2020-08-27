function init( stateName ) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    const dataReady = prepInteractiveData( data, stateName );
    // console.log('votes :>> ', votes);

    interactiveChartUp(dataReady);


    dropDownLite (indexNoBySt[stateName]);

  } );
}
init( "Colorado" );
