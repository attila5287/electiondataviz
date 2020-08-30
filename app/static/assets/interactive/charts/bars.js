function updateBarsOnly( data, chosenYAxis,  height, width, chartGroup, yScale, svg, yAxis, barsGroup ) {// bar chart update
  let format = data.formats[chosenYAxis];
  yScale = yScaleUp( data, height );// updates u axis
  yAxis =  renderAxes(yScale, yAxis, data.formats[chosenYAxis]);

  chartGroup.append( "text" )
    .attr( "transform", `translate(${width / 2}, ${height + 15})` )
    .text( `Vote ${data.title} ${data.state}` )
    .classed( 'title', true )
  ;


  barsGroup = renderUpBars( chosenYAxis, barsGroup, yScale, height );

  barsGroup.each((d,i)=>{
    // console.log('d :>> ', d);
    // console.log('FX COUNT value) :>> ', d[chosenYAxis]);
    // console.log('FX COUNT yScale(val)) :>> ', yScale(d[chosenYAxis]));
    // console.log('FX COUNT h - ySc(v)) :>> ', height-yScale(d[chosenYAxis]));
  });
function renderUpBars ( chosenYAxis,barsGroup, newYScale, height ) {
  barsGroup
    .transition()
    .duration( 2000 )
    .delay(  ( d, i )=>  i * 10  )
    .attr( "y", d => newYScale( +d[chosenYAxis] ) )
    .attr( "height",   d => height - newYScale( +d[chosenYAxis] ) )
    ;

  return barsGroup;  
}

function yScaleUp ( data, height ) {
  let y = d3.scaleLinear()
    .domain( data.domains[chosenYAxis] )
    .range( [ height,0 ] );
  return y;
}
function renderAxes(newYScale, yAxis, format) {
      let newAxis = d3
        .axisRight( newYScale )
        .tickFormat( format );
    
      yAxis.transition()
        .duration(1000)
        .call(newAxis);
    
      return yAxis;
  }

function enableTooltip()  {
  

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
        ${format( d[chosenYAxis] )} @ ${d.ye4r}
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

}
