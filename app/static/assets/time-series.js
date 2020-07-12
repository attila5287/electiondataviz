  // chosenFiguresUp( testdaily, 'Turkey' );

  latestTimeSeries();
  //test push gh ext

  // staticTimeSeries();

  // function staticTimeSeries() {
  // var testDataLatest = testdata;
  var data = testdaily;
  let name = 'Turkey'; //default before user selection

  dropDownUpdate( data, 'static' );
  overallCountUp( data );
  renderDynamicTable( prepData4TableAll( data ) );
  chosenFiguresUp( data, name );
  splatD3Circles( prepDataFromJSON( data, name ) );




  function latestTimeSeries() {
    const url = 'https://pomber.github.io/covid19/timeseries.json';
    d3.json( url, function ( error, data ) {
      if ( error ) throw error;
      let name = 'Turkey'; //default before user selection
      dropDownUpdate( data, 'latest' );
      overallCountUp( data );
      renderDynamicTable( prepData4TableAll( data ) );
      chosenFiguresUp( data, name );
      splatD3Circles( prepDataFromJSON( data, name ) );


    } );
  }

  function chosenFiguresUp( data, name ) {
    // console.log( ' --- chosenFiguresUp ---' );

    // console.log( data );
    // console.log( 'name: '+name );

    let arr = data[ name ];

    let idx = arr.length - 1;

    let lastJSON = arr[ idx ];
    chosenDeaths = lastJSON.deaths;
    chosenConfirmed = lastJSON.confirmed;

    const format = d3.format( ',' );
    d3.select( '#countryName' ).text( name );
    d3.select( '#countryDeaths' ).text( format( chosenDeaths ) );
    d3.select( '#countryConfirmed' ).text( format( chosenConfirmed ) );
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

  function selectOptionsUp( data ) {
    const locsArray = data.locations;
    var innerHTML = '';
    var optionHTML = '';
    for ( let i = 0; i < locsArray.length; i++ ) {
      const objJSON = locsArray[ i ];
      optionHTML
        += `<option value="${objJSON.id} ">${objJSON.country} ${objJSON.province}</option>`;
    }
    $countrySelect.innerHTML = optionHTML;
  }

  function renderDynamicTable( data ) {
    var rows = [];

    data.map( ( d ) => {
      let dict = {}

      const dates = d.dates;
      // console.log(dates);
      const dailyRecords = d.rollingSumDeaths;
      const numRecords = dailyRecords.length;
      const slice = Math.round( numRecords * .16 );
      // console.log(slice);
      const first = dates[ 0 ];
      const t2 = dates[ numRecords - slice - slice - slice - slice ];
      const t3 = dates[ numRecords - slice - slice - slice ];
      const t4 = dates[ numRecords - slice - slice ];
      const t5 = dates[ numRecords - slice ];
      const last = dates[ numRecords - 1 ];

      dict.name = d.name;
      dict[ first ] = d.rollingSumDeaths[ 0 ];
      dict[ t2 ] = d.rollingSumDeaths[ numRecords - slice - slice - slice - slice ];
      dict[ t3 ] = d.rollingSumDeaths[ numRecords - slice - slice - slice ];
      dict[ t4 ] = d.rollingSumDeaths[ numRecords - slice - slice ];
      dict[ t5 ] = d.rollingSumDeaths[ numRecords - slice ];
      dict[ last ] = d.rollingSumDeaths[ numRecords - 1 ];

      rows.push( dict );
    } );

    // console.log('--- rows ----');
    // console.log(rows);

    const $thead = document.querySelector( "thead" );
    $thead.innerHTML = "";
    let inner = "";
    var headers = Object.keys( rows[ 0 ] );
    // console.log(headers);
    for ( var j = 0; j < headers.length; j++ ) {
      var header = headers[ j ];
      inner += '<th>' + header + '</th>';
    }
    $thead.innerHTML += inner;

    // d3.select("thead")
    //   .selectAll("th")
    //   .data(dictArray)
    //   .enter()
    //   .append("th")
    //   .html(function(d) {
    //     return `<th>${d.name}</td><td>${d.population}</td><td>${d.deaths}</td><td>${d.confirmed}</th>`;
    //   });
    const $tbody = document.querySelector( "tbody" );
    const format = d3.format( ',' );
    $tbody.innerHTML = "";
    for ( var i = 0; i < rows.length; i++ ) {
      // Get  the sightings object and its fields
      var currentRow = rows[ i ];
      var fields = Object.keys( currentRow );
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow( i );
      for ( var j = 0; j < fields.length; j++ ) {

        var field = fields[ j ];
        // console.log(field);
        condition = ( j == 0 ) // country name is the first field in a row
        var $cell = $row.insertCell( j );
        // condition = (typeof currentRow[field] == "string") // country name is string 
        if ( condition ) {
          $cell.innerText = currentRow[ field ]; // dont format strings

        } else {
          $cell.innerText = format( currentRow[ field ] );
        }
      }
    }
  }

  function prepData4TableAll( data ) {

    // console.log( ' --- prepDataFromJSON --- ' );
    // console.log(data);

    let countryArray = [];

    const keys = Object.keys( data )
    for ( const key of keys ) {
      countryArray.push( key )
    }

    // console.log(countryArray)

    let dictArray = [];

    countryArray.forEach( country => {
      let dict = {
        'name': '',
        'latest': 0,
        'rollingSumDeaths': [],
        // 'rollingSumConfirmed': [],
        'dates': []
      };
      dict[ 'name' ] = country;

      let rollingSumDeaths = 0;

      // let rollingSumConfirmed = 0;

      let array = data[ country ];

      for ( let index = 0; index < array.length; index++ ) {
        const dailyRecord = array[ index ];
        dict[ 'rollingSumDeaths' ].push( dailyRecord.deaths );
        // dict[ 'rollingSumConfirmed' ].push( dailyRecord.confirmed );
        dict[ 'dates' ].push( dailyRecord.date );
      }
      // added below to sort coutnries
      dict.latest = dict.rollingSumDeaths[ dict.rollingSumDeaths.length - 1 ]
      dictArray.push( dict );

    } );

    // console.log(dictArray);
    // console.log( ' ___ data prep done! ___ ' );


    return dictArray.sort( function ( x, y ) {
      return d3.descending( x.latest, y.latest );
    } )
  }

  function prepDataFromJSON( data, chosenCountry ) {
    // console.log(data);
    // const keys = Object.keys( data )
    const keys = [
      'US',
      'Italy',
      'Spain',
      'Germany',
      'China',
      chosenCountry
    ]

    const dataReady = keys.map( ( country ) => {
      return {
        name: country,
        values: data[ country ].map( ( obj ) => {
          return {
            date: obj.date,
            deaths: +obj.deaths
          }
        } )

      }

    } );
    return dataReady.sort( function ( x, y ) {
      return d3.descending( x.latest, y.latest );
    } )
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
        description: `deaths: ${format(array[lastIndex].deaths)} | confirmed: ${format(array[lastIndex].confirmed)}`,
        imageSrc: '/static/img/flags/Ensign_Flag_Nation_' + country.toLowerCase().replace( ' ', '_' ) + '-128.png'
      };

    } );

    $( '#opts' ).ddslick( {
      data: ddJSON,
      width: 300,
      height: 200,
      onSelected: function ( d ) {
        // console.log(d.selectedData.value)

        const static = ( static_or_latest == 'static' );

        if ( static ) {
          console.log( 'static_or_latest: ', static_or_latest );
          var data = testdaily;
          chosenFiguresUp( data, d.selectedData.value );
          splatD3Circles( prepDataFromJSON( data, d.selectedData.value ) );

        } else {

          console.log( 'static pass' );

        }

        const latest = ( static_or_latest == 'latest' );

        if ( latest ) {
          console.log( 'static_or_latest: ', static_or_latest );

          const name = d.selectedData.value;
          const url = 'https://pomber.github.io/covid19/timeseries.json';

          d3.json( url, function ( err, data ) {
            chosenFiguresUp( data, name );
            splatD3Circles( prepDataFromJSON( data, name ) );
          } );
        } else {
          console.log( 'latest pass' );
        }
      }
    } );
  }
  function splatD3Circles( data ) {
    // When the browser window is resized, responsify() is called.
    const format = d3.format( ',' );
    const formatDecimal = d3.format( '.4' );
    const dateFormatter = d3.timeFormat( "%d-%b" );

    // console.log( ' #### SPLAT-JSON-TABLE- ####' );
    const dataReady = data;
    // console.log( dataReady );
    const arrayForScale = dataReady[ 0 ].values
      .map( ( item ) => {
        return item.deaths;

      } );
    // console.log( ' --- arrayForScale ---' );
    // console.log( arrayForScale );
    var allGroup = data.map( ( d ) => {
      return d.name
    } );
    // console.log( allGroup );
    // set the dimensions and margins of the graph
    var margin = {
        top: 10,
        right: 100,
        bottom: 30,
        left: 50
      },
      width = window.innerWidth - margin.left - margin.right;
    height = window.innerHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select( "#my_dataviz" )
      .append( "svg" )
      .attr( "width", width + margin.left + margin.right )
      .attr( "height", height + margin.top + margin.bottom )
      .append( "g" )
      .attr( "transform",
        "translate(" + margin.left + "," + margin.top + ")" );


    // if the SVG area isn't empty when the browser loads, remove it
    // and replace it with a resized version of the chart
    var svgArea = d3.select( "body" ).select( "#my_dataviz" ).select( "svg" );
    if ( !svgArea.empty() ) {
      svgArea.remove();
    }

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain( data.length )
      .range( d3.schemeSet3 );

    // scales
    var x = d3.scaleLinear()
      .domain( [ 0, arrayForScale.length ] )
      .range( [ 0, width ] );
    var y = d3.scaleLinear()
      .domain( [ 0, d3.max( arrayForScale ) ] )
      .range( [ height, 0 ] );

    svg.append( "g" )
      .attr( "transform", "translate(0," + height + ")" )
      .attr( "class", "axisGold" )
      .call( d3.axisBottom( x ) );

    svg.append( "g" )
      .attr( "transform", "translate(0,15)" )
      .attr( "class", "axisGold" )
      .call( d3.axisTop( x ) )

    ;

    svg.append( "g" )
      .attr( "class", "axisGold" )
      .attr( "transform", "translate(" + width + ",0)" )
      .call( d3.axisRight( y ) );


    console.log('dataReady :>> ', dataReady);
    // Add the lines
    var line = d3.line()
      .x( function ( d, i ) {
        return x( i )
      } )
      .y( function ( d ) {
        return y( +d.deaths )
      } )
    svg.selectAll( "myLines" )
      .data( dataReady )
      .enter()
      .append( "path" )
      .attr( "d", function ( d ) {
        return line( d.values )
      } )
      .attr( "stroke", function ( d ) {
        return myColor( d.name )
      } )
      .style( "stroke-width", 2 )
      .style( "fill", "none" )

    // Add the points
    var circlesGroup = svg
      // First we need to enter in a group
      .selectAll( "myDots" )
      .data( dataReady )
      .enter()
      .append( 'g' )
      .style( "fill", function ( d ) {
        return myColor( d.name )
      } )
      // Second we need to enter in the 'values' part of this group
      .selectAll( "myPoints" )
      .data( function ( d ) {
        return d.values
      } )
      .enter()
      .append( "circle" )
      .attr( "r", 5 )
      .attr( "stroke", "#002B36" )
      .attr( "stroke-width", "1" );

    // console.log( ' --- circlesGroup ---' );
    // console.log( circlesGroup );

    circlesGroup
      .transition()
      .duration( 1000 )
      .attr( "cx", ( d, i ) => x( i ) )
      .attr( "cy", d => y( d.deaths ) );


    // Add a legend at the end of each line
    var position = data[ 0 ].values.length - 1;
    // console.log( 'position -->> ' + position );
    svg
      .selectAll( "myLabels" )
      .data( dataReady )
      .enter()
      .append( 'g' )
      .append( "text" )
      .datum( function ( d ) {
        return {
          name: d.name,
          value: d.values[ d.values.length - 1 ]
        };
      } ) // keep only the last value of each time series
      .attr( "transform", function ( d, i ) {
        return "translate(" + x( position ) + "," + y( d.value.deaths ) + ")";
      } ) // Put the text at the position of the last point
      .attr( "x", 8 ) // shift the text a bit more right
      .text( function ( d ) {
        return d.name;
      } )
      .style( "fill", function ( d ) {
        return myColor( d.name )
      } )
      .style( "font-size", 16 )
      .style( "font-style", 'bold' )
      .style( "font-style", 'italic' );



    // X axis label 'Days' on top
    svg.append( "text" )
      .attr( "text-anchor", "middle" ) // this makes it easy to centre the text as the transform is applied to the anchor
      .attr( "transform", "translate(" + ( width / 1.9 ) + ",0)" ) // centre below axis
      .style( 'fill', '#B58900' )
      .style( "font-size", 18 )
      .text( "Days" )
      .style( "font-family", 'Arial' )
      .style( "font-style", 'bold' )
      .style( "font-style", 'italic' );

    // Y axis label on top
    svg.append( "text" )
      .attr( "text-anchor", "middle" ) // this makes it easy to centre the text as the transform is 
      .attr( "transform", "translate(" + ( width * 0.97 ) + "," + height / 1.95 + ")" ) // centre below axis
      .style( 'fill', '#B58900' )
      .text( "Deaths" )
      .style( "font-size", 18 )
      .style( "font-family", 'Arial' )
      .style( "font-style", 'bold' )
      .style( "font-style", 'italic' );


    var toolTip = d3
      .tip()
      .attr( "class", "tooltip" )
      .offset( [ 80, -60 ] )
      .html( function ( d, i ) {
        return ( '<strong>' + format( d.deaths ) + '</strong><hr class="border-success my-1"><strong>' + d.date + '</strong>' );
      } );

    // console.log( ' --- toolTip --- O' );
    // console.log( toolTip );

    circlesGroup.call( toolTip );

    // console.log(toolTip);

    circlesGroup.on( "mouseover", function ( d, i ) {
        // console.log( ' ^^^^^^^^^ MOUSE-OVER ^^^^^^^^^' )
        console.log( i );
        toolTip.show( d );
      } )
      // onmouseout event
      .on( "mouseout", function ( data, index ) {
        // console.log( ' ________MOUSE_OUT________' );
        toolTip.hide( 'TEST' );
      } );
  }

