function interactiveChartUp( data ) { // same data change key      
  let index = 0;
  const dict = {
      0: 'perc',
      1: 'count'
    };
  const switchKey = dict[ index ];
  let svgWidth = $( `#interactive-chart` ).width();
  let svgHeight = 0.40 * svgWidth;
  let margin = {
    top: 20,
    right: 50,
    left: 65,
    bottom: 25,
  };
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;
  let svg = d3
    .select( `#interactive-chart` )
    .select( "svg" )
    .classed( "my-2 mx-0", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );
  let xScale = d3.scaleTime()
    .domain( [ 1976, 2019 ] )
    .range( [ 0, width ] );
    
  let axisTop = chartGroup
    .append( "g" )
    .attr( "transform", `translate(0, ${0})` )
    .call( d3
      // .transition()
      // .duration(3000)
      .axisTop( xScale )
      .ticks( 5 )
      .tickFormat( d3.format(data[dict[ index ]].formatY  ) )
      .tickSize( -height )
    )
    .classed( 'horizontal ', true )
  ;
    
  updateBarsOnly( data, index, height, width, chartGroup, xScale, svg );

  let switchCounter = 0;

  const switchStyles = {
    0: "btn btn-outline-secondary text-secondary disabled px-4 text-comfo text-2xl rnd-lg border-0",
    1: "btn btn-outline-light pl-2 px-4 text-comfo text-2xl rnd-lg"
  };

  const customParams = genCustomParams();
  // console.log('customParams :>> ', customParams);

  updateParamLabels( customParams );


  slideMyYears( index, customParams );

  d3.select( "#switch" ).on( "change", function () {
    let userInput = +this.value;
    updateBarsOnly( data, userInput, height, width, chartGroup, xScale, svg );
    console.log( 'userInput :>> ', userInput );

    console.log( 'test switch :>> ', +this.value );
    let m0d = switchCounter % 2; // first btn 
    switchCounter = switchCounter + 1;
    console.log( 'switchCounter :>> ', switchCounter );
    let mod = switchCounter % 2; // second btn
    // console.log('m0d :>> ', m0d);
    // console.log('mod :>> ', mod);


    d3.select( '#switch-perc' ).attr( "class", switchStyles[ m0d ] ).text( 'Vote Perc.' );
    d3.select( '#switch-count' ).attr( "class", switchStyles[ mod ] ).text( 'Vote Count' );
  } );

  // --------------------- SLIDER ----------------
  function slideMyYears( slider, params ) {
    lineCirclesUpdate( slider, customParams, data, height, width, chartGroup, xScale );
    d3.select( "#slider" ).property( "value", slider );
    // so that code wont fail at zero
    let prevModulus = ( +slider + 5 ) % customParams.length;
    let nextModulus = ( +slider + 8 ) % customParams.length;

    d3.select( "#param-prev" ).text( params[ +prevModulus ].label );
    d3.select( "#sliderValue" ).text( params[ slider ].label );
    d3.select( "#param-next" ).text( params[ +nextModulus ].label );

    // --------------------- SLIDER ----------------
    d3.select( "#slider" ).on( "input", function () {
      slideMyYears( +this.value, customParams );
      // console.log( 'customParams[+this.value].file :>> ', customParams[ +this.value ].file );
      lineCirclesUpdate( +this.value, customParams, data, height, width, chartGroup, xScale );
    } );

  }


}
