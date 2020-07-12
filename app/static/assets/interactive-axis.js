
latestInteractive ();
// staticInteractive();

function staticInteractive() { 
  var data = testdaily;
  d3InterActiveAxes (data);
}

function latestInteractive (){
  const url = 'https://pomber.github.io/covid19/timeseries.json';
  d3.json(url, function(error, data) {
    if (error) throw error;
    d3InterActiveAxes (data);
    
  });
 }


function d3InterActiveAxes (data) {
  const format = d3.format( ',' );

function prepData4Scatt3r( data ) {
  const keys = Object.keys( data )
  const length =data[ 'US' ].length;
  console.log('length --> '+length);
  const data4MovingAxes = keys.map( ( country ) => {
    return {
      country: country,
      numConfirmed: +data[ country ][length-1].confirmed,
      numDeaths: +data[ country ][length-1].deaths,
      numRecovered: +data[ country ][length-1].recovered,
    }
  } );
  
  return data4MovingAxes.sort( function ( x, y ) {
    return d3.descending( x.numDeaths, y.numDeaths );
  } )
}  

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "numConfirmed") {
    var label = "Confirmed:";
  }
  else {
    var label = "Recovered";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.country}<hr class="border-success m-0">${label} ${format(d[chosenXAxis])}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}
var svgWidth = window.innerWidth;
var svgHeight = svgWidth*.5;

var margin = {
  top:   40,
  right: 40,
  bottom: 60,
  left: 40,
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr( "class", "axisTurq" )
  ;

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "numConfirmed";


  data = prepData4Scatt3r(data).slice(0, 20);
  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // B58900
  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.numDeaths)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale)
  ;
  var leftAxis = d3.axisLeft(yLinearScale)
  ;

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
    ;

  // append y axis
  chartGroup.append("g")
    .call(leftAxis)
    ;

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.numDeaths))
    .attr("r", 20)
    .attr("fill", "aqua")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2},${height+20})`);

  var confLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "numConfirmed") // value to grab for event listener
    .classed("active", true)
    .text("Num Cases Confirmed")
    ;

  var recovLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "numRecovered") // value to grab for event listener
    .classed("inactive", true)
    .text("Num Recovered");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2.2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Deaths")
    .attr( "class", "axisGold" )
    ;

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis)
        ;


        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        

        // changes classes to change bold text
        if (chosenXAxis === "numRecovered") {
          recovLabel
            .classed("active", true)
            .classed("inactive", false);
          confLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          recovLabel
            .classed("active", false)
            .classed("inactive", true);
          confLabel
            .classed("active", true)
            .classed("inactive", false);
        }

  // Add a legend at the end of each line
  var position = data[ 0 ].values.length - 1;
  // console.log( 'position -->> ' + position );
  svg
    .selectAll( "myLabels" )
    .data( dataReady )
    .enter()
    .append( 'g' )
    .append( "text" )
    .datum( function ( d ) {
      return {
        name: d.country,
      };
    } ) // keep only the last value of each time series
    .attr( "transform", function ( d, i ) {
      return "translate(" + x( position ) + "," + y( d.value.deaths ) + ")";
    } ) // Put the text at the position of the last point
    .attr( "x", 8 ) // shift the text a bit more right
    .text( function ( d ) {
      return d.name;
    } )
    .style( "fill", function ( d ) {
      return myColor( d.name )
    } )
    .style( "font-size", 16 )
    .style( "font-style", 'bold' )
    .style( "font-style", 'italic' );


      }
    });

}
