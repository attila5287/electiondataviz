
function init( stateName ) {
  const url = '../static/data/csv/president.csv';
  d3.csv( url, function ( err, data ) {
    const dataReady = prepInteractiveData( data, stateName );
    // console.log('votes :>> ', votes);
    let dict = {
      0: 'perc',
      1: 'count'
    };
    var switchValue = document.getElementById("switch").value;

    console.log('switchValue :>> ', switchValue);

    interactiveChartUp(dataReady, switchValue);


    dropDownLite (indexNoBySt[stateName]);

  } );
}
init( "Colorado" );
