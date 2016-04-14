var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var formatDate = d3.time.format("%y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.average_faculty); }); // Line tracking Average Faculty Salary

var line2 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.median_faculty); }); // Line tracking Median Faculty Salary
    
var line3 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.athletic_director); }); // Line tracking Athletic Director Salary
    
var line4 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.in_state_tuition); }); // Line tracking In state Tuition
    
var line5 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.out_state_tuition); }); // Line tracking Out of state tuition
    
//setting margins
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//ajax call for json data
d3.json("salary_data.json", function(error, data) {
  if (error) throw error;
    console.log("hello")

//reads data as a number    
    data.forEach(function(d) {
        for(var i in d) {
            d[i] = Number(d[i].replace(/[^0-9\.]+/g,""));
        }
    });
    
//sets x and y axis
  x.domain(d3.extent(data, function(d) { return +d.year; }));
  y.domain(d3.extent([0, d3.max(data, function(d) { return +d.athletic_director; })]));

  
//label for x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", 900)
      .attr("dx", ".71em")
      .style("text-anchor", "end")
      .text("Year");
      
//label for y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

//path for first line graph
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  
  svg.append("path")      // Add the line2 path.
        .attr("class", "line")
        .style("stroke", "black")
        .attr("d", line2(data));
        
  svg.append("path")      // Add the line3 path.
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", line3(data));
 
  svg.append("path")      // Add the line4 path.
        .attr("class", "line")
        .style("stroke", "blue")
        .attr("d", line4(data));
        
  svg.append("path")      // Add the line5 path.
        .attr("class", "line")
        .style("stroke", "green")
        .attr("d", line5(data));
});


