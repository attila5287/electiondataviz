  var margin = { top: 20, right: 40, bottom: 80, left: 100 };

  var svgWidth = window.innerWidth - 20;
  var svgHeight = window.innerHeight - 20;

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var chart = svg.append("g");

  // d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

  d3.csv("data.csv", function(err, data) {
    if (err) throw err;

    data.forEach(row => {
      row.dental_visit = +row.dental_visit;
      row.self_excellent = +row.self_excellent;
      row.self_poor = +row.self_poor;

      row.poverty = +row.poverty;
      row.median_income = +row.median_income;
    });

    console.log(data);

    var yLinearScale = d3.scaleLinear().range([height, 0]);
    var xLinearScale = d3.scaleLinear().range([0, width]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    function findMinAndMax(dataColumn) {
      min = d3.min(data, function(data) {
        return +data[dataColumn] * 0.8;
      });

      max = d3.max(data, function(data) {
        return +data[dataColumn] * 1.1;
      });

      return {min, max}
    }

    var currentAxisLabelX = "poverty";
    var currentAxisLabelY = "dental_visit";

    var x = findMinAndMax(currentAxisLabelX);
    var y = findMinAndMax(currentAxisLabelY);
    xLinearScale.domain([x.min, x.max]);
    yLinearScale.domain([y.min, y.max]);

    var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data) {
          if(currentAxisLabelX === "poverty")
            return data.state + "<br>" + currentAxisLabelY + " : " + data[currentAxisLabelY] + "% <br>" + currentAxisLabelX + " : " + data[currentAxisLabelX] + "%"
          else
            return data.state + "<br>" + currentAxisLabelY + " : " + data[currentAxisLabelY] + "% <br>" + currentAxisLabelX + " : $" + data[currentAxisLabelX]
        });

    chart.call(toolTip);

      chart
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(data, index) {
        return xLinearScale(data[currentAxisLabelX]);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(data[currentAxisLabelY]);
      })
      .attr("r", "15")
      .attr("fill", "#87AFC7")
      .on("mouseover", function(data) {
        toolTip.show(data);
      })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

      chart.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function (data) {
            return data.state_abbr;
        })
        .attr("x", function (data) {
            return xLinearScale(data[currentAxisLabelX]);
        })
        .attr("y", function (data) {
            return yLinearScale(data[currentAxisLabelY]);
        })
        .attr("text-anchor", "middle")
        .attr("class","state-abbr")
        .on("mouseover", function(data) {
          toolTip.show(data);
        })
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });

      chart
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")
      .call(bottomAxis);

      chart.append("g")
      .attr("class", "y-axis")
      .call(leftAxis);

      chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "y-axis-text active")
      .attr("data-axis-name", "dental_visit")
      .text("Visited the dentist within the past year (%)");

      chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "y-axis-text inactive")
      .attr("data-axis-name", "self_excellent")
      .text("People self-evaluated their general health as Excellent (%)");

      chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 60)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "y-axis-text inactive")
      .attr("data-axis-name", "self_poor")
      .text("People self-evaluated their general health as Poor (%)");

      chart
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
      )
      .attr("class", "x-axis-text active")
      .attr("data-axis-name", "poverty")
      .text("Poverty (%)");

      chart
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 45) + ")"
      )
      .attr("class", "x-axis-text inactive")
      .attr("data-axis-name", "median_income")
      .text("Median Income ($)");

    function XlabelChange(clickedAxis) {
      d3
        .selectAll(".x-axis-text")
        .filter(".active")
        .classed("active", false)
        .classed("inactive", true);
      clickedAxis.classed("inactive", false).classed("active", true);
    }

    function YlabelChange(clickedAxis) {
      d3
        .selectAll(".y-axis-text")
        .filter(".active")
        .classed("active", false)
        .classed("inactive", true);
      clickedAxis.classed("inactive", false).classed("active", true);
    }

    d3.selectAll(".x-axis-text").on("click", function() {
      var clickedSelection = d3.select(this);
      var isClickedSelectionInactive = clickedSelection.classed("inactive");
      var clickedAxis = d3.select(this).attr("data-axis-name");

      if (isClickedSelectionInactive) {
        currentAxisLabelX = clickedAxis;
        x = findMinAndMax(currentAxisLabelX);
        xLinearScale.domain([x.min, x.max]);

        svg
          .select(".x-axis")
          .transition()
          .duration(1800)
          .call(bottomAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(data) {
              return xLinearScale(+data[currentAxisLabelX]);
            })
            .duration(1800);
        });

        d3.selectAll(".state-abbr")
            .transition()
            .attr("x", function(data) {
              return xLinearScale(+data[currentAxisLabelX]);
            })
            .duration(1800);

        XlabelChange(clickedSelection);
      }
    });

    d3.selectAll(".y-axis-text").on("click", function() {
      var clickedSelection = d3.select(this);
      var isClickedSelectionInactive = clickedSelection.classed("inactive");
      var clickedAxis = clickedSelection.attr("data-axis-name");

      if (isClickedSelectionInactive) {
        currentAxisLabelY = clickedAxis;
        y = findMinAndMax(currentAxisLabelY);
        yLinearScale.domain([y.min, y.max]);

        svg
          .select(".y-axis")
          .transition()
          .duration(1800)
          .call(leftAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(data) {
              return yLinearScale(+data[currentAxisLabelY]);
            })
            .duration(1800);
        });

        d3.selectAll(".state-abbr")
            .transition()
            .attr("y", function(data) {
              return yLinearScale(+data[currentAxisLabelY]);
            })
            .duration(1800);

        YlabelChange(clickedSelection);
      }
    });
  });