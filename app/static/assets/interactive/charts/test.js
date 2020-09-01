
function interactiveChartUp( data ) { // data change key      

  const removePrevSvg = () => {// tabula rasa for new chart
    var svgArea = d3 // remove svg when diff. state chosen
      .select( "#interactive-chart" )
      .select( "svg" );

    if ( !svgArea.empty() ) {
      svgArea.remove();    
    }
  };
  removePrevSvg();  

  const customParams = genCustomParams(); // custom parameters to compare 
  let index = 0; // default selection for bars-> 0:perc

  d3.csv( `../static/data/csv-int/${customParams[ index ].file}`, function ( err, dataCircles ) {

    const switchKey = data.keys[ index ]; // perc or count
    const baseDomain = data.domainsYr[switchKey]; // bound to data attr
    
    // step1 svg chart height and width 

    let { svgWidth, margin, svgHeight } = resizeChartContainer();
    
    // create svg element on HTML doc per bundle of basic chart settings
    let { svg, width, height } = appendAutoSizedSVG( svgWidth, margin, svgHeight );


    // step2 main group that holds chart
    // =================================
    let { chartGroup, title } = genChartGroupTitle( svg, margin, width, height, data, switchKey );
    // Step 5: Create Scales
    //=============================================
    var parseTime = d3.timeParse("%Y");

    let comparedMinMax = compareYearsMinMax( baseDomain, dataCircles );
    
    let xScale = rescaleX( comparedMinMax, parseTime, width, chartGroup, height );
    let { yScale, yAxis } = rescaleY( data, switchKey, height, width, chartGroup );

      // append bars group with size sensitive bar width
    var { barsGroup, barWidth } = barsGroupUp( width, chartGroup, data, xScale, parseTime, yScale, height, switchKey );

        
    updateBarsOnly( data, switchKey, height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth );
    updateParamLabels( customParams ); //all choices for circles-chart

    
    let switchCounter = 0;
    d3.select( "#switch" ).on( "change", function () {// bars perc/count
      const switchStyles = dictBS4ClassNames(); // bootstrap classes
      
      let userInput = +this.value;

      let dataSelected = data.keys[ userInput ];
      console.log( 'userInput :>> ', userInput );

      updateBarsOnly( data, data.keys[ userInput ], height, width, chartGroup, yScale, yAxis, barsGroup, title, barWidth );

      console.log( 'test switch :>> ', +this.value );
      let m0d = switchCounter % 2; // first btn 
      switchCounter = switchCounter + 1;
      // console.log( 'switchCounter :>> ', switchCounter );
      let mod = switchCounter % 2; // second btn

      d3.select( '#switch-perc' ).attr( "class", switchStyles[ m0d ] ).text( 'Vote Perc.' );
      d3.select( '#switch-count' ).attr( "class", switchStyles[ mod ] ).text( 'Vote Count' );
    } );
    let rowState = dataCircles[ indexNoBySt[ data.name ] ]; // row with 
    let yScaleParam = d3.scaleLinear() // min max values for y scale
      .domain( [
        d3.min( Object.keys( rowState ).map( year => +rowState[ year ] ) ),
        d3.max( Object.keys( rowState ).map( year => +rowState[ year ] ) ),
      ] )
      .range( [ height, 0 ] )
    ;
    
    // Add leftAxis to the left side of the display
    let leftAxis = chartGroup
      .append( "g" )
      .classed( 'vertical-int', true )
      .call( d3
        .axisLeft( yScaleParam )
        .tickSize( -width )
      )
    ;
    slideMyYears( index, customParams, yScaleParam, leftAxis );
    // --------------------- SLIDER ----------------
    function slideMyYears( slider, params, yScaleParam, leftAxis  ) {
      
      lineCirclesUpdate( slider, customParams, data, height, width, chartGroup, xScale, yScaleParam, leftAxis );

      d3.select( "#slider" ).property( "value", slider );
      // so that code wont fail at zero
      let prevModulus = ( +slider + 5 ) % customParams.length;
      let nextModulus = ( +slider + 8 ) % customParams.length;

      d3.select( "#param-prev" ).text( params[ +prevModulus ].label );
      d3.select( "#sliderValue" ).text( params[ slider ].label );
      d3.select( "#param-next" ).text( params[ +nextModulus ].label );

      // --------------------- SLIDER ----------------
      d3.select( "#slider" ).on( "input", function () {
        slideMyYears( +this.value, customParams, yScaleParam, leftAxis );
        // console.log( 'customParams[+this.value].file :>> ', customParams[ +this.value ].file );
      } );

    }
  } );


}

function resizeChartContainer () {
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

function dictBS4ClassNames () {
  return {
    0: "btn btn-outline-secondary text-secondary disabled px-4 text-comfo text-2xl rnd-lg border-0",
    1: "btn btn-outline-light pl-2 px-4 text-comfo text-2xl rnd-lg"
  };
}

function rescaleY ( data, switchKey, height, width, chartGroup ) {
  let yScale = d3.scaleLinear()
    .domain( data.domains[ switchKey ] )
    .range( [ height, 0 ] );

  let rightAxis = d3
    .axisRight( yScale )
    .tickSize( -width )
    .tickFormat( d3.format( data.formats[ switchKey ] ) );

  let yAxis = chartGroup
    .append( "g" )
    .attr( "transform", `translate(${width}, 0)` )
    .classed( 'vertical', true )
    .call( rightAxis );
  return { yScale, yAxis };
}

function rescaleX ( comparedMinMax, parseTime, width, chartGroup, height ) {
  let xScale = d3.scaleTime()
    .domain( d3.extent( comparedMinMax, d => parseTime( d ) ) )
    .range( [ 0, width ] );

  // axis text for X-> year  
  let axisTop = chartGroup
    .append( "g" )
    .attr( "transform", `translate(0, ${0})` )
    .call( d3
      // .transition()
      // .duration(3000)
      .axisTop( xScale )
      .ticks( d3.timeYear.every( 4 ) )
      .tickFormat( d3.timeFormat( "%Y" ) )
      .tickSize( -height )
    )
    .classed( 'horizontal-int', true );
  return xScale;
}

function barsGroupUp ( width, chartGroup, data, xScale, parseTime, yScale, height, switchKey ) {
  const barWidth = width * 0.04;
  // Add the points
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
    .attr( "y", d => yScale( 0 ) )
    .attr( "stroke", d => "#424abb" )
    .attr( "stroke-width", d => "1px" )
    .attr( "stroke-opacity", d => "0.5" )
    .attr( "height", d => height - yScale( +d[ switchKey ] ) )
    .attr( "width", d => barWidth );
  return { barsGroup, barWidth };
}

function genChartGroupTitle ( svg, margin, width, height, data, switchKey ) {
  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );

  // step2-title
  // =================================
  let title = chartGroup
    .append( "text" )
    .attr( "transform", `translate(${width / 2}, ${height + 15})` )
    .text( `${data.titles[ switchKey ]}` )
    .classed( 'title', true );
  return { chartGroup, title };
}

function appendAutoSizedSVG ( svgWidth, margin, svgHeight ) {
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

function compareYearsMinMax( baseDomain, dataCircles ) {
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
