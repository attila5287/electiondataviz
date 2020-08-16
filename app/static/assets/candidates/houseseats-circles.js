function houseSeatsCirclesUp( data, year ) {
  const svgArea = d3.select( '#house-seats' ).select( "svg" );
  // clear svg is not empty
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }
  // Step 1: Set up our chart
  let svgWidth = $( `#house-seats` ).width();
  let svgHeight = 0.5 * svgWidth;
  let margin = {
    top: 10,
    right: 10,
    left: 10,
    bottom: 10,
  };
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;

  // Step 2: Create an SVG wrapper,
  // append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  // =================================
  let svg = d3
    .select( `#house-seats` )
    .append( "svg" )
    .classed( "bg-glass rnd-2xl p-1", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );

  // x,rad,cos,sin
  const dataReady = prepRadialData( data, year );
  // ====================
  var xScale = d3.scaleLinear()
    .domain( [ 0, data.length ] )
    .range( [ 0, width ] );

  var yScale = d3.scaleLinear()
    .domain( [ 0, 1 ] )
    .range( [ height, 0 ] );
  // append circles to data points
  var circlesGroup = chartGroup.selectAll( "circle" )
    .data( dataReady )
    .enter()
    .append( "circle" )
    .attr( "cx", d => width * 0.7 + Math.floor( Math.random() * width * 0.2 ) ) // returns a random integer from 0 to width 
    .attr( "cx", d => height * 0.7 + Math.floor( Math.random() * height * 0.2 ) ) // returns a random integer from 0 to height 
    .attr( "fill", d => d.fill )
    .attr( "fill-opacity", d => 0.77 )
    .attr( "stroke", d => "white" )
    .attr( "stroke-opacity", d => 0.7 )
    .attr( "r", "8" )
    .on( "mouseover", function ( d ) {
      toolTip.show( d );
      // console.log('d :>> ', d);
    } )
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on( "mouseout", function ( d ) {
      toolTip.hide( d );
      // console.log('d :>> ', d);
    } );


  chartGroup.selectAll( "circle" )
    .transition()
    .duration( 2000 )
    .attr( "cx", d => xScale( d.cos * ( data.length * .5 ) + ( data.length / 2 ) ) )
    .attr( "cy", d => yScale( d.sin ) );

  const redTitle = seatsByState[ 'e' + year + 'd' ];
  const bluTitle = seatsByState[ 'e' + year + 'r' ];
  const othTitle = seatsByState[ 'e' + year + 'r' ];


  const tenPrc = height * .1;

  const title2 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "blue" )
    .attr( 'x', width / 2 - 20 )
    .attr( 'y', height - 2 * tenPrc )
    .text( bluTitle );

  const title1 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "red" )
    .attr( 'x', width / 2 - 20 )
    .attr( 'y', height - tenPrc )
    .text( redTitle );

  const title3 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "goldenrod" )
    .attr( 'x', width / 2 - 20 )
    .attr( 'y', height )
    .text( othTitle );

  // Step 1: Initialize Tooltip

  let toolTip = d3
    .tip()
    .attr( "class", "tooltip" )
    .offset( [ 40, -30 ] )
    .html( d => `
    <div class="card rounded-2xl bg-transparent text-bold text-balo text-light">

      <img class="card-img-top toolt1p border-0 bg-transparent opac-60 mb-0" src="../static/img/cands/p2016d.jpg" alt="cand-img">

      <div class="card-body shadow-turqoise">
        <h5 class="card-title text-light">
          test
        </h5>
        <hr class="my-0 border-secondary opac-30>
        <p class="card-title my-0">
          test
        </p>
      </div>

    </div>
    ` );


  // Step 2: Create the tooltip in chartGroup.
  circlesGroup.call( toolTip );

  // Step 3: Create "mouseover" event listener to display tooltip

}
