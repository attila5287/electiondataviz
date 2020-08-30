

function init( stateName ) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    const dataReady = prepInteractiveData( data, stateName );

    // import csv once then render by input within the func
    interactiveChartUp(dataReady);


    dropDownLite (indexNoBySt[stateName]);

  } );
}
init( "Colorado" );
