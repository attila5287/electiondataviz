init( "Colorado" );

function init( stateName ) {
  renderStateMain( prepStateMain( stateName ) );
  renderStateDemo( prepStateDemo( stateName ) );

  var cu = new counterUp( {
    start: 0,
    duration: 3000,
    intvalues: true,
    interval: 100,
    prepend: '€',
    append: '.00'
  } );
  cu.start();
  
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    stateFocusMap( data, stateName );

    const dataReady = prepTimeSerData( data, stateName );
    barsPercUp( dataReady );
    barsCountUp( dataReady );
    timeSersPercUp( dataReady );
    gaugeUp( dataReady );
    updateImgTxt( stateName );
    // dropDownYearUp ( 2016, data );
  } );
}

// stNumsUpdate(stateName);
// timeSersCountUp( dataRe4dy );

function updateImgTxt( state ) {

  d3.select( "#stName" ).text( state );
  d3.select( "#stFlag" ).attr( 'src', '../static/img/states/' + state.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
}
dropDownLite (5);
