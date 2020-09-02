
// slider determines the parameter to compare: unemplotment rate, wage avg etc.
function main( data ) { // data change key      
  // step 0-a : remove svg from prev init-state-selection  
  //=========================================================
  const removePrevSvg = () => {// tabula rasa for new chart
    let svgArea = d3 // remove svg when diff. state chosen
      .select( "#interactive-chart" )
      .select( "svg" );

    if ( !svgArea.empty() ) {
      svgArea.remove();    
    }
  };
  removePrevSvg();  
  
  // step 0-b : prep for top layer chart //generate objects with labels to display on page also  API/ URL for test file URL 
  //=========================================================
  const customParams = prepLineCircleLabels(); 
  renderLineCircleLabels( customParams ); //all choices for circles-chart

  // step 0-c1 : import top layer csv not to use to render chart but to check years axis if larger than 1976-2016
  //=========================================================
  let index = 0; // default selection for bars-> {0:perc 1:count}
  d3.csv( `../static/data/csv-int/${customParams[ index ].file}`, importLineCircle );
  function importLineCircle( err, dataCircles ) {
    // step 0-c2 default selection of perc/count for bars
    //=========================================================
    const switchKey = data.keys[ index ]; // perc or count
    
    // step 1-a: declare svg chart height,width per container size
    //=========================================================
    let { svgWidth, margin, svgHeight } = sizeConfigsUp();// updates outer height width
    
    // step 1-b : create svg element on HTML doc per above sizing lets
    // width and height is where the visual placed at
    //=========================================================
    let { svg, width, height } = appendAutoSizedSVG( svgWidth, margin, svgHeight );
    // step 2 : main group that holds chart and default bar tile
    //=========================================================
    let { chartGroup, title } = genChartGroupTitle( svg, margin, width, height, data, switchKey );

    // Step 3:left axis belongs to circles line chart 
    //=========================================================
    let parseTime = d3.timeParse("%Y"); // display only year
    // append bars group with size sensitive bar width
    const baseDomain = data.domainsYr[switchKey]; //years domain for def bars received within data

    // compare years-> Xmin Xmax of two data source
    let sharedMinMax = compareYearsMinMax( baseDomain, dataCircles );
    let {xScale, xAxis, axisTop} = appendSharedAxisX( sharedMinMax, parseTime, width, height, chartGroup );
    
    // step 4: right axis on the chart for bars
    //=========================================================
    let { yScale, yAxis } = appendBarsAxisY( data, switchKey, height, width, chartGroup );
    
    // step 5: default y scale for circles then append leftAxis 
    //=========================================================
    let { yScaleCircles, leftAxis } = appendCirclesAxisY( dataCircles, data, height, chartGroup, width );
    
    // step 6: render bars with default selection 0->animation
    // ===================================================
    let { barsGroup, barWidth } = renderBarsDef( width, chartGroup, data, xScale, parseTime, yScale, height, switchKey );
    
    // step 7: handle event and animate transition
    // ===================================================
    let switchCounter = 0;// this was req'd for styling two buttons
    d3.select( "#switch" ).on( "change",function () {// determines bar chart percentage or count
      const switchValue = +this.value;
      // handler function for input element-> Vote Perc-Vote Count
      switchCounter = handlerInputBars(switchValue, data, switchCounter, height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth );// modifies switch counter+1
    });
    // step 8: run interactive chart with default selection
    // ===================================================
    handlerInputBars(0, data, switchCounter, height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth );
    
    // step 9: input element for line circles Y values-axis
    // ===================================================
    d3.select( "#slider" ) // slider determines bars Y axis
      .on( "change", function () {// event handler if changed
        handlerInputLineCircles( +this.value, customParams, data, height, width, chartGroup, xScale, yScaleCircles, leftAxis  );
    } );

    // step 10: runs with default selection 
    // ===================================================
    handlerInputLineCircles( 0, customParams, data, height, width, chartGroup, xScale, yScaleCircles, leftAxis );
  
  } 
}


const appendCirclesAxisY =  ( dataCircles, data, height, chartGroup, width )=> {// default Y axis for line circle chart
  let dCircles = dataCircles[ indexNoBySt[ data.name ] ]; // row with 
  let yScaleCircles = d3.scaleLinear() // min max values for y scale
    .domain( [
      d3.min( Object.keys( dCircles ).map( year => +dCircles[ year ] ) ),
      d3.max( Object.keys( dCircles ).map( year => +dCircles[ year ] ) ),
    ] )
    .range( [ height, 0 ] );

  // Add leftAxis to the left side of the display
  let leftAxis = chartGroup
    .append( "g" )
    .classed( 'vertical-int', true )
    .call( d3
      .axisLeft( yScaleCircles )
      .tickSize( -width )
    );
  return { yScaleCircles, leftAxis };
}

function appendBarsAxisY ( data, switchKey, height, width, chartGroup ) {// default axis for circles
  let yScale = d3
    .scaleLinear()
    .domain( data.domains[ switchKey ] )
    .range( [ height, 0 ] );

  let yAxis = appendYAxis( yScale, width, data, switchKey, chartGroup );
  return { yScale, yAxis };
}

