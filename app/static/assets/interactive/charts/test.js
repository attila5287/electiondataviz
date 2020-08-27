  function genCustomParams() {
    const fileNames = [ //file names to pull data
      "const-permits.csv",
      "numjobs-nonfarmpro.csv",
      "income-wagesalary.csv",
      "unemployment.csv",
      "income-percapita.csv",
      "population.csv",
    ];

    const labels = [ // name on input range
      "Construction Permits",
      "Num of Jobs: Non-Farm Pro",
      "Avg Earnings:Wage Salary",
      "Unemployment Rate",
      "Income Per Capita",
      "Total Population",
    ];
    let results = [];

    for ( let i = 0; i < fileNames.length; i++ ) {
      results.push( {
        index: +i,
        label: labels[ i ],
        file: fileNames[ i ],
      } );
    }
    // console.log('results :>> ', results);
    // console.log('results0  :>> ', results[0]);
    return results;
  };

  function interactiveChartUp( dataReady ) {

    // console.log('dataReady :>> ', dataReady);
    // console.log('dataReady :>> ', dataReady.blue.perc.values);
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
      left: 50,
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
    // Format the data

    //Step 4-cont'd:  prep data from csv to {name:[{date/value}]}

    let numYears = dataReady.blue.count.values.length;

    // console.log( 'numYears :>> ', numYears );
    // let years = [
    //   d3.min( dataReady.blue.perc.values, d => d.year ),
    //   d3.max( dataReady.red.perc.values, d => d.year )
    // ];
    let years = [ 1976, 2019 ]; //2019 is a max of interactive field: income
    // console.log( 'years :>> ', years );
    let lows = [
      d3.min( dataReady.blue.perc.values, d => d.perc ),
      d3.min( dataReady.red.perc.values, d => +d.perc )
    ];
    let highs = [
      d3.max( dataReady.blue.perc.values, d => d.perc ),
      d3.max( dataReady.red.perc.values, d => d.perc )
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
        .tickFormat( d3.format( ".0%" ) ) );


    // Step 9: Title  
    // ==============================================
    chartGroup.append( "text" )
      .attr( "transform", `translate(${width / 2}, ${height + 15})` )
      .text( `Vote Perc ${dataReady.state}` )
      .classed( 'title', true );

    // Step 10: Bars
    // ==============================================
    let colors = {};
    colors[ dataReady.blue.perc.name ] = "#01018B";
    colors[ dataReady.red.perc.name ] = "#8A0101";


    // trick to show the second grp offsett behind first
    dataReady.blue.perc.values.forEach( d => {
      // console.log('d :>> ', d);
      d.year = d.year + 1.5;
    } );
    // Add the points
    let barsGroup = chartGroup
      // First we need to enter in a group
      .selectAll( "myBarGroup" )
      .data(
        [ dataReady.blue.perc,
          dataReady.red.perc
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
      .attr( "y",   d =>  y( d.perc ) )
      .attr( "height", function ( d ) {
        return height - y( d.perc );
      } )
      .delay( function ( d, i ) {
        // console.log(i); 
        return ( i * 30 );
      } );

    const format = d3.format( ".0%" );

    let toolTip = d3
      .tip()
      .attr( "class", "tooltip" )
      .offset( [ 40, -30 ] )
      .html( d => `
    <div class="card rounded-2xl bg-transparent text-bold text-balo text-light">
      <img class="card-img-top toolt1p border-0 bg-transparent opac-60 mb-0" src="../static/img/cands/p${d.ye4r}${d.nam3}.jpg" alt="cand-img">
      <div class="card-body shadow-turqoise">
        <h5 class="card-title text-light">
          ${ prezCandsByYr[`p${d.ye4r}${d.nam3}`]}
        </h5>
        <hr class="my-0 border-secondary opac-30>
        <p class="card-title my-0">
          ${format( d.perc )} @ ${d.ye4r}
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


    const customParams = genCustomParams();

    // console.log('customParams :>> ', customParams);

    d3.select( "#custom-keys" )
      .selectAll( "i" )
      .data( customParams )
      .enter()
      .append( "i" )
      .html( d => `<i>${d.index}</i>` );

    d3.select( "#slider" )
      .attr( "min", 0 )
      .attr( "max", Object.keys( customParams ).length - 1 )
      .attr( "step", 1 )
      .property( "value", 0 );

    // --------------------- SLIDER ----------------
    function slideMyYears( slider, params ) {
      lineCirclesUpdate( slider );
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
        lineCirclesUpdate( +this.value );
      } );

      function lineCirclesUpdate( selection ) {
        d3.csv( `../static/data/csv-int/${customParams[ selection ].file}`, function ( err, rows ) {
          // Remove is the first <path> element from the axis group: 
          d3.select( ".vertical-int" ).remove();
          // d3.select( ".line-xtra" ).remove();

          console.log( 'dataReady :>> ', dataReady );
          console.log( 'rows 5 :>> ', rows[ indexNoBySt[ dataReady.state ] ] );
          let rowSt = rows[ indexNoBySt[ dataReady.state ] ]; // row with selected param/state

          delete rowSt.name;
          let dataXtra = [];
          Object.keys( rowSt ).forEach( e => {
            console.log( 'e :>> ', e );
            dataXtra.push( {
              year: +e,
              value: +rowSt[ e ],
            } );
          } );

          let y2 = d3.scaleLinear() // min max values for y scale
            .domain( [
              d3.min( Object.keys( rowSt ).map( year => +rowSt[ year ] ) ),
              d3.max( Object.keys( rowSt ).map( year => +rowSt[ year ] ) ),
            ] )
            .range( [ height, 0 ] );

          // Add leftAxis to the left side of the display
          let leftAxis = chartGroup
            .append( "g" )
            .classed( 'vertical-int', true )
            .call( d3
              .axisLeft( y2 )
              .tickSize( -width )
            );
          // Line generators for each line
          var line2 = d3
            .line()
            .x( d => x( d.year ) )
            .y( d => y2( +d.value ) );

          // // Append a path for line2
          // chartGroup
          // .data( [ dataXtra ] )
          // .append( "path" )
          //   .attr( "d", line2 )
          //   .classed( "line-xtra", true );
          var u = chartGroup
            .selectAll(".line-xtra")
            .data([dataXtra], function(d){ return d });

       // Updata the line
       u
       .enter()
    .append("path")
    .attr("class","line-xtra")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", line2)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5);
           // -------------------------------------------
            // ---- circles from now on-------------------
          // append circles to data points
          var circlesGroup = chartGroup.selectAll( "circle" )
            .data( dataXtra )
            .enter()
            .append( "circle" )
            .classed( "circles-xtra", "7" )
            .attr( "r", "7" );

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
                .attr( "r", 20 )
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
    }
    slideMyYears( 0, customParams );
  }
