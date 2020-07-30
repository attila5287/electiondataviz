function gaugeUp (dataReady) {
  const round = x => Math.round(x);
  const svgArea = d3.select( `#gauge-swing` ).select( "svg" );
  // clear svg is not empty
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }

  // Step 1: Set up our chart
  let svgWidth = $( `#gauge-swing` ).width();

  // console.log('round*svgWidth :>> ', round(svgWidth));

  let svgHeight = 0.7 * svgWidth;
  const fivePercent = round(svgWidth*0.05);
  const tenPercent = fivePercent*2;
  let margin = {
    top: tenPercent,
    bottom:fivePercent,
    left: fivePercent,
    right: fivePercent,
  };
  
  // console.log('svgHeight :>> ', svgHeight);
  // console.log('svgWidth :>> ', svgWidth);
  // console.log('margin :>> ', margin);
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;

  // Step 2: Create an SVG wrapper,
  // append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  // =================================
  let svg = d3
    .select( `#gauge-swing` )
    .append( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );
  const numYears = dataReady.blue.count.values.length;
  let redWins = 0;
  let blueWins = 0;
  let winnerByYear = {};
  const years = dataReady.red.perc.values.map(d=>d.year);  
  // console.log('years  :>> ', years);
    
  for ( let i = 0; i < numYears; i++ ) {
    const year = years[i];
    const red = +dataReady.red.count.values[ i ].count;
    const blue = +dataReady.blue.count.values[ i ].count;
    // console.log( 'blue :>> ', blue );
    // console.log( 'red :>> ', red );
    if ( red > blue ) {
      redWins = redWins + 1;
      winnerByYear[year] = 'scoreRed text-lg';
    } else {
      blueWins = blueWins + 1;
      winnerByYear[year] = 'scoreBlue text-lg';
    }
  }
  // console.log('winnerBy :>> ', winnerByYear);
  const arr = dataReady.red.perc.values.map(d=>d.year);  

  // console.log('arr :>> ', arr);

  // console.log( 'if redWins :>> ', redWins );
  // console.log( 'else blueWins :>> ', blueWins );
  // console.log('svgWidth :>> ', svgWidth*0.1);
  var arc = d3.arc()
    .innerRadius( svgWidth*0.5*.3)
    .outerRadius( svgWidth*0.8*.3 )
    .cornerRadius( 5 )
    .padAngle( 0 )
    ;

  var scale = d3.scaleLinear().domain( [ 0, 100 ] ).range( [ 0, 180 ] );
  let colors = [ "#01018B", "#f8a4a4", "#8A0101" ];


  let diffPercent = ( ( redWins / numYears ) * 100 );

  // initialize pie chart
  var pie = d3.pie()
    .startAngle( ( -1 * Math.PI ) / 2 )
    .endAngle( Math.PI / 2 )
    .value( function ( colors ) {
      return 30 / colors.length;
    } );

  // draw the arcs. one for each color
  var arcs = svg.selectAll( '.arc' )
    .data( pie( colors ) )
    .enter()
    .append( 'path' )
    .attr( "d", arc )
    .attr( "transform", "translate(200,200)" )
    .attr( "transform", function ( d ) {
      return `translate(${svgWidth*0.5}, ${svgHeight-50 })`;
    } )
    .style( "fill", function ( d, i ) {
      return colors[ i ];
    } );

  // set up the needle
  var needle = svg.selectAll( ".needle" )
    .data( [ 0 ] )
    .enter()
    .append( 'line' )
    .attr( "x1", 0 )
    .attr( "x2", svgHeight*-1*0.33 )
    .attr( "y1", 0 )
    .attr( "y2", 0 )
    .classed( "needle", true )
    .attr( "transform", function ( d ) {
      return `translate(${svgWidth*0.5}, ${svgHeight-50 }) rotate(  ${scale( d )-25 })`;
    } );
    

  // console.log(svg.selectAll( ".needle" ))
  svg.selectAll( ".needle" ).data( [ diffPercent ] )
    .transition()
    .ease( d3.easeElasticOut )
    .duration( 4000 )
    .attr( "transform", function ( d ) {
      // console.log( d, scale( d ) );
      // console.log( 'check if one-wighty', scale( 100 ) );
      return `translate(${svgWidth*0.5}, ${svgHeight-50 }) rotate( ${scale( d ) })`;
    } );

  // Step 9: Title  
  // ==============================================
  svg.append( "text" )
  .attr( "transform", `translate(${svgWidth*0.5}, ${svgHeight-25 })` )
  .text( `Last 11 Elections, ${dataReady.state}` )
  .classed( 'title', true );
  // Step : Score Total  blue
  // ==============================================
  svg.append( "text" )
  .attr( "transform", `translate(${svgWidth*0.35}, ${svgHeight*0.2 })` )
  .text( `Blue ${blueWins} Wins` )
  .classed( 'scoreBlue text-lg', true );
  // Step : Score Total  red
  // ==============================================
  svg.append( "text" )
  .attr( "transform", `translate(${svgWidth*0.65}, ${svgHeight*0.2 })` )
  .text( `Red Wins ${redWins}` )
  .classed( 'scoreRed text-lg', true );


  
  // console.log('tenPer :>> ', tenPercent);
    // init margin bottom and increase each year thus downwards
  let  marginBottom = 0;
  
  let winnerColors = {};
  // add the years colored by the winner RIGHT  
  for (let i = 0; i < 5; i++) {
    const year = years[i];
    marginBottom = fivePercent+tenPercent*i;
    svg.append( "text" )
    .attr( "transform", `translate(${svgWidth*0.1}, ${svgHeight*0.05 + marginBottom })` )
    .text( ` ${year}` )
    .classed( winnerByYear[year], true )
    ;
    
  }
  // add the years colored by the winner LEFT
  for (let i = 5; i < years.length; i++) {
    const year = years[i];
    marginBottom = fivePercent+tenPercent*(i-5);
    svg.append( "text" )
      .attr( "transform", `translate(${svgWidth*0.9}, ${svgHeight*0.0001 + marginBottom })` )
      .text( ` ${year}` )
      .classed( winnerByYear[year], true );
  }
  
  
  
}
