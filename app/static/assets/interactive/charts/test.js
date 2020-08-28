function interactiveChartUp( dataReady) {// new approach state
      let dict = {
        0: 'perc',
        1: 'count'
      };
      let switchKey = dict[document.getElementById("switch").value];
      console.log('switchKey :>> ', switchKey);
        const svgArea = d3.select( `#interactive-chart` ).select( "svg" );
      // clear svg is not empty
      if ( !svgArea.empty() ) {
        svgArea.remove();
      }
      // Step 1: Set up our chart
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

      // Step 2: Create an SVG wrapper,
      // append an SVG group that will hold our chart,
      // and shift the latter by left and top margins.
      // =================================
      let svg = d3
        .select( `#interactive-chart` )
        .append( "svg" )
        .classed( "my-2 mx-0", true )
        .attr( "width", svgWidth )
        .attr( "height", svgHeight );

      let chartGroup = svg.append( "g" )
        .attr( "transform", `translate(${margin.left}, ${margin.top})` );
      // Step 4: Parse the data
      // Format the data and convert to numerical and date values
      // =================================
      // req'd before sumEach
      let parseTime = d3.timeFormat( "%Y" );
      let years = [ 1976, 2019 ]; //2019 is a max of interactive field: income
      let numYears = +dataReady[switchKey].blue.values.length;
      // console.log( 'numYears :>> ', numYears );
      

      // console.log( 'years :>> ', years );
      let lows = [
        d3.min( dataReady[switchKey].blue.values, d => +d.value ),
        d3.min( dataReady[switchKey].red.values, d => +d.value )
      ];
      let highs = [
        d3.max( dataReady[switchKey].blue.values, d => +d.value ),
        d3.max( dataReady[switchKey].red.values, d => +d.value )
      ];
      // Step 5: Create Scales
      //=============================================
      let x = d3.scaleTime()
        .domain( years )
        .range( [ 0, width ] );
        
      let y = d3.scaleLinear()
        .domain( [ d3.min( lows, d => d * 1 ), d3.max( highs, d => d * 1 ) ] )
        .range( [ height, 0 ] );


      // d3.axisBottom(x).ticks(d3.timeYear.every(1))
      // Step 6: Create Axes // Step 7: Append the axes to 
      // ==============================================
      chartGroup
        .append( "g" )
        .attr( "transform", `translate(0, ${0})` )
        .call( d3
          // .transition()
          // .duration(3000)
          .axisTop( x )
          .ticks( numYears )
          .tickFormat( d3.format( ".4" ) )
          .tickSize( -height )
        )
        .classed( 'horizontal ', true );


      // Add rightAxis to the right side of the display
      chartGroup
        .append( "g" )
        .attr( "transform", `translate(${width}, 0)` )
        .classed( 'vertical', true )
        .call( d3.axisRight( y )
          .tickFormat( d3.format( "," ) ) );
          
          let titleDict = {
            0: 'Percentage',
            1: 'Count'
          };
      // Step 9: Title  
      // ==============================================
      chartGroup.append( "text" )
        .attr( "transform", `translate(${width / 2}, ${height + 15})` )
        .text( `Vote ${titleDict[switchKey]} ${dataReady.state}` )
        .classed( 'title', true );

      // Step 10: Bars
      // ==============================================
      let colors = {};
      colors[ dataReady[switchKey].blue.name ] = "#01018B";
      colors[ dataReady[switchKey].red.name ] = "#8A0101";


      // trick to show the second grp offsett behind first
      dataReady[switchKey].blue.values.forEach( d => {
        // console.log('d :>> ', d);
        d.year = d.year + 1.5;
      } );
      // Add the points
      let barsGroup = chartGroup
        // First we need to enter in a group
        .selectAll( "myBarGroup" )
        .data(
          [ dataReady[switchKey].blue,
            dataReady[switchKey].red
          ]
        )
        .enter()
        .append( 'g' )
        .style( "fill", d => colors[ d.name ] )
        // Second we need to enter in the 'values' part of this group
        .selectAll( "myBars" )
        .data( d => d.values )
        .enter().append( "rect" )
        .attr( "x", d => x( d.year ) )
        .attr( "y", d => y( 0 ) )
        .attr( "stroke", d => "#000" )
        .attr( "stroke-width", d => "2px" )
        .attr( "stroke-opacity", d => "0.5" )
        .attr( "height", d => height - y( 0 ) )
        .attr( "width", d => width * 0.04 );

      // Animation
      svg.selectAll( "rect" )
        .transition()
        .duration( 2000 )
        .attr( "y", d => y( d.value ) )
        .attr( "height", function ( d ) {
          return height - y( d.value );
        } )
        .delay( function ( d, i ) {
          // console.log(i); 
          return ( i * 30 );
        } );

      const format = d3.format( "," );

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
          ${format( d.value )} @ ${d.ye4r}
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
  
    d3.select( "#switch" )
      .attr( "min", 0 )
      .attr( "max", 1 )
      .attr( "step", 1 )
      .property( "value", 1 );

    let switchCounter = 0;

    const switchStyles = {
      0: "btn btn-outline-secondary text-secondary disabled px-4 text-comfo text-2xl rnd-lg border-0",
      1: "btn btn-outline-light pl-2 px-4 text-comfo text-2xl rnd-lg"
    };

    d3.select( "#switch" ).on( "change", function () {
        
      userInput = +this.value;
      console.log('userInput :>> ', userInput );
      
      // console.log('test switch :>> ', +this.value);
      let m0d = switchCounter % 2; // first btn 
      switchCounter = switchCounter + 1;
      console.log( 'switchCounter :>> ', switchCounter );
      let mod = switchCounter % 2; // second btn
      // console.log('m0d :>> ', m0d);
      // console.log('mod :>> ', mod);
      d3.select( '#switch-perc' ).attr( "class", switchStyles[ m0d ] ).text( 'Vote Perc.' );

      d3.select( '#switch-count' ).attr( "class", switchStyles[ mod ] ).text( 'Vote Count' );
      
    } );

  const customParams = genCustomParams();
  // console.log('customParams :>> ', customParams);

  updateParamLabels ( customParams);
  
  // --------------------- SLIDER ----------------
  function slideMyYears( slider, params ) {
    lineCirclesUpdate( slider, customParams, dataReady, height,width, chartGroup, x );
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
      console.log( 'customParams[+this.value].file :>> ', customParams[ +this.value ].file );
      lineCirclesUpdate( +this.value, customParams, dataReady, height, width, chartGroup, x );
    } );

  }
  slideMyYears( 0, customParams );
}
