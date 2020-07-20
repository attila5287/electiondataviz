let urlTimeTest = '../static/data/json/time-series.json';
let urlFreshTime = 'https://pomber.github.io/covid19/timeseries.json';

 function scatterTimeEu( url, name ) {
  const format = d3.format( ',' );
  const formatDecimal = d3.format( '.4' );
  const formatDate = d3.timeFormat( "%d-%b" );
  
  d3.json( url, function ( error, raw ) {
    const names = [name];
    var aspect_ratio = 0.4;
    var frame_width = $('#scatter-line-time').width();
    var frame_height = aspect_ratio * frame_width;
    // set the dimensions and margins of the graph
    let margin = {top: 20, right: 50, bottom: 20, left: 20};

    let width = frame_width - margin.left - margin.right;
    let height = frame_height- margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#scatter-line-time")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    const nested = names.map( name => {
      return {
        name: name,
        values: raw[ name ],
      };
    } );
    
    const nam3s = [
      "Deaths",
      "Confirmed",
      "Recovered",
    ] ;
    // Reformat the data: we need an array of arrays of {x, y} tuples
    let deaths = nested.map( function(d) { 
      return {
        name: d.name,
        values: d.values.map(function(d) {
          return {date: d.date, value: +d.deaths};
        })
      };
    });

    let confirmed = nested.map( function(d) { 
      return {
        name: d.name,
        values: d.values.map(function(d) {
          return {date: d.date, value: +d.confirmed};
        })
      };
    });

    let recovered = nested.map( function(d) { 
      return {
        name: d.name,
        values: d.values.map(function(d) {
          return {date: +d.date, value: +d.recovered};
        })
      };
    });

    let dataAll= {
      "Deaths" : deaths,
      "Confirmed"  : confirmed,
      "Recovered" : recovered,
    };
    
    // --> => store above in a different let after a function call

    let dataReady = [
      {"name": "Deaths", "values": dataAll["Deaths"][0].values},
      {"name": "Confirmed", "values": dataAll["Confirmed"][0].values},
      {"name": "Recovered", "values": dataAll["Recovered"][0].values},
    ];
    let allGroup = dataReady.map(d => d.name);
    // console.log('dataReady :>> ', dataReady);
    console.log('allGroup :>> ', allGroup);
    // A color scale: one color for each group
    let myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#7fcdbb","#41b6c4","#1d91c0"]);
      // console.log('d3.schemeSet3 :>> ', d3.schemeSet3);
    // confirmed always highest in this case
    // create scales
    let a = d3.max(dataReady[0].values, d => d.date);
    let b = d3.max(dataReady[1].values, d => +d.value);
    let c = d3.max(dataReady[2].values, d => +d.value);

    let arrayForScale = d3.max([
      dataReady[1].values,
      dataReady[2].values,
    ]);
    console.log('arrayForScale :>> ', arrayForScale);
    
    // scales
    let x = d3.scaleLinear()
      .domain( [ 0, arrayForScale.length ] )
      .range( [ 0, width ] );
    let y = d3.scaleLinear()
      .domain( [ 0, d3.max( arrayForScale, d=>d.value ) ] )
      .range( [ height, 0 ] );

    // ----------- TEST X Y SCALES ------------
    // console.log('object :>> ', y(100000));
    // console.log('object :>> ', x(147));

    svg.append( "g" )
      .attr( "transform", "translate(0," + height + ")" )
      .attr( "class", "axisGold" )
      .call( d3.axisBottom( x ) );
    svg.append( "g" )
      .attr( "transform", "translate(0,15)" )
      .attr( "class", "axisGold" )
      .call( d3.axisTop( x ) )
    svg.append( "g" )
      .attr( "class", "axisGold" )
      .attr( "transform", "translate(" + width + ",0)" )
      .call( d3.axisRight( y ) );

    // --------------- AXIS TOP BOTTOM RIGHT - CHECK

    let line = d3.line()
      .x( function ( d, i ) {
        return x( i )
      } )
      .y( function ( d ) {
        return y( +d.value )
      } )
      ;    
    svg.selectAll( "myLines" )
      .data( dataReady )
      .enter()
      .append( "path" )
      .attr( "d", function ( d ) {
        return line( d.values )
      } )
      .attr( "stroke", function ( d ) {
        return myColor( d.name )
      } )
      .style( "fill", "none" )
      ;

    
    // Add the points
    let circlesGroup = svg
      // First we need to enter in a group
      .selectAll( "myDots" )
      .data( dataReady )
      .enter()
      .append( 'g' )
      .style( "fill", d => myColor(d.name) )
      // Second we need to enter in the 'values' part of this group
      .selectAll( "myPoints" )
      .data(d => d.values)
      .enter()
      .append( "circle" )
      .attr( "r", 2 )
      .style( "stroke", d => myColor(d.name) )
      .attr( "stroke-width", "1" )
      ;
    
    circlesGroup
      .transition()
      .delay((d,i) => i*10)
      .duration(1000)
      .attr("cx", function (d,i) { return x(i); } )
      .attr("cy", function (d) { return y(d.value); } );



    // Add a legend at the end of each line
    let position = dataReady[ 0 ].values.length - 1;
    // console.log( 'position -->> ' + position );
    svg
      .selectAll( "myLabels" )
      .data( dataReady )
      .enter()
      .append( 'g' )
      .append( "text" )
      .datum(  d => {
        return {
          labelName: d.name,
          labelValue: d.values[ d.values.length - 1 ]
        };
      } ) // keep only the last value of each time series
      .attr( "transform", function ( d, i ) {
        return "translate(" + x( position ) + "," + y( d.labelValue.value ) + ")";
      } ) // Put the text at the position of the last point
      .attr( "x", 2 ) // shift the text a bit more right
      .text( function ( d ) {
        return d.labelName;
      } )
      .style( "fill", function ( d ) {
        return myColor( d.labelName )
      } )
      .attr( "class", 'text-larger' )
      .style( "font-style", 'bold' )
      .style( "font-style", 'italic' );

    let toolTip = d3
      .tip()
      .attr( "class", "tooltip" )
      .offset( [ 80, -60 ] )
      .html( function ( d, i ) {
        return ( '<strong>' + format( d.value ) + '</strong><hr class="border-success my-1"><strong>' + d.date + '</strong>' );
      } );

    // console.log( ' --- toolTip --- O' );
    // console.log( toolTip );

    circlesGroup.call( toolTip );

    // console.log(toolTip);

    circlesGroup.on( "mouseover", function ( d, i ) {
        // console.log( ' ^^^^^^^^^ MOUSE-OVER ^^^^^^^^^' )
        console.log( i );
        toolTip.show( d );
      } )
      // onmouseout event
      .on( "mouseout", function ( data, index ) {
        // console.log( ' ________MOUSE_OUT________' );
        toolTip.hide( 'TEST' );
      } );

      

  } );
 }
let dTest = { Flag: "/static/img/flags/Ensign_Flag_Nation_turkey-128.png", Name: "Turkey", Code: "TR", Deaths: 4899, Confirmed: 150000, Population: 82566959 };

scatterTimeEu( urlTimeTest, "Turkey" );
rowChartUp(dTest);
barChartUp(dTest);
