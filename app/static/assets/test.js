function prepTimeSerData( data, state ) {
  console.log( 'state :>> ', state );
  const colors = {
    republican: "red",
    democrat: "blue"
  };
  let winners = {};

  const nested = d3.nest()
    .key( d => d.year )
    .key( d => d.party )
    .rollup( v => d3.max( v, d => +d.candidatevotes ) )
    .entries( data.filter( d => d[ "state" ] == state ) );
  // V~otes store integer {count vs. year} objects
  let bluesV = {
    name: 'Democrats(Votes)',
    values: []
  };
  let redsV = {
    name: 'Republicans(Votes)',
    values: []
  };
  // P~ercentage store integer {perc vs. year} objects
  let bluesP = {
    name: 'Democrats(Perc%)',
    values: []
  };
  let redsP = {
    name: 'Republicans(Perc%)',
    values: []
  };

  nested.forEach( d => {
    let blueCount = {};
    let redCount = {};
    let bluePerc = {};
    let redPerc = {};
    let sumEach = 0;
    // console.log( 'year; :>> ', d.key );

    blueCount[ "year" ] = +d.key;
    blueCount[ "count" ] = +d.values.filter( d => d.key == "democrat" )[ 0 ].value;


    redCount[ "year" ] = +d.key;
    redCount[ "count" ] = +d.values.filter( d => d.key == "republican" )[ 0 ].value;

    redsV.values.push( redCount );
    bluesV.values.push( blueCount );

    d.values.forEach( v => {
      // console.log('this.value :>> ', +v.value)
      sumEach = sumEach + v[ "value" ];
      // console.log( 'sumEach :>> ', sumEach );
    } );

    redPerc[ "year" ] = +d.key;
    redPerc[ "perc" ] = redCount[ "count" ] / sumEach;
    bluePerc[ "year" ] = +d.key;
    bluePerc[ "perc" ] = blueCount[ "count" ] / sumEach;

    redsP.values.push( redPerc );
    bluesP.values.push( bluePerc );
    // console.log('test percentages :>> ', redPerc.value + bluePerc.value);
  } );

  // console.log( 'bluesV~otes :>> ', bluesV );
  // console.log( 'redsV~otes :>> ', redsV );

  // console.log( 'redsP~ercentage :>> ', redsP );
  // console.log( 'bluesP~ercentage :>> ', bluesP.values[0] );

  let timeSeriesData = {
		state: state,
    blue: {
      count: bluesV,
      perc: bluesP
    },
    red: {
      count: redsV,
      perc: redsP
    }
  };
  return timeSeriesData;
}

function timeSeriesUp() {
  // Step 1: Set up our chart
  //= ================================
  var svgWidth = 500;
  var svgHeight = 290;

  var margin = {
    top: 25,
    right: 40,
    bottom: 10,
    left: 40,
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Step 2: Create an SVG wrapper,
  // append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  // =================================
  var svg = d3
    .select( "#connected-time-series" )
    .append( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight )
    ;

  var chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );
  // Step 3:
  // Import data from the .csv file
  // =================================
  d3.csv( '/static/data/csv/president.csv',
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {
        // Step 4: Parse the data
        // Format the data and convert to numerical and date values
        // =================================
        // req'd before sumEach
        var parseTime = d3.timeFormat( "%Y" );
        // Format the data
        data.forEach( row => {
          // console.log( 'row :>> ', row );
          // row.year = parseTime(+row.year);
          row.year = +row.year;
          row.candidatevotes = +row.candidatevotes;
          row.totalvotes = +row.totalvotes;
        } );

        //Step 4-cont'd:  prep data from csv to {name:[{date/value}]}
        let dataReady = prepTimeSerData( data, "Alabama" );

        var numYears = dataReady.blue.count.values.length;

        console.log('numYears :>> ', numYears);


        let years = [
          d3.min( dataReady.blue.perc.values, d => +d.year )-2,
          d3.max( dataReady.red.perc.values, d => +d.year )+2
				];
				console.log('years :>> ', years);
				
        let lows = [
          d3.min( dataReady.blue.perc.values, d => +d.perc ),
          d3.min( dataReady.red.perc.values, d => +d.perc )
        ];
        let highs = [
          d3.max( dataReady.blue.perc.values, d => +d.perc ),
          d3.max( dataReady.red.perc.values, d => +d.perc )
        ];
				// Step 5: Create Scales
        //=============================================
        var x = d3.scaleTime()
          .domain( d3.extent( dataReady.blue.perc.values, d => d.year ) )
          .range( [ 0, width ] );
          
        var y = d3.scaleLinear()
          .domain( [ d3.min(lows, d=>d*.95), d3.max(highs, d=>d*1.05) ] )
          .range( [ height, 0 ] );
          
				var fortime = d3.time.format( "%Y" );
				
        // Step 6: Create Axes // Step 7: Append the axes to 
        // ==============================================
          chartGroup
          .append( "g" )
          .attr( "transform", `translate(0, ${0})` )
          .call( d3
            .axisTop( x )
            .ticks( numYears)
            .tickFormat( d3.time.format( "%Y" ) )
            .tickSize(-height)
           )
					.classed('horizontal text-xl', true )
          ;

        // Add leftAxis to the left side of the display
        chartGroup
          .append( "g" )
          .classed('vertical text-md opac-60', true )
					.call( d3
							.axisLeft( y )
							.tickSize(-width)
							.tickFormat( d3.format(".0%"))
           )
           ;
          
          // Add rightAxis to the right side of the display
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(${width}, 0)` )
          .classed('vertical text-lg opac-70', true )
					.call( d3.axisRight( y )
						.tickFormat( d3.format(".0%")) )
          ; 

        // Step 8: Set up two line generators and append two SVG paths
        // ==============================================
        // Line generators for each line
        var line1 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => y( d.perc ) );

        var line2 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => yCountLinearScale( d.count ) );
          
        
        chartGroup.append( "path" )
          // .data([mojoData]) 
          .attr( "d", line1( dataReady.blue.perc.values ) )
          .classed( "line blue solid", true );

        
          chartGroup.append( "path" )
          .attr( "d", line1( dataReady.red.perc.values ) )
          .classed( "line red solid", true );

					
        // Step 9: Title  
          chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height-5})`)
          .attr("text-anchor", "middle")
          .text(`Vote Perc ${dataReady.state}`)
          .classed('title text-balo text-huge',true)
          ;
      }
    } );

}
timeSeriesUp();

