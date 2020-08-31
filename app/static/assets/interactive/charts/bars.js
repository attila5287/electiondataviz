function updateBarsOnly( data, chosenYAxis,  height, width, chartGroup, yScale, yAxis, barsGroup, title ) {// bar chart update
  // barsGroup.each((d,i)=>{ console.log('d :>> ', d);});

  let format = data.formats[chosenYAxis]; // req'd for d3-format
  let formatd3 = d3.format(format); // function for d3-format
  yScale = yScaleUp( data, height, chosenYAxis );// updates u axis
  yAxis =  renderAxes(yScale, yAxis, data.formats[chosenYAxis]);
  title = renderUpTitleBottom( title,chartGroup, width, height, data, chosenYAxis );
  barsGroup = renderUpBars( chosenYAxis, barsGroup, yScale, height );
  barsGroup = enableTooltip(barsGroup, chosenYAxis, formatd3, data );
}
// change Y axis dynamically: start with updating data y-scale
// step 0 pre-requisite of main fuction and many more fuctions
const  yScaleUp =  ( data, height,chosenYAxis ) => {// y scale
  let y = d3.scaleLinear()
    .domain( data.domains[chosenYAxis] )
    .range( [ height,0 ] );
  return y;
};
// step1 create a main function that modifies bars already created
const renderUpBars =  ( chosenYAxis,barsGroup, newYScale, height ) => {// main function to render bars with updated data
  barsGroup
    .transition()
    .duration( 2000 )
    .delay(  ( d, i )=>  i * 100  )
    .attr( "y", d => newYScale( +d[chosenYAxis] ) )
    .attr( "height",   d => height - newYScale( +d[chosenYAxis] ) )
    ;

  return barsGroup;  
};

// step2 or 1 since easier, updates & returns axis with transition 
const renderAxes = (newYScale, yAxis, format) => {
      let newAxis = d3
        .axisRight( newYScale )
        .tickFormat( d3.format(format) );
    
      yAxis.transition()
        .duration(2000)
        .call(newAxis);
    
      return yAxis;
};
const enableTooltip = (barsGroup, chosenYAxis, format, data) =>  {
  
  // bootstrap card HTML as inner
  let genBS4Card = d => `
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
    ` ;

  let toolTip = d3
    .tip()
    .attr( "class", "tooltip" )
    .offset( [ 40, -30 ] )
    .html( genBS4Card );

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
    .on( "mouseout", function ( d, i ) {
      toolTip.hide( 'TEST' );
      d3.select( this )
        .transition()
        .duration( 1000 )
        .attr( "fill", data.colors[ d.nam3 ] );
    } )
  ;
  return barsGroup;
};
// step2 or 1 since easier, updates & returns title via data.title
const renderUpTitleBottom = ( title,chartGroup, width, height, data, chosenYAxis )=> {
  return chartGroup.select( "text" )
    .attr( "transform", `translate(${width / 2}, ${height + 15})` )
    .text( `${data.titles[ chosenYAxis ]}` )
    .classed( 'title', true );
};
