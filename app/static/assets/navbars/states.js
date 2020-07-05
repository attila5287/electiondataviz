latestStatesUS();
function latestStatesUS (){
  var urlBase = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/';
  let strdate = getOffsetDate( 1, "mm-dd-yyyy" );
  let urlCompiled = urlBase + strdate + ".csv";
  d3.csv(urlCompiled,
  (error, csvData) => {
     if (error) {
         console.error(error);
     } else {
       let dictDeaths = {};
       let dictConfirmed = {};
       for ( let index = 0; index < csvStateNames.length; index++ ) {
           const name = csvStateNames[ index ];
           const row = csvData[ index ];
           dictDeaths[ name ] = +row.Deaths;
           dictConfirmed[ name ] = +row.Confirmed;
       }
       dropDownUpdateStates(csvData, 'latest');
       overallCountUpStates( csvData );
       chosenFiguresUpStates( csvData, 'Colorado' );


         




     }
  });

}
// staticTimeSeries();

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

function chosenFiguresUpStates( data, name ) {
  let dictDeaths = {};
  let dictConfirmed = {};
  for ( let index = 0; index < csvStateNames.length; index++ ) {
      const name = csvStateNames[ index ];
      const row = data[ index ];
      dictDeaths[ name ] = +row.Deaths;
      dictConfirmed[ name ] = +row.Confirmed;
  }  

  chosenDeaths = dictDeaths[name];
  chosenConfirmed = dictConfirmed[name];

  const format = d3.format( ',' );
  d3.select( '#countryName' ).text( name );
  d3.select( '#countryDeaths' ).text( format( chosenDeaths ) );
  d3.select( '#countryConfirmed' ).text( format( chosenConfirmed ) );
}

function overallCountUpStates( data ) {
  // console.log( ' --- overallCountUp ---' );

  let totalDeaths = 0;
  let totalConfirmed = 0;

  data.forEach( row => {
    totalDeaths += +row.Deaths;
    totalConfirmed += +row.Confirmed;
  } );

  // console.log(totalDeaths);
  // console.log(totalConfirmed);

  const format = d3.format( ',' );
  d3.select( '#overallDeaths' ).text( format( totalDeaths ) );
  d3.select( '#overallConfirmed' ).text( format( totalConfirmed ) );
}

function dropDownUpdateStates( data, static_or_latest ) {
  // console.log('data :>> ', data);

  const format = d3.format( ',' );
  const ddJSON = data.map( ( row, i ) => {
    return {
      text: row.Province_State,
      value: row.Province_State,
      selected: false,
      description: `deaths ${format(row.Deaths)} `,
      imageSrc: '/static/img/states/' + row.Province_State.toLowerCase().replace( ' ', '-' ) + '-flag-small.png'

    };

  } );
// console.log('ddJSON :>> ', ddJSON);
  $( '#opts' ).ddslick( {
    data: ddJSON,
    defaultSelectedIndex: 6,
    onSelected: function ( d ) {
      const static = (static_or_latest == 'static');
      if (static) {
        // var data = testdaily;
        // chosenFiguresUpStates( data, d.selectedData.value );
        
      } else {

        // console.log('dropdown not static');
        
      }

      const latest = (static_or_latest == 'latest');

      if (latest) {
        const name = d.selectedData.value;
        // console.log('name :>> ', name);
  var urlBase = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/';
  let strdate = getOffsetDate( 1, "mm-dd-yyyy" );
  let urlCompiled = urlBase + strdate + ".csv";
  d3.csv(urlCompiled,
  (error, csvData) => {
     if (error) {
         console.error(error);
     } else {
       let dictDeaths = {};
       let dictConfirmed = {};
       for ( let index = 0; index < csvStateNames.length; index++ ) {
           const name = csvStateNames[ index ];
           const row = csvData[ index ];
           dictDeaths[ name ] = +row.Deaths;
           dictConfirmed[ name ] = +row.Confirmed;
       }
       chosenFiguresUpStates( csvData, name );
     }
  });        
      } else {
        // console.log('dropdown latest pass');
      }
    }
  } );
}

//function to get date string with offset and format
function getOffsetDate( offset, format ) {
    var tday;
    var today = new Date();

    today.setDate( today.getDate() - offset );
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if ( dd < 10 ) {
        dd = '0' + dd;
    }

    if ( mm < 10 ) {
        mm = '0' + mm;
    }

    if ( format == "yyyy-mm-dd" )
        tday = yyyy + '-' + mm + '-' + dd;
    else if ( format == "mm-dd-yyyy" )
        tday = mm + '-' + dd + '-' + yyyy;
    else
        tday = yyyy + '-' + mm + '-' + dd;

    return tday;
}
