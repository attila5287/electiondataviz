init( "Colorado" );


function init( stateName ) {

  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    const dataReady = prepTimeSerData( data, stateName );

    // dropDownYearUp ( 2016, data );
    const stateIndex = indexNoBySt[stateName];
    dropDownLite (stateIndex);

  } );
}

// stNumsUpdate(stateName);
// timeSersCountUp( dataRe4dy );

function updateImgTxt( state ) {

  d3.select( "#stName" ).text( state );
  d3.select( "#stFlag" ).attr( 'src', '../static/img/states/' + state.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
}
