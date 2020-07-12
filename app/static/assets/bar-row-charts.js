function rowChartUp( d ) {
  const format = d3.format( ',' );
  // -------RUN D3 RUN: create name/value pairs --->

  const names = [
    "Population",
    "Deaths",
    "Confirmed",
  ];


  // console.table(names);

  const values = names.map( key => +d[ key ] );
  // console.table(values);

  const colors = [
    "a8ddb5",
    "7bccc4",
    "43a2ca"
  ]
  // console.table(colors);
  let data = [];
  for ( let i = 0; i < names.length; i++ ) {
    const z = {};
    z.name = names[ i ];
    z.value = values[ i ];
    z.color = colors[ i ];
    data.push( z );
  }
  // console.table(data);

  // -----------RUN D3 RUN: margins------>
  //set up svg responsive with respect to window size
  let margin = {
    top: 35,
    right: 60,
    bottom: 25,
    left: 30
  };
    var aspect_ratio = 0.7;
    var frame_width = $('#bar-chart-horizontal').width();
    var frame_height = aspect_ratio * frame_width;

  const width = frame_width * 1.0,
    height = frame_height * 1.0;

  var svg = d3.select( "#bar-chart-horizontal" ).append( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
    .append( "g" )
    .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

  // -----------RUN D3 RUN: now scales ------>
  let yBandScale = d3.scaleBand()
    .domain( names )
    .range( [ 0, height ] )
    .padding( 0.4 );

  const maxValue = d3.max( values );

  let xLinearScale = d3.scaleLinear()
    .domain( [ 0, maxValue ] )
    .range( [ 0, height ] );

  // test function with different parameters
  // console.log('maxValue >--> ', xLinearScale(maxValue)/width);

  // ----------- RUN D3 RUN: bottom ax ---->
  let leftAxis = d3.axisLeft( yBandScale );


  // ----------- RUN D3 RUN: custom ------>
  let bottomAxis = d3
    .axisBottom( xLinearScale )
    .ticks( 5 );

  // ----------- RUN D3 RUN: custom bar width ------>
  var barThickness = height / data.length / 2;
  // console.log('barW :>> ', barWidth);

  let bars = svg.selectAll( ".bar" )
    .data( data )
    .enter().append( "g" );

  let rects = bars.append( "rect" )
    .attr( "class", "bar opac-30" )
    .attr( "rx", "5px" )
    .attr( "ry", "5px" )
    .attr( "fill", "#2aa198" )
    .attr( "stroke-width", "1px" )
    .attr( "stroke", "#2aa198" )
    .attr( "stroke-opacity", "0.9" )
    .attr( "x", 0 )
    .attr( "y", ( d, i ) => yBandScale( names[ i ] ) )
    .attr( "height", barThickness )
    ;
rects
    .transition()
    .delay(0)
    .duration(1000)
    .attr( "width", d => xLinearScale( d.value ) );

  let addChartXAxis = svg.append( "g" )
    .attr( "transform", `translate(0, ${height})` )
    .attr( "class", "axisTurq opac-50" )
    .call( bottomAxis )
    .selectAll( "text" )
    .style( "font-size", "8px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "start" )
    .attr( "fill", "#b58900" )
    .attr( "transform", "rotate(-90)" );

  let addRowLabels = svg.append( "g" )
    .attr( "class", "axisGold" )
    .call( leftAxis )
    .selectAll( "text" )
    .attr( "dy", "-20" )
    .style( "opacity", "0.7" )
    .style( "font-size", "12px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "start" )
    .attr( "fill", "#b58900" );

  //x position is 3 pixels to the right of the bar
  // add a value label to the right of each bar
  let addValuesInline = bars
    .append( "text" )
    .attr( "fill", "#b58900" )
    .attr( "class", "axisGold text-digi text-xlarger" )
    .attr( "y", ( d ) => yBandScale( d.name ) )
    .attr( "x", ( d ) => xLinearScale( d.value ) )
    .attr( "dx", "10" )
    .attr( "dy", "20" )
    .text( ( d ) => format( d.value ) );

}
function barChartUp( d ) {
  // console.log( d );
  const format = d3.format( ',' );
  let z = {};
  z.Confirmed = +d.Confirmed;
  z.Deaths = +d.Deaths;
  //  console.table(z);
  const zKeys = Object.keys( z );
  let listOfValues = [];
  const zValues = zKeys.map( ( key ) => {
    return +d[ key ];
  } );
  // create an array to store dictionaries nxt step
  const dictArray = [];
  // generate new objects -dictionaries- 
  for ( let i = 0; i < zKeys.length; i++ ) {
    let dict = {
      name: 'default',
      value: 0
    };
    dict.name = zKeys[ i ];
    dict.value = +z[ zKeys[ i ] ];
    dictArray.push( dict );
  }

  // console.log( 'dictArray :>> ', dictArray );

  //set up svg responsive with respect to window size
  let margin = {
    top: 35,
    right: 50,
    bottom: 25,
    left: 70
  };
    var aspect_ratio = 0.3;
    var frame_width = $('#bar-chart-vertical').width();
    var frame_height = aspect_ratio * frame_width;

  const width = frame_width * 1.0,
    height = frame_height * 1.0;

  let svg = d3.select( "#bar-chart-vertical" )
    .append( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
    .append( "g" )
    .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );


  const names = dictArray.map( d => d.name );
  const values = dictArray.map( d => d.value );
  const maxValue = d3.max( values );
  // console.log('maxValue :>> ', maxValue);

  // >>---soF-soG--|>

  let xBandScale = d3.scaleBand()
    .domain( dictArray.map( d => d.name ) )
    .range( [ 0, width ] )
    .padding( 0.4 );

  // Create a linear scale for the vertical axis.
  let yLinearScale = d3.scaleLinear()
    .domain( [ 0, d3.max( dictArray, d => d.value ) ] )
    .range( [ height, 0 ] );

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  let bottomAxis = d3.axisBottom( xBandScale );
  let leftAxis = d3
    .axisLeft( yLinearScale )
    .ticks( 5 );


  var barWidth = width / dictArray.length / 4;

  let bars = svg.selectAll( ".bar" )
    .data( dictArray )
    .enter().append( "g" );

  let rects = bars.append( "rect" )
    .attr( "class", "bar opac-30" )
    .attr( "rx", "4px" )
    .attr( "ry", "3px" )
    .attr( "fill", "#2aa198" )
    .attr( "stroke-width", "5px" )
    .attr( "stroke", "#2aa198" )
    .attr( "x", ( d, i ) => xBandScale( names[ i ] ) )
    .attr( "y", d => yLinearScale( d.value ) )
    .attr( "width", barWidth )
    ;
    
    rects
    .transition()
    .delay(0)
    .duration(1000)
    .attr( "height", d => height - yLinearScale( d.value ) )
    ;

  let textValues = bars.append( "text" )
    .attr( "x", ( d, i ) => xBandScale( names[ i ] ) )
    .attr( "y", -3 )
    .attr( "fill", "#b58900" )
    .attr( "class", "text-digi text-xs" )
    .style( "font-size", "13px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "center" )
    .text( d => format( Math.round( d.value ) ) );

  let textLabels = svg.append( "g" )
    .attr( "transform", `translate(0, ${height})` )
    .attr( "class", "axisGold" )
    .call( bottomAxis )
    .selectAll( "text" )
    .style( "font-size", "14px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "start" )
    .attr( "fill", "#b58900" )
    .attr( "transform", "rotate(-90)" );

  let textLeft = svg.append( "g" )
    // .attr( "transform", `translate(${height},0 )` )
    .attr( "class", "axisTurq opac-50" )
    .call( leftAxis )
    .selectAll( "text" )
    .style( "font-size", "10px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "end" )
    .attr( "fill", "#b58900" );
  
    

}
