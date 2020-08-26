function interactiveChartUp( dataReady ) {
  
  // console.log('dataReady :>> ', dataReady);
  // console.log('dataReady :>> ', dataReady.blue.perc.values);
  const svgArea = d3.select( `#hist-unemployment` ).select( "svg" );
  // clear svg is not empty
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }
  // Step 1: Set up our chart
  let svgWidth = $( `#hist-unemployment` ).width();
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
    .select( `#hist-unemployment` )
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
  let years = [
    d3.min( dataReady.blue.perc.values, d => d.year ),
    d3.max( dataReady.red.perc.values, d => d.year )
  ];
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
    .selectAll( "myDots" )
    .data(
      [ dataReady.blue.perc,
        dataReady.red.perc
      ]
    )
    .enter()
    .append( 'g' )
    .style( "fill", d => colors[ d.name ] )
    // Second we need to enter in the 'values' part of this group
    .selectAll( "myPoints" )
    .data( d => d.values )
    .enter().append( "rect" )
    .attr( "width", 7 )
    .attr( "height", 7 )
    .attr( "x", d => x( d.year ) )
    .attr( "y", d => y( 0 ) )
    .attr( "height", d => height - y( 0 ) )
    .attr( "width", d => width * 0.05 );

  // Animation
  svg.selectAll( "rect" )
    .transition()
    .duration( 800 )
    .attr( "y", function ( d ) {
      return y( d.perc );
    } )
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


  function genCustomParams(){
    const fileNames = [//file names to pull data
    "const-permits.csv",
    "income-nonfarmpro.csv",
    "income-wagesalary.csv",
    "unemployment.csv",
    "farm-numbers.csv",
    "income-percapita.csv",
    "population.csv",
  ];

  const labels = [// name on input range
    "Construction Permits",
    "Self-Employed Income",
    "Wage Salary Inc Avg",
    "Unemployment Rate",
    "Farm Numbers",
    "Income Per Capita",
    "Total Population",
  ];
  let results=[];

  for (let i = 0; i < fileNames.length; i++) {
    results.push({ 
      index : +i, 
      label : labels[i], 
      file : fileNames[i], });
  }
  // console.log('results :>> ', results);
  // console.log('results0  :>> ', results[0]);
  return results;
  };

  const customParams = genCustomParams();

  // console.log('customParams :>> ', customParams);

  d3.select( "#custom-keys" )    
    .selectAll("i")
    .data( customParams )
    .enter()
    .append( "i" )
  .html(d => `<i>${d.index}</i>`);

  d3.select( "#slider" )
    .attr( "min", 0 )
    .attr( "max", Object.keys(customParams).length-1 )
    .attr( "step", 1 )
    .property( "value", 0 );
    
  // --------------------- SLIDER ----------------
  function slideMyYears( slider, params ) {
    d3.select( "#slider" ).property( "value", slider );

    // adjust the text on the range slider
    // console.log('slider :>> ', slider);
    // console.log(' params[slider] :>> ',  params[+slider]);
    let prevModulus = (+slider+6 )% customParams.length;
    // console.log('prevZer :>> ', prevModulus);
    let nextModulus = (+slider+8 )% customParams.length;
    // console.log('nextModulus :>> ', nextModulus);

    d3.select( "#param-prev" ).text( params[+prevModulus].label );
    d3.select( "#sliderValue" ).text( params[slider].label );
    d3.select( "#param-next" ).text( params[+nextModulus].label );

  
  // --------------------- SLIDER ----------------
  d3.select( "#slider" ).on( "input", function () {
    console.log('customParams[+this.value].file :>> ', customParams[+this.value].file);
    slideMyYears( +this.value , customParams);
    d3.csv( `../static/data/csv-int/${customParams[+this.value].file}`, function ( err, rows ) {
      console.log('dataReady :>> ', dataReady);
      console.log( 'rows 5 :>> ', rows[indexNoBySt[dataReady.state]] );
      let rowSt = rows[indexNoBySt[dataReady.state]]; // row with selected param/state

      delete rowSt.name;
      console.log('test1 :>> ', d3.min(Object.keys(rowSt).map(year=> rowSt[year]) ));
      console.log('test2 :>> ', d3.max( Object.keys(rowSt).map(year=> rowSt[year]) ));

      let y2 = d3.scaleLinear()
        .domain( [ 
          d3.min( Object.keys(rowSt).map(year=> rowSt[year])  ),
          d3.max( Object.keys(rowSt).map(year=> rowSt[year])  ),
        ] )
        .range( [ height, 0 ] );      
          // Add leftAxis to the left side of the display
  chartGroup
    .append( "g" )
    .classed( 'vertical', true )
    .call( d3
      .axisLeft( y2 )
      .tickSize( -width )
      );
    } );
  } );

  }
  slideMyYears( 0, customParams);
}
