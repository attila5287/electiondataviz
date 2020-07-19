// ===========  ===========
function timeSeriesCount() {
   
  // Step 1: Set up our chart
  //= ================================
  var svgWidth = 280;
  var svgHeight = 290;

  var margin = {
    top: 15,
    right: 50,
    left: 50,
    bottom: 20,
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Step 2: Create an SVG wrapper,
  // append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  // =================================
  var svg = d3
    .select( "#time-series-count" )
    .append( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

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

        console.log( 'numYears :>> ', numYears );

        let years = [
          d3.min( dataReady.blue.count.values, d => +d.year ) - 2,
          d3.max( dataReady.red.count.values, d => +d.year ) + 2
        ];
        console.log( 'years :>> ', years );

        let lows = [
          d3.min( dataReady.blue.count.values, d => +d.count ),
          d3.min( dataReady.red.count.values, d => +d.count )
        ];
        let highs = [
          d3.max( dataReady.blue.count.values, d => +d.count ),
          d3.max( dataReady.red.count.values, d => +d.count )
        ];
        // Step 5: Create Scales
        //=============================================
        var x = d3.scaleLinear()
          .domain( d3.extent( dataReady.blue.count.values, d => d.year ) )
          .range( [ 0, width ] );

        var y = d3.scaleLinear()
          .domain( [ d3.min( lows, d => d * .95 ), d3.max( highs, d => d * 1.05 ) ] )
          .range( [ height, 0 ] );

        // Step 6: Create Axes // Step 7: Append the axes to 
        // ==============================================
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(0, ${0})` )
          .call( d3
            .axisTop( x )
            .ticks( numYears )
            .tickFormat( d3.format( "" ) )
            .tickSize( -height )
          )
          .classed( 'horizontal text-md', true );

        // Add leftAxis to the left side of the display
        chartGroup
          .append( "g" )
          .classed( 'vertical text-md opac-60', true )
          .call( d3
            .axisLeft( y )
            .tickSize( -width )
          );

        // Add rightAxis to the right side of the display
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(${width}, 0)` )
          .classed( 'vertical text-md opac-70', true )
          .call( d3.axisRight( y )
            .tickFormat( d3.format( "," ) ) );

        // Step 8: Set up two line generators and append two SVG paths
        // ==============================================
        // Line generators for each line
        var line1 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => y( d.count ) );

        var line2 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => yCountLinearScale( d.count ) );


        chartGroup.append( "path" )
          // .data([mojoData]) 
          .attr( "d", line1( dataReady.blue.count.values ) )
          .classed( "line blue solid", true );


        chartGroup.append( "path" )
          .attr( "d", line1( dataReady.red.count.values ) )
          .classed( "line red solid", true );


        // Step 9: Title  
        chartGroup.append( "text" )
          .attr( "transform", `translate(${width / 2}, ${height+10})` )
          .attr( "text-anchor", "middle" )
          .text( `Vote Count ${dataReady.state}` )
          .classed( 'title text-balo text-xl', true );
      }
    } );

}

timeSeriesCount();

