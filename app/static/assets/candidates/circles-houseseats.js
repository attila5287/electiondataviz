function houseSeatsCirclesUp( data, yearSelected ) {
  const svgArea = d3.select( '#house-seats' ).select( "svg" );
  // clear svg is not empty
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }
  // Step 1: Set up our chart
  let svgWidth = $( `#house-seats` ).width();
  let svgHeight = 0.55 * svgWidth;
  let margin = {
    top: 30,
    right: 20,
    left: 20,
    bottom: 20,
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
    .classed( "bg-glass opac-70 rounded-arc my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );

  //step 3
  const nested = d3.nest()
    .key( d => d.party )
    .entries( data.filter( d => d[ "year" ] == yearSelected ) );
  const dict = {};
  nested.forEach( e => {
    // console.log('e.values[0] :>> ', e.values[0]["party"]);
    dict[ e.values[ 0 ][ "party" ] ] = e.values[ 0 ];
  } );
  const seatBlu = Math.round( +dict[ 'D' ][ "eleVo" ] * 535 / 100 );
  const seatRed = Math.round( +dict[ 'R' ][ "eleVo" ] * 535 / 100 );

  // console.log( 'seatBlu :>> ', seatBlu );
  // console.log( 'seatRed :>> ', seatRed );

  // ====================
  var xScale = d3.scaleLinear()
    .domain( [ 0, data.length ] )
    .range( [ 0, width ] );

  var yScale = d3.scaleLinear()
    .domain( [ 0, 1 ] )
    .range( [ height, 0 ] );

  // x,rad,cos,sin
  const dataReady = prepRadialData( seatRed, seatBlu, 535 - seatRed - seatBlu );

  // append circles to data points
  var circlesGroup = chartGroup.selectAll( "circle" )
    .data( dataReady )
    .enter()
    .append( "circle" )
    .attr( "cx", d => xScale( d.cos * ( data.length * .5 ) + ( data.length / 2 ) ) )
    .attr( "cy", d => yScale( d.sin ) )
    .attr( "fill", d => d.fill )
    .attr( "fill-opacity", d => 0.77 )
    .attr( "stroke", d => "white" )
    .attr( "stroke-opacity", d => 0.7 )
    .attr( "r", "4" );

  const redTitle = `Red ${seatRed}`;
  const bluTitle = `Blue ${seatBlu}`;
  const othTitle = `Others ${535 - seatRed - seatBlu}`;

  const tenPrc = height*.1;
  
  const title1 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "red" )
    .attr( 'x', width / 2-20 )
    .attr( 'y', height-tenPrc )
    .text( redTitle )
    ;
    
    const title2 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "blue" )
    .attr( 'x', width / 2 -20)
    .attr( 'y', height-2*tenPrc )
    .text( bluTitle )
    ;
    
    const title3 = svg.append( 'text' )
    .classed( 'text-outlined text-3xl', true )
    .attr( 'fill', "goldenrod" )
    .attr( 'x', width / 2 -20)
    .attr( 'y', height )
    .text( othTitle )
    ;

}
