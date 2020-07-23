function barsPerc( state ) {
  // Step 0: Remove existing chart if any
  //=========================
  const  svgArea = d3.select(`#bars-perc`).select("svg");
  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }  
  // Step 1: Set up our chart
  let svgWidth = $( `#bars-perc` ).width();
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
    .select( `#bars-perc` )
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
          d3.min( dataReady.blue.perc.values, d => +d.year ),
          d3.max( dataReady.red.perc.values, d => +d.year )
        ];
        // console.log( 'years :>> ', years );

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
        let x = d3.scaleTime()
          .domain( years )
          .range( [ 0, width ] )
          ;
        let y = d3.scaleLinear()
          .domain( [ d3.min( lows, d => d * 1 ), d3.max( highs, d => d * 1 ) ] )
          .range( [ height, 0 ] );


        // d3.axisBottom(x).ticks(d3.timeYear.every(1))

        // Step 6: Create Axes // Step 7: Append the axes to 
        // ==============================================
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(0, ${0})` )
          .call( d3
            .axisTop( x )
            .ticks( numYears )
            .tickFormat( d3.format( ".4" ) )
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
            .tickFormat( d3.format( ".0%" ) )
          );

        // Add rightAxis to the right side of the display
        chartGroup
          .append( "g" )
          .attr( "transform", `translate(${width}, 0)` )
          .classed( 'vertical', true )
          .call( d3.axisRight( y )
            .tickFormat( d3.format( ".0%" ) ) );


        // Step 9: Title  
        // ==============================================
        chartGroup.append( "text" )
          .attr( "transform", `translate(${width / 2}, ${height+15})` )
          .text( `Vote Perc ${dataReady.state}` )
          .classed( 'title', true );

        // Step 10: Bars
        // ==============================================
        let myColor = {};
        myColor[ dataReady.blue.perc.name ] = "#01018B";
        myColor[ dataReady.red.perc.name ] = "#8A0101";


        // trick to show the winner
        dataReady.blue.perc.values.forEach(d => {
          // console.log('d :>> ', d);
          d.year = d.year+1.5;
        });
        // Add the points
        let barsGroup = chartGroup
          // First we need to enter in a group
          .selectAll( "myDots" )
          .data(
            [ dataReady.blue.perc,
              dataReady.red.perc
            ]
          )
          .enter()
          .append( 'g' )
          .style( "fill", d => myColor[ d.name ] )
          // Second we need to enter in the 'values' part of this group
          .selectAll( "myPoints" )
          .data( d => d.values )
          .enter()
          .append( "rect" )
          .attr( "width", 7 )
          .attr( "height", 7 )
          .attr( "x", d => x( d.year ) )
          .attr( "y", d => y( 0) )
            .attr("height", d => height - y(0))
            .attr( "width", d => width * 0.05 )
          ;
        
        // Animation
        svg.selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", function(d) { return y(d.perc); })
          .attr("height", function(d) { return height - y(d.perc); })
          .delay(function(d,i){ 
            // console.log(i); 
            return(i*30)});
        
        const format = d3.format( ".0%" );

        let toolTip = d3
          .tip()
          .attr( "class", "tooltip" )
          .offset( [ 40, -30 ] )
          .html( d =>
            `<strong class="mt-2 mx-4 mb-0">${format(d.perc)}</strong><hr class="my-0"><strong class="mt-0 mb-3">${d.year}</strong>` );

        barsGroup.call( toolTip );
        barsGroup.on( "mouseover", function ( d, i ) {
          console.log( d );
          console.log( i );
          console.log( 'd :>> ', d.year );
          toolTip.show( d );

          d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "coral");            
          } )
          // onmouseout event
          .on( "mouseout", function ( data, index ) {
            toolTip.hide( 'TEST' );

            d3.select(this)
              .transition()
              .duration(1000)
              .attr( "fill", myColor[ data.name ] )
              ;

          } );
        
        // Bars

  
      }
    } );
}

barsPerc( "Colorado" );
