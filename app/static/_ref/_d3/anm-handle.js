var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    ;

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "obesity";

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
console.log("can you read me")
    if (chosenXAxis === "obesity") {
        var label = "Obesity %:";
    }
    else {
        var label = "Smokers %:";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            // console.log("checking tooltip", d);
            return (`${d.abbr}<br>${label} ${d[chosenXAxis]}`);
            
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        d3.select(this).attr("fill", "red");
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            d3.select(this).attr("fill", "blue");
            toolTip.hide(data);
        });

    return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
var file = "data.csv"
d3.csv(file).then(successHandle, errorHandle);
console.log(file)
function errorHandle(error) {
    throw error;
}

function successHandle(stateData) {
    console.log("made it here 1", stateData)
    // parse data
    stateData.forEach(function (data) {
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes
        data.poverty = +data.poverty
        data.state = +data.state
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(stateData, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.income)])
        .range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.income))
        .attr("r", 15)
        .attr("fill", "blue")
        // .attr("text", d=>d.abbr)
        .attr("opacity", ".5");

    // chartGroup.selectAll("text")
    //     .data(stateData)
    //     .enter()
    //     .append("text")
    //     .attr("x", d => xLinearScale(d[chosenXAxis]))
    //     .attr("y", d => yLinearScale(d.income))
    //     .text(d=>d.abbr)
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", "8px")
    //     .attr("fill", "black");
        
        
        // .append("text")
        // .text(d => d.abbr);

    console.log("made it here 2")
    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var obesityLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "obesity") // value to grab for event listener
        .classed("active", true)
        .text("Obesity Rates");

    var smokerLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "smokes") // value to grab for event listener
        .classed("inactive", true)
        .text("% of Smokers");

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Average Income per State");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    console.log("made it here 3")
    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(stateData, chosenXAxis);

                // updates x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
                
                // changes classes to change bold text
                if (chosenXAxis === "obesity") {
                    obesityLabel
                        .classed("active", true)
                        .classed("inactive", false)
                        .style("font", "bold");
                    smokerLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    obesityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    smokerLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });
}
