function lineCirclesUpdate( selectedIndex, params, dataReady, height, width, chartGroup, xScale, yScale, leftAxis ) {
  // ================================
  const showLast = list => list[ list.length - 1 ];
  // ================================
  var parseTime = d3.timeParse( "%Y" );
  d3.json( `/bea/api/${selectedIndex}`, function ( err, dataAPI ) {
    // console.log( 'dataReady :>> ', dataReady );
    // let selState = dataAPI[ indexNoBySt[ dataReady.name ] ]; // row with selected param/state
    let filtered = dataAPI.Data.filter( d => d.GeoName == dataReady.name );
    console.log( 'filtered -> ', showLast(filtered) );

    let dataXtra = []; // 
    filtered.forEach( r => { // obj.s w/ {year/value} fields
      // console.log('r :>> ', +r.DataValue);
      // console.log('r :>> ', r.DataValue.replaceAll(",", ""));
      dataXtra.push( {
        year: +r.TimePeriod,
        value: +r.DataValue.replaceAll(",", ""),
      } );
    } );
    console.log( 'dataXtra :>> ', dataXtra );

    yScale = d3.scaleLinear() // min max values for y scale
      .domain( [
        d3.min( dataXtra.map( d => +d.value ) ),
        d3.max( dataXtra.map( d => +d.value ) ),
      ] )
      .range( [ height, 0 ] );

    var line = d3 //Line generator function
      .line() 
      .x( d => xScale( parseTime( +d.year ) ) )
      .y( d => yScale( +d.value ) );

    leftAxis = renderAxesParam( yScale, leftAxis, width );

    var lineGroup = chartGroup // empty selection
      .selectAll( ".line-xtra" )
      .data( [ dataXtra ],   d =>  d);

    let sw = function adjustStrokeWidth( width ) { // line thickness
      let dynamicSw = { // radius per width
        smallScreen: "1.25",
        largeScreen: "2.75",
      };
      let strokeWidth = ""; // faster with string
      if ( width < 500 ) {
        strokeWidth = dynamicSw.smallScreen; // faster with string
      } else {
        strokeWidth = dynamicSw.largeScreen; // faster with string
      }
      return strokeWidth;
    };

    lineGroup //append path per line function
      .enter()
      .append( "path" )
      .attr( "class", "line-xtra" )
      .merge( lineGroup )
      .transition()
      .ease( d3.easeElastic )
      .duration( 1000 )
      .attr( "d", line )
      .attr( "stroke-width", sw( width ) );
    // -------------------------------------------
    // ---- circles from now on-------------------
    let radius = function adjustRadius( width ) {
      // console.log('width :>> ', width);
      let dynamicRadius = { // radius per width
        smallScreen: "5",
        largeScreen: "5",
      };
      let r = 10; // strings faster
      if ( width < 500 ) {
        r = dynamicRadius.smallScreen = 5;
      } else {
        r = dynamicRadius.smallScreen = 7;
      }
      return r;
    };

    // append circles to data points
    var circlesGroup = chartGroup.selectAll( "circle" )
      .data( dataXtra );
      
    circlesGroup
      .enter()
      .append( "circle" )
      .classed( "circles-xtra", true )
      .attr( "fill", "#aaaaff" )
      .attr( "r", radius( width ) )
      .attr( "cx", d => xScale( parseTime( d.year ) ) );

    let ctr = 0;
    circlesGroup.each( c => {
      // console.log('c :>> ', c);
      ctr = ctr + 1;
    } );

    // console.log('ctr :>> ', ctr);

    let circleTooltip = d3
      .tip()
      .attr( "class", "tooltip" )
      .offset( [ 40, -30 ] )
      .html( d => `
        <div class="card rounded-2xl bg-transparent text-bold text-balo text-light">
          <div class="card-body shadow-turqoise">
            <h5 class="card-title text-light">
                ${d.year}
                </h5>
                <hr class="border-info opac-50 my-0>
                <p class="card-text">
                ${+d.value}
                </p>
          </div>
        </div>
          ` );

    chartGroup.selectAll( "circle" ).call( circleTooltip );
    // Event listeners with transitions
    circlesGroup.on( "mouseover", function ( d, i ) {
        console.log( 'd :>> ', d );
        console.log( 'i :>> ', i );
        circleTooltip.show( d );
        d3.select( this )
          .transition()
          .duration( 1000 )
          .attr( "r", radius( width ) * 4 )
          .attr( "fill", "lightblue" );
      } )

      .on( "mouseout", function () {
        circleTooltip.hide( 'TEST' );
        d3.select( this )
          .transition()
          .duration( 1000 )
          .attr( "r", radius( width ) )
          .attr( "fill", "#aaaaff" );
      } );

    // transition on page load
    chartGroup.selectAll( "circle" )
      .transition()
      .duration( 1000 )
      .ease( d3.easeElastic )
      .delay( ( d, i ) => i * Math.round( Math.random() * 80 ) )
      .attr( "cy", d => yScale( +d.value ) );


  } );
}
const renderAxesParam = ( newYScale, lAxis, width ) => {
  let newAxis = d3
    .axisLeft( newYScale )
    .tickSize( -width )
  // .tickFormat( d3.format(format) )
  ;

  lAxis
    .transition()
    .ease( d3.easeBounce )
    .duration( 1500 )
    .call( newAxis );

  return lAxis;
};
