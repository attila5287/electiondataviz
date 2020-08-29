  function updateBarsOnly( data, height, width, chartGroup, x,yScale, svg, yAxis ) {
    let format = d3.format(data.formatY);
    yScale = yScaleUp( data, height );// updates u axis

      // function used for updating xAxis var upon click on axis label
    yAxis =  renderAxes(yScale, yAxis);
    function renderAxes(newYScale, yAxis) {
        let newAxis = d3
          .axisRight( newYScale )
          .tickFormat( format );
      
        yAxis.transition()
          .duration(1000)
          .call(newAxis);
      
        return yAxis;
    }

    // Step 9: Title  
    // ==============================================
    chartGroup.append( "text" )
      .attr( "transform", `translate(${width / 2}, ${height + 15})` )
      .text( `Vote ${data.title} ${data.state}` )
      .classed( 'title', true );

    // Step 10: Bars
    // ==============================================
    let colors = {};
    colors[ data.blue.name ] = "#01018B";
    colors[ data.red.name ] = "#8A0101";


    // trick to show the second grp offsett behind first
    data.blue.values.forEach( d => {
      // console.log('d :>> ', d);
      d.year = d.year + 1.5;
    } );
    // Add the points
    let barsGroup = chartGroup
      // First we need to enter in a group
      .selectAll( "myBarGroup" )
      .data(
        [ data.blue,
          data.red,
        ]
      )
      .enter()
      .append( 'g' )
      .style( "fill", d => colors[ d.name ] )
      // Second we need to enter in the 'values' part of this group
      .selectAll( "myBars" )
      .data( d => d.values )
      .enter().append( "rect" )
      .attr( "class", "myBars" )
      .attr( "x", d => x( d.year ) )
      .attr( "y", d => yScale( 0 ) )
      .attr( "stroke", d => "#000" )
      .attr( "stroke-width", d => "2px" )
      .attr( "stroke-opacity", d => "0.5" )
      .attr( "height", d => height - yScale( +d.value*0.25 ) )
      .attr( "width", d => width * 0.04 );

        console.log('height :>> ', height);
      // d3.select("svg").selectAll("rect")
      //   .each(function(d, i) {
          
      //     console.log("element", this);
      //     console.log("data", d);
      //     console.log("index", i);
          
      //   });

    // Animation
    svg.selectAll( "rect" )
      .transition()
      .duration( 2000 )
      .attr( "y", d => yScale( +d.value ) )
      .attr( "height", function ( d ) {
        return height - yScale( +d.value );
      } )
      .delay( function ( d, i ) {
        // console.log(i); 
        // console.log('d.height :>> ', d);
        return ( i * 30 );
      } );

    

    let toolTip = d3
      .tip()
      .attr( "class", "tooltip" )
      .offset( [ 40, -30 ] )
      .html( d => `
    <div class="card rounded-2xl bg-transparent text-bold text-balo text-light">
      <img class="card-img-top toolt1p border-0 bg-transparent opac-60 mb-0" src="../static/img/cands/p${d.ye4r}${d.nam3}.jpg" alt="cand-img">
      <div class="card-body shadow-turqoise">
        <h5 class="card-title text-light">
          ${prezCandsByYr[ `p${d.ye4r}${d.nam3}` ]}
        </h5>
        <hr class="my-0 border-secondary opac-30>
        <p class="card-title my-0">
          ${format( d.value )} @ ${d.ye4r}
        </p>
      </div>
    </div>
     ` );

    barsGroup.call( toolTip );
    barsGroup.on( "mouseover", function ( d, i ) {
        // console.log( d );
        console.log( i );
        // console.log( 'd :>> ', d.year );
        toolTip.show( d );

        d3.select( this )
          .transition()
          .duration( 500 )
          .attr( "fill", "coral" );
      } )
      // onmouseout event
      .on( "mouseout", function ( data, index ) {
        toolTip.hide( 'TEST' );
        d3.select( this )
          .transition()
          .duration( 1000 )
          .attr( "fill", colors[ data.name ] );
      } );
  }
function yScaleUp ( data, height ) {
  let lows = [
    d3.min( data.blue.values, d => +d.value ),
    d3.min( data.red.values, d => +d.value )
  ];

  console.log( 'lows :>> ', lows );
  let highs = [
    d3.max( data.blue.values, d => +d.value ),
    d3.max( data.red.values, d => +d.value )
  ];

  // Step 5: Create Scales
  //=============================================
  let y = d3.scaleLinear()
    .domain( [ d3.min( lows, d => d * 0.95 ), d3.max( highs, d => d * 1 ) ] )
    .range( [ height, 0 ] );
  return y;
}

