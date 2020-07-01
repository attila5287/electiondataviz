// latestTimeSeries();
var allJSON = testdata.locations.map((d) => {
  return {
  name: d.country,
  lat: +d.coordinates.latitude, 
  lon: +d.coordinates.longitude, 
  pop: +d.country_population, 
  };
});

// staticTimeSeries();
latestTimeSeries ();

function staticTimeSeries() { 
  var data = testdaily;
  let name = 'Turkey'; //default before user selection
  dropDownUpdate( data, 'static' );
  overallCountUp( data );
  chosenFiguresUp( data, name );
}

function latestTimeSeries (){
  const url = 'https://pomber.github.io/covid19/timeseries.json';
  d3.json(url, function(error, data) {
    if (error) throw error;
    let name = 'Turkey'; //default before user selection
    dropDownUpdate( data, 'latest' );
    overallCountUp( data );
    chosenFiguresUp( data, name );
    
  });
 }

function chosenFiguresUp( data, name ) {
  let arr = data[ name ];

  let idx = arr.length - 1;

  let lastJSON = arr[ idx ];
  chosenDeaths = lastJSON.deaths;
  chosenConfirmed = lastJSON.confirmed;

  const format = d3.format( ',' );
  d3.select( '#countryName' ).text( name );
  d3.select( '#countryDeaths' ).text( format( chosenDeaths ) );
  d3.select( '#countryConfirmed' ).text( format( chosenConfirmed ) );
  d3.select( '#latestDateUp' ).text( format( chosenConfirmed ) );
}

function overallCountUp( data ) {
  // console.log( ' --- overallCountUp ---' );
  // console.log( data );

  const keys = Object.keys( data )
  // console.log(keys);

  let totalDeaths = 0;
  let totalConfirmed = 0;

  keys.forEach( name => {

    let arr = data[ name ];

    let idx = arr.length - 1;

    let lastJSON = arr[ idx ];
    totalDeaths += lastJSON.deaths;
    totalConfirmed += lastJSON.confirmed;
  } );

  // console.log(totalDeaths);
  // console.log(totalConfirmed);

  const format = d3.format( ',' );
  d3.select( '#overallDeaths' ).text( format( totalDeaths ) );
  d3.select( '#overallConfirmed' ).text( format( totalConfirmed ) );
}

function dropDownUpdate( data, static_or_latest ) {
  const keys = Object.keys( data );

  const format = d3.format( ',' );
  const ddJSON = keys.map( ( country, i ) => {
    const array = data[ country ];
    const lastIndex = data[ country ].length - 1;
    return {
      text: country,
      value: country,
      selected: false,
      description: `deaths ${format(array[lastIndex].deaths)} cases ${format(array[lastIndex].confirmed)}`,
      imageSrc: '/static/img/flags/Ensign_Flag_Nation_' + country.toLowerCase().replace( ' ', '_' ) + '-128.png'

    };

  } );

  $( '#opts' ).ddslick( {
    data: ddJSON,
    defaultSelectedIndex: 150,
    onSelected: function ( d ) {
      const static = (static_or_latest == 'static');
      if (static) {
        var data = testdaily;
        chosenFiguresUp( data, d.selectedData.value );
        
      } else {

        // console.log('dropdown not static');
        
      }

      const latest = (static_or_latest == 'latest');

      if (latest) {
        const name = d.selectedData.value;
        const url = 'https://pomber.github.io/covid19/timeseries.json';
        
        d3.json(url, function(err,data){
          chosenFiguresUp( data, name );
        });
      } else {
        // console.log('dropdown latest pass');
      }
    }
  } );
}

