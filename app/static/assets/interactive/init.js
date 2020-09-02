function init( stateName ) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    // prep data for interactive chart, more 
    const dataReady = prepInteractiveData( data, stateName );
    // import csv once then render by input within the func
    main(dataReady);
  } );
  // dropdown does not change with csv data unlike the other ones
  dropdownMini(indexNoBySt[stateName]);
}
init( "Colorado" );
