function lineCirclesUpdate( selectedIndex , params, dataReady, height, width, chartGroup, x) {
  d3.csv( `../static/data/csv-int/${params[ selectedIndex ].file}`, function ( err, rows ) {
    // Remove is the first <path> element from the axis group: 
    d3.select( ".vertical-int" ).remove();
    // d3.select( ".line-xtra" ).remove();

    // console.log( 'dataReady :>> ', dataReady );
    let rowSt = rows[ indexNoBySt[ dataReady.name ] ]; // row with selected param/state

    delete rowSt.name;

    let dataXtra = [];
    Object.keys( rowSt ).forEach( e => {
      // console.log( 'e :>> ', e );
      dataXtra.push( {
        year: +e,
        value: +rowSt[ e ],
      } );
    } )
    ;

    let y2 = d3.scaleLinear() // min max values for y scale
      .domain( [
        d3.min( Object.keys( rowSt ).map( year => +rowSt[ year ] ) ),
        d3.max( Object.keys( rowSt ).map( year => +rowSt[ year ] ) ),
      ] )
      .range( [ height, 0 ] )
    ;

    // Add leftAxis to the left side of the display
    let leftAxis = chartGroup
      .append( "g" )
      .classed( 'vertical-int', true )
      .transition()
      .duration(2000)
      .call( d3
        .axisLeft( y2 )
        .tickSize( -width )
      )
    ;
    // Line generators for each line
    var line2 = d3
      .line()
      .x( d => x( +d.year ) )
      .y( d => y2( +d.value ) );

    // // Append a path for line2
    // chartGroup
    // .data( [ dataXtra ] )
    // .append( "path" )
    //   .attr( "d", line2 )
    //   .classed( "line-xtra", true );
    var lineGroup = chartGroup
      .selectAll(".line-xtra")
      .data([dataXtra], function(d){ return d });
      
    let sw = function adjustStrokeWidth(width){
      let dynamicSw = {// radius per width
        smallScreen : "1.25",
        largeScreen : "2.75",
      };
      let strokeWidth =   ""; // faster with string
      if (width<500) {
        strokeWidth =   dynamicSw.smallScreen; // faster with string
      } else {
        strokeWidth =  dynamicSw.largeScreen; // faster with string
      }
      return strokeWidth;
    };
    // Updata the line
    lineGroup
      .enter()
      .append("path")
      .attr("class","line-xtra")
      .merge(lineGroup)
      .transition()
      .duration(1000)
      .attr("d", line2)
      .attr("stroke-width", sw(width))
      ;
      // -------------------------------------------
      // ---- circles from now on-------------------
    console.log('width :>> ', width);
    let radius = function adjustRadius(width){
      let dynamicRadius = {// radius per width
        smallScreen : "5",
        largeScreen : "5",
      };
      let r ="";   // strings faster
      if (width<500) {
        r = dynamicRadius.smallScreen = "5";
      } else {
        r = dynamicRadius.smallScreen = "7";
      }  
      return r;
    }; 

    // append circles to data points
    var circlesGroup = chartGroup.selectAll( "circle" )
      .data( dataXtra )
      .enter()
      .append( "circle" )
      .classed( "circles-xtra", true )
      .attr( "r", radius(width) );
      

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
          .duration( 2000 )
          .attr( "r", 15 )
          .attr( "fill", "lightblue" );
      } )

      .on( "mouseout", function () {
        circleTooltip.hide( 'TEST' );
        d3.select( this )
          .transition()
          .duration( 1000 )
          .attr( "r", 10 )
          .attr( "fill", "red" );
      } );

    // transition on page load
    chartGroup.selectAll( "circle" )
      .transition()
      .duration( 1000 )
      .attr( "cx", d => x( d.year ) )
      .attr( "cy", d => y2( d.value ) );


  } );
}
