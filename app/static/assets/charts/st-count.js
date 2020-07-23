function timeSeriesCount(state) {
  // Step 0: Remove existing chart if any
  //=========================
  const svgArea = d3.select(`#time-series-count`).select("svg");
  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }  
  // Step 1: Set up our chart
  //=========================
  let svgWidth = $( `#time-series-count` ).width();
  let svgHeight = 0.4 * svgWidth;

  let margin = {
    top: 20,
    right: 50,
    left: 50,
    bottom: 25,
  };

  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;

  // Step 2: Create an SVG wrapper,
  // append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  // =================================
  let svg = d3
    .select( "#time-series-count" )
    .append( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

  let chartGroup = svg.append( "g" )
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
        let parseTime = d3.timeFormat( "%Y" );
        // Format the data
        data.forEach( row => {
          // console.log( 'row :>> ', row );
          // row.year = parseTime(+row.year);
          row.year = +row.year;
          row.candidatevotes = +row.candidatevotes;
          row.totalvotes = +row.totalvotes;
        } );

        //Step 4-cont'd:  prep data from csv to {name:[{date/value}]}
        let dataReady = prepTimeSerData( data, state );

        let numYears = dataReady.blue.count.values.length;

        // console.log( 'numYears :>> ', numYears );

        let years = [
          d3.min( dataReady.blue.count.values, d => +d.year ),
          d3.max( dataReady.red.count.values, d => +d.year )
        ];
        // console.log( 'years :>> ', years );

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
        let x = d3.scaleLinear()
          .domain( d3.extent( dataReady.blue.count.values, d => d.year ) )
          .range( [ 0, width ] );

        let y = d3.scaleLinear()
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
          .classed( 'horizontal ', true );

        // Add leftAxis to the left side of the display
        chartGroup
          .append( "g" )
          .classed( 'vertical', true )
          .call( d3
            .axisLeft( y )
            .tickSize( -width )
          );

        // Add rightAxis to the right side of the display
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(${width}, 0)` )
          .classed( 'vertical', true )
          .call( d3.axisRight( y )
            .tickFormat( d3.format( "," ) ) );

        // Step 8: Set up two line generators and append two SVG paths
        // ==============================================
        // Line generators for each line
        let line1 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => y( d.count ) );

        let line2 = d3
          .line()
          .x( d => x( d.year ) )
          .y( d => yCountLinearScale( d.count ) );


        chartGroup.append( "path" )
          // .data([mojoData]) 
          .attr( "d", line1( dataReady.blue.count.values ) )
          .classed( "line blue dashed", true );


        chartGroup.append( "path" )
          .attr( "d", line1( dataReady.red.count.values ) )
          .classed( "line red dashed", true );


        // Step 9: Title  
        chartGroup.append( "text" )
          .attr( "transform", `translate(${width / 2}, ${height+20})` )
          .text( `Vote Count ${dataReady.state}` )
          .classed( 'title', true );
        // Step 10: Circles
        // ==============================================
        let myColor = {};
        myColor[ dataReady.blue.count.name ] = "#01018B";
        myColor[ dataReady.red.count.name ] = "#8A0101";

        // Add the points
        let circlesGroup = chartGroup
          // First we need to enter in a group
          .selectAll( "myDots" )
          .data(
            [ dataReady.blue.count,
              dataReady.red.count
            ]
          )
          .enter()
          .append( 'g' )
          .style( "fill", d => myColor[ d.name ] )
          .selectAll( "myPoints" )
          .data( d => d.values )
          .enter()
          .append( "circle" )
          .attr( "r", 1 )
          ;
          // transition on page load
          chartGroup.selectAll("circle")
          .transition()
          .duration(1000)
          .attr( "r", 8 )
          .delay(function(d,i){ return 1100-100*i; }) 
          .attr( "cx", d => x( d.year ) )
            .attr( "cy", d => y( d.count ) )
            ;
          


        const format = d3.format( "," );

        let toolTip = d3
          .tip()
          .attr( "class", "tooltip" )
          .offset( [ 40, -30 ] )
          .html( d =>
            `<strong class="mt-2 mx-4 mb-0">${format(d.count)}</strong><hr class="my-0"><strong class="mt-0 mb-3">${d.year}</strong>` );

        circlesGroup.call( toolTip );
        circlesGroup.on( "mouseover", function ( d, i ) {
          console.log( d );
            console.log( i );
            console.log( 'd :>> ', d.year );
            toolTip.show( d );
          } );

        circlesGroup
          .on( "mouseout", function ( d ) {
            toolTip.hide( 'TEST' );
          } );          
      }
    } );

}

timeSeriesCount( "Colorado");
