/*var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1400 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // transform: translate(40, 20); in css

var scaleX = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);

var scaleY = d3.scale.linear()
    .range([height, 0]);
    
var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom');
    
var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient('left')
    .ticks(15, '%');

d3.json('salary_data.json', function(err, data) {
    if (err) throw error;
    
    data.forEach(function(d){
    
    
    for (i in d) {
        d[i] = Number(d[i].replace(/[^0-9.]+/g, ""));
    }
    //console.log(d);
  });
    
        
    scaleX.domain(data.map(function(d) { return d.year}));
    scaleY.domain(data.map(function(d) { return d.average_faculty }));
        
        
        
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
        
    var line = d3.svg.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.average_faculty); });

            
        var line = d3.svg.line()
            .x(function(d,i) { return x(i); })
            .y(function(d) { return -1 * y(d); })
        
        var vis = d3.select("body")
            .append("svg:svg")
            
         
        var g = vis.append("svg:g")
            .attr("transform", "translate(0, 200)");    
          
        
        g.append("svg:line")
            .attr("x1", x(0))
            .attr("y1", -1 * y(0))
            .attr("x2", x(w))
            .attr("y2", -1 * y(0))
         
        g.append("svg:line")
            .attr("x1", x(0))
            .attr("y1", -1 * y(0))
            .attr("x2", x(0))
            .attr("y2", -1 * y(d3.max(data)))
        
        g.selectAll(".xLabel")
            .data(x.ticks(5))
            .enter().append("svg:text")
            .attr("class", "xLabel")
            .text(String)
            .attr("x", function(d) { return x(d) })
            .attr("y", 0)
            .attr("text-anchor", "middle")
         
        g.selectAll(".yLabel")
            .data(y.ticks(4))
            .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(String)
            .attr("x", 0)
            .attr("y", function(d) { return -1 * y(d) })
            .attr("text-anchor", "right")
            .attr("dy", 4)
            
        g.selectAll(".xTicks")
            .data(x.ticks(5))
            .enter().append("svg:line")
            .attr("class", "xTicks")
            .attr("x1", function(d) { return x(d); })
            .attr("y1", -1 * y(0))
            .attr("x2", function(d) { return x(d); })
            .attr("y2", -1 * y(-0.3))
         
        g.selectAll(".yTicks")
            .data(y.ticks(4))
            .enter().append("svg:line")
            .attr("class", "yTicks")
            .attr("y1", function(d) { return -1 * y(d); })
            .attr("x1", x(-0.3))
            .attr("y2", function(d) { return -1 * y(d); })
            .attr("x2", x(0))

});*/

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
    .y(function(d) { return y(d.average_faculty); });

var line2 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.median_faculty); });
    
var line3 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.athletic_director); });
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("salary_data.json", function(error, data) {
  if (error) throw error;
    console.log("hello")
    
    data.forEach(function(d) {
        for(var i in d) {
            d[i] = Number(d[i].replace(/[^0-9\.]+/g,""));
        }
    });
  x.domain(d3.extent(data, function(d) { return +d.year; }));
  y.domain(d3.extent([0, d3.max(data, function(d) { return +d.athletic_director; })]));

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
      

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  
  svg.append("path")      // Add the valueline2 path.
        .attr("class", "line")
        .style("stroke", "green")
        .attr("d", line2(data));
  svg.append("path")      // Add the valueline2 path.
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", line3(data));
});