function handlerInputBars ( userInput, data, switchCounter, height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth ) {
  const switchStyles = styleDictBtns(); //bootstrap cls //bootstrap classes buttons for switch->bars thus renders selection highlighted



  // returns a dictionary
  // console.log( 'userInput :>> ', userInput );
  const dataSelected = data.keys[ userInput ];

  console.log( 'test switch :>> ', userInput );
  let m0d = switchCounter % 2; // first btn 
  switchCounter = switchCounter + 1;
  let mod = switchCounter % 2; // second btn

  d3.select( '#switch-perc' ).attr( "class", switchStyles[ m0d ] ).text( 'Vote Perc.' );
  d3.select( '#switch-count' ).attr( "class", switchStyles[ mod ] ).text( 'Vote Count' );


  renderBarsUpdated( data, data.keys[ userInput ], height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth );
  return switchCounter;
}

function appendSharedAxisX ( sharedMinMax, parseTime, width, height, chartGroup ) {
  let xScale = d3.scaleTime()
    .domain( d3.extent( sharedMinMax, d => parseTime( d ) ) )
    .range( [ 0, width ] );;


  let xAxis = d3
    .axisTop( xScale )
    .ticks( d3.timeYear.every( 4 ) )
    .tickFormat( d3.timeFormat( "%Y" ) )
    .tickSize( -height );

  // axis text for X-> year  
  let axisTop = chartGroup
    .append( "g" )
    .attr( "transform", `translate(0, ${0})` )
    .call( xAxis )
    .classed( 'horizontal-int', true );
  return {xScale, xAxis, axisTop}
  ;
}

function appendYAxis ( yScale, width, data, switchKey, chartGroup ) {
  let rightAxis = d3
    .axisRight( yScale )
    .tickSize( -width )
    .tickFormat( d3.format( data.formats[ switchKey ] ) );

  let yAxis = chartGroup
    .append( "g" )
    .attr( "transform", `translate(${width}, 0)` )
    .classed( 'vertical', true )
    .call( rightAxis );
  return yAxis;
}

function renderBarsDef ( width, chartGroup, data, xScale, parseTime, yScale, height, switchKey ) {
  const barWidth = width * 0.04;
  // Add the bars
  let barsGroup = chartGroup
    // First we need to enter in a group
    .selectAll( "myBarGroup" )
    .data( data.main )
    .enter()
    .append( 'g' )
    .style( "fill", d => d.fillColor )
    .selectAll( "myBars" )
    .data( d => d.values )
    .enter().append( "rect" )
    .attr( "class", "myBars" )
    .attr( "x", d => xScale( parseTime( d.year ) ) )
    .attr( "y", d => yScale( 0 ) ) // freefall effect
    .attr( "height", d => height - yScale( +d[ switchKey ] ) )
    .attr( "width", d => barWidth )
    .attr( "stroke", d => "#424abb" )
    .attr( "stroke-width", d => "1px" )
    .attr( "stroke-opacity", d => "0.5" );
  return { barsGroup, barWidth };
}

function sizeConfigsUp () {// updates outer height width
  let svgWidth = $( `#interactive-chart` ).width();
  let svgHeight = 0.40 * svgWidth; // larger than chart
  let margin = {
    top: 20,
    right: 50,
    left: 65,
    bottom: 25,
  };
  return { svgWidth, margin, svgHeight };
}

const styleDictBtns =  () => {//bootstrap classes buttons for switch->bars thus renders selection highlighted
  return {// returns a dictionary
    0: "btn btn-outline-secondary text-secondary disabled px-4 text-comfo text-2xl rnd-lg border-0",
    1: "btn btn-outline-light pl-2 px-4 text-comfo text-2xl rnd-lg"
  };
}

const genChartGroupTitle = ( svg, margin, width, height, data, switchKey ) => {
  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );

  // =================================
  let title = chartGroup
    .append( "text" )
    .attr( "transform", `translate(${width / 2}, ${height + 15})` )
    .text( `${data.titles[ switchKey ]}` )
    .classed( 'title', true );
  return { chartGroup, title };
}

const appendAutoSizedSVG = ( svgWidth, margin, svgHeight ) => {
  let width = svgWidth - margin.left - margin.right;
  // console.log('width :>> ', width);
  let height = svgHeight - margin.top - margin.bottom;
  let svg = d3 // select svg on html doc
    .select( `#interactive-chart` )
    .append( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );
  return { svg, width, height };
}

const compareYearsMinMax = ( baseDomain, dataCircles ) => {
  // console.log( 'baseDomain :>> ', baseDomain );

  const allKeys = Object.keys( dataCircles[ 0 ] );
  delete allKeys.name;
  const minParams = d3.min( allKeys.map( d => +d ) );
  const maxParams = d3.max( allKeys.map( d => +d ) );

  const res = [
    d3.min( [ baseDomain[ 0 ], minParams ] ) - 1,
    d3.max( [ baseDomain[ 1 ], maxParams ] ) + 1,
  ];

  return res;
}
// --------------------- SLIDER ----------------
function handlerInputLineCircles( slider, customParams, data, height, width, chartGroup, xScale, yScaleCircles, leftAxis ) {
  
  lineCirclesUpdate( slider, customParams, data, height, width, chartGroup, xScale, yScaleCircles, leftAxis );

  // slider determines the parameter to compare
  d3.select( "#slider" ).property( "value", slider );
  // so that code wont fail at zero
  let prevModulus = ( +slider + 5 ) % customParams.length;
  let nextModulus = ( +slider + 8 ) % customParams.length;

  d3.select( "#param-prev" ).text( customParams[ +prevModulus ].label );
  d3.select( "#sliderValue" ).text( customParams[ slider ].label );
  d3.select( "#param-next" ).text( customParams[ +nextModulus ].label );
}