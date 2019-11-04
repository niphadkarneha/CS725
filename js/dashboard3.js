var dashboard3 = (function () {

var chart,
    chart1,
    chart2,
    chart3,
    chart4;

    ////////////  Creact Pie Chart ////////////
    function createPieChart(content){
        var data = [
            {name: "BJP", value: 79.9},
            {name: "INC", value: 13.7},
            {name: "Other", value: 6.3}
          ];
          var text = "";
          
          var width = 250;
          var height = 240;
          var thickness = 40;
          var duration = 750;
          var padding = 50;
          var opacity = .8;
          var opacityHover = 1;
          var otherOpacityOnHover = .8;
          var tooltipMargin = 13;
          
          var radius = Math.min(width-padding, height-padding) / 2;
          var color = d3.scaleOrdinal(d3.schemeCategory10);
          
          var svg = d3.select(content)
          .append('svg')
          .attr('class', 'pie')
          .attr('width', width)
          .attr('height', height);
               svg.append("g")
               .attr("transform", "translate(" + (width / 2 - 40) + "," + 10 + ")")
               .append("text")
               .text("Seat Won.")
               .attr("class", "title")
          
          var g = svg.append('g')
          .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
          
          var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
          
          var pie = d3.pie()
          .value(function(d) { return d.value; })
          .sort(null);
          
          var path = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")  
            .append('path')
            .attr('d', arc)
            .attr('fill', (d,i) => color(i))
            .style('opacity', opacity)
            .style('stroke', 'white')
            .on("mouseover", function(d) {
                d3.selectAll('path')
                  .style("opacity", otherOpacityOnHover);
                d3.select(this) 
                  .style("opacity", opacityHover);
          
                let g = d3.select("svg")
                  .style("cursor", "pointer")
                  .append("g")
                  .attr("class", "tooltip")
                  .style("opacity", 0);
           
                g.append("text")
                  .attr("class", "name-text")
                  .text(`${d.data.name} (${d.data.value})`)
                  .attr('text-anchor', 'middle');
              
                let text = g.select("text");
                let bbox = text.node().getBBox();
                let padding = 2;
                g.insert("rect", "text")
                  .attr("x", bbox.x - padding)
                  .attr("y", bbox.y - padding)
                  .attr("width", bbox.width + (padding*2))
                  .attr("height", bbox.height + (padding*2))
                  .style("fill", "white")
                  .style("opacity", 0.75);
              })
            .on("mousemove", function(d) {
                  let mousePosition = d3.mouse(this);
                  let x = mousePosition[0] + width/2;
                  let y = mousePosition[1] + height/2 - tooltipMargin;
              
                  let text = d3.select('.tooltip text');
                  let bbox = text.node().getBBox();
                  if(x - bbox.width/2 < 0) {
                    x = bbox.width/2;
                  }
                  else if(width - x - bbox.width/2 < 0) {
                    x = width - bbox.width/2;
                  }
              
                  if(y - bbox.height/2 < 0) {
                    y = bbox.height + tooltipMargin * 2;
                  }
                  else if(height - y - bbox.height/2 < 0) {
                    y = height - bbox.height/2;
                  }
              
                  d3.select('.tooltip')
                    .style("opacity", 1)
                    .attr('transform',`translate(${x}, ${y})`);
              })
            .on("mouseout", function(d) {   
                d3.select("svg")
                  .style("cursor", "none")  
                  .select(".tooltip").remove();
              d3.selectAll('path')
                  .style("opacity", opacity);
              })
            .on("touchstart", function(d) {
                d3.select("svg")
                  .style("cursor", "none");    
            })
            .each(function(d, i) { this._current = i; });

       
          
          let legend = d3.select("#chart").append('div')
                      .attr('class', 'legend')
                      .style('margin-left', '250px')
                      .style('margin-top', '20px')
                      .style('margin-bottom', '20px');
          
          let keys = legend.selectAll('.key')
                      .data(data)
                      .enter().append('div')
                      .attr('class', 'key')
                      .style('display', 'flex')
                      .style('align-items', 'center')
                      .style('margin-right', '20px');
          
                  keys.append('div')
                      .attr('class', 'symbol')
                      .style('height', '10px')
                      .style('width', '10px')
                      .style('margin', '5px 5px')
                      .style('background-color', (d, i) => color(i));
          
                  keys.append('div')
                      .attr('class', 'name')
                      .text(d => `${d.name} (${d.value})`);
          
                  keys.exit().remove();
    }


//////////////////////// createLineChartDemo /////////////////\
    function createLineChartDemo(contenct) {
        var data = [
            {
              'timescale': 'INLD', 
              'totalAmount': 12.0, 
              'totalProfit': 12.0, 
              'totalRevenue': 76.0
            },
            {
              'timescale': 'BJP', 
              'totalAmount': 20.289, 
              'totalProfit': 7.246, 
              'totalRevenue': 72.463
            },
            {
              'timescale': 'INC', 
              'totalAmount': 35.486, 
              'totalProfit': 6.451, 
              'totalRevenue': 58.064
            },
            {
              'timescale': 'AAP', 
              'totalAmount': 20.987, 
              'totalProfit': 3.703, 
              'totalRevenue': 75.308
            }
          ];
          var trendsText = {'totalAmount': 'Positive', 'totalProfit': 'Negative', 'totalRevenue': 'Netural'};
          
          // set the dimensions and margins of the graph
          var margin = { top: 20, right: 80, bottom: 80, left: 50 },  
              svg = d3.select(contenct),
              width = +svg.attr('width') - margin.left - margin.right,
              height = +svg.attr('height') - margin.top - margin.bottom;
          var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
          // set the ranges
          var x = d3.scaleBand().rangeRound([0, width]).padding(1),
              y = d3.scaleLinear().rangeRound([height, 0]),
              z = d3.scaleOrdinal(['#036888','#0D833C','#D2392A']);
          
          // define the line
          var line = d3.line()
            .x(function(d) { return x(d.timescale); })
            .y(function(d) { return y(d.total); });
          
          // scale the range of the data
          z.domain(d3.keys(data[0]).filter(function(key) {
            return key !== "timescale";
          }));
          
          var trends = z.domain().map(function(name) {
            return {
              name: name,
              values: data.map(function(d) {
                return {
                  timescale: d.timescale,
                  total: +d[name]
                };
              })
            };
          });
          
          x.domain(data.map(function(d) { return d.timescale; }));
          y.domain([0, d3.max(trends, function(c) {
            return d3.max(c.values, function(v) {
              return v.total;
            });
          })]);
          
          // Draw the legend
          var legend = g.selectAll('g')
            .data(trends)
            .enter()
            .append('g')
            .attr('class', 'legend');
          
          legend.append('rect')
            .attr('x', width - 20)
            .attr('y', function(d, i) { return height / 2 - (i + 1) * 20; })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function(d) { return z(d.name); });
          
          legend.append('text')
            .attr('x', width - 8)
            .attr('y', function(d, i) { return height / 2 - (i + 1) * 20 + 10; })
            .text(function(d) { return trendsText[d.name]; });
          
          // Draw the line
          var trend = g.selectAll(".trend")
            .data(trends)
            .enter()
            .append("g")
            .attr("class", "trend");
          
          trend.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.name); });
          
          // Draw the empty value for every point
          var points = g.selectAll('.points')
            .data(trends)
            .enter()
            .append('g')
            .attr('class', 'points')
            .append('text');
          
          // Draw the circle
          trend
            .style("fill", "#FFF")
            .style("stroke", function(d) { return z(d.name); })
            .selectAll("circle.line")
            .data(function(d){ return d.values })
            .enter()
            .append("circle")
            .attr("r", 5)
            .style("stroke-width", 3)
            .attr("cx", function(d) { return x(d.timescale); })
            .attr("cy", function(d) { return y(d.total); });
          
          
          // Draw the axis
          g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(x))
                 .append("text")
           .attr("y", 40)
           .attr("x", 250)
           .text("Unique words");
          
          g.append("g")
            .attr("class", "axis axis-y")
            .call(d3.axisLeft(y).ticks(10))
                .append("text")
           .attr("y", -30)
           .attr("x", -100)
           .attr("transform", "rotate(-90)")
           .text("Number Of Tweets");
          ;
          
          var focus = g.append('g')
            .attr('class', 'focus')
            .style('display', 'none');
          
          focus.append('line')
            .attr('class', 'x-hover-line hover-line')
            .attr('y1' , 0)
            .attr('y2', height);
          
          svg.append('rect')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove);
          
          var timeScales = data.map(function(name) { return x(name.timescale); });
          
          function mouseover() {
            focus.style("display", null);
            d3.selectAll('.points text').style("display", null);
          }
          function mouseout() {
            focus.style("display", "none");
            d3.selectAll('.points text').style("display", "none");
          }
          function mousemove() {
            var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
            var di = data[i-1];
            focus.attr("transform", "translate(" + x(di.timescale) + ",0)");
            d3.selectAll('.points text')
              .attr('x', function(d) { return x(di.timescale) + 15; })
              .attr('y', function(d) { return y(d.values[i-1].total); })
              .text(function(d) { return d.values[i-1].total; })
              .style('fill', function(d) { return z(d.name); });
          }
          
          
          
    }



/////////////////////////  createAAPChart  //////////////
    function createAAPChart(content){
        // The Data that we wish to display on our graph, an array of Javascript Objects
        var data = [{
            'name':"APP",'value': 211
        },{
            'name':"Kejriwal",'value': 81
        },{
            'name':"Arvind",'value': 56
        },{
            'name':"Vote",'value': 55
        },{
            'name':"Indian", 'value': 31
        },{
            'name':"Modi",'value': 30
        },{
            'name':"Politician",'value': 28
        },{
            'name':"BJP",'value': 27
        },{
            'name':"Varanasi",'value': 23
        },{
            'name':"AAM",'value': 22
        }];
        
        
        // Set the dimensions of our chart to be displayed 
        var barsWidth = 400,
            barsHeight = 400,
            axisMargin = 80;
        
        var chartHeight = barsHeight+axisMargin,
            chartWidth = barsWidth+axisMargin;
        
        //Rishi Code 
          var document_width=$(document).width();
         
        //Rishi Code
        
        // Select the chart element on the page so we can reference it in code
        // Also set the width and height attributes of the chart SVG 
        if(document_width<1600){
          var chart = d3.select(content);

        }else{
             var chart = d3.select(content)
              .attr('height', chartHeight);
        }
            //.attr('width', chartWidth+100)
           // .attr('height', chartHeight);
        
        // Create a linear scale for our y-axis to map datapoint values to pixel heights of bars
        var yScale = d3.scaleLinear()
            .domain([0,d3.max(data, function(d){
            // return the value property of each datapoint so the max function can compare
                return d.value;
            })])
            .rangeRound([barsHeight, 0]);
        
        // Create a scale that returns the bands each bar should be in along the x-axis
        let xScale = d3.scaleBand()
            .domain(
                data.map(
                    function(d){
                // For each datapoint in our data array
                // Return the name property into our new domain array
                        return d.name;
                    }
                )
            )
            .rangeRound([0,barsWidth])
            .padding(0.1);
        
        // Create an SVG group that we will add the individual bar elements of our chart to
        var bars = chart.append('g')
            .attr('id', "bars-container");
  
        // Bind the data to our .bars svg elements
        // Create a rectangle for each data point and set position and dimensions using scales
        bars.selectAll('.bar')
            .data(data)
            .enter().append("rect")
                .attr('class', "bar")
                .attr('x', function(d){
                    return xScale(d.name);
                })
                .attr('y', function(d){
                    return yScale(d.value); 
                })
                .attr('width', xScale.bandwidth())
                .attr('height', function(d){return barsHeight-yScale(d.value);});
        
        // Move the bars so that there is space on the left for the y-axis
        bars.attr('transform', 'translate('+axisMargin+',0)');
        
        // Create a new SVG group for the y-axis elements
        // Generate the y-axis with 10 ticks and move into position
        yAxis = chart.append('g')
            .attr('id','y-axis')
            .call(d3.axisLeft(yScale).ticks(10))
                .attr('transform', 'translate('+axisMargin+',0)')
                .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 6)
                 .attr("x", -180)
                 .attr("dy", "-5.1em")
                 .attr("text-anchor", "end")
                 .text("Number of tweets");
        
        // Create another group for the x-axis elements
        // Generate the x-axis using the our x scale and move into positon
        // Select the text elements and rotate by 45 degrees
        xAxis = chart.append('g')
            .attr('id', 'x-axis')
                      .call(d3.axisBottom(xScale))
            .attr('transform', 'translate('+axisMargin+','+barsHeight+')')
            .append("text")
           .attr("y", 50)
           .attr("x", 180)
           .text("Unique words")
  
            .selectAll("text")
                .style("text-anchor",'start')
                .attr('transform', 'rotate(45)');
          
    }

//////////////////////////// Create BJP chart js ////////////////////////
    function createBJPChart(content){
        data: [489, 272, 115, 69, 64, 44, 40, 31]

    // The Data that we wish to display on our graph, an array of Javascript Objects
    var data = [{
        'name':"Modi",'value': 489
    },{
        'name':"BJP",'value': 272
    },{
        'name':"Narendra",'value': 115
    },{
        'name':"Vote",'value': 69
    },{
        'name':"India", 'value': 64
    },{
        'name':"Congress",'value': 44
    },{
        'name':"Indian",'value': 40
    },{
        'name':"PM",'value': 31
    }];


    // Set the dimensions of our chart to be displayed 
    var barsWidth = 400,
        barsHeight = 400,
        axisMargin = 80;

    var chartHeight = barsHeight+axisMargin,
        chartWidth = barsWidth+axisMargin;

        //Rishi Code 
          var document_width=$(document).width();
         
        //Rishi Code

    // Select the chart element on the page so we can reference it in code
    // Also set the width and height attributes of the chart SVG 
    //var chart = d3.select(content);
       if(document_width<1600){
          var chart = d3.select(content);

        }else{
             var chart = d3.select(content)
              .attr('height', chartHeight);
        }
           
        //.attr('width', chartWidth+100)
        //.attr('height', chartHeight);

    // Create a linear scale for our y-axis to map datapoint values to pixel heights of bars
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(data, function(d){
        // return the value property of each datapoint so the max function can compare
            return d.value;
        })])
        .rangeRound([barsHeight, 0]);

    // Create a scale that returns the bands each bar should be in along the x-axis
    let xScale = d3.scaleBand()
        .domain(
            data.map(
                function(d){
            // For each datapoint in our data array
            // Return the name property into our new domain array
                    return d.name;
                }
            )
        )
        .rangeRound([0,barsWidth])
        .padding(0.1);

    // Create an SVG group that we will add the individual bar elements of our chart to
    var bars = chart.append('g')
        .attr('id', "bars-container");

    // Bind the data to our .bars svg elements
    // Create a rectangle for each data point and set position and dimensions using scales
    bars.selectAll('.bar')
        .data(data)
        .enter().append("rect")
            .attr('class', "bar")
            .attr('x', function(d){
                return xScale(d.name);
            })
            .attr('y', function(d){
                return yScale(d.value); 
            })
            .attr('width', xScale.bandwidth())
            .attr('height', function(d){return barsHeight-yScale(d.value);});

    // Move the bars so that there is space on the left for the y-axis
    bars.attr('transform', 'translate('+axisMargin+',0)');

    // Create a new SVG group for the y-axis elements
    // Generate the y-axis with 10 ticks and move into position
    yAxis = chart.append('g')
        .attr('id','y-axis')
        .call(d3.axisLeft(yScale).ticks(10))
            .attr('transform', 'translate('+axisMargin+',0)')
            .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 6)
                 .attr("x", -180)
                 .attr("dy", "-5.1em")
                 .attr("text-anchor", "end")
                 .text("Number of tweets");

    // Create another group for the x-axis elements
    // Generate the x-axis using the our x scale and move into positon
    // Select the text elements and rotate by 45 degrees
    xAxis = chart.append('g')
        .attr('id', 'x-axis')
        .call(d3.axisBottom(xScale))
        .attr('transform', 'translate('+axisMargin+','+barsHeight+')')
            .append("text")
           .attr("y", 50)
           .attr("x", 180)
           
           .text("Unique words")
        .selectAll("text")
            .style("text-anchor",'start')
            .attr('transform', 'rotate(45)');
    }

    ///////////////////////// createINCChart /////////////////////////

    function createINCChart(content){

        // The Data that we wish to display on our graph, an array of Javascript Objects
    var data = [{
        'name':"Gandhi",'value': 137
    },{
        'name':"INC",'value': 92
    },{
        'name':"Rahul",'value': 36
    },{
        'name':"Priyanka",'value': 30
    },{
        'name':"Mahatma", 'value': 21
    },{
        'name':"Sonia",'value': 15
    },{
        'name':"Modi",'value': 15
    },{
        'name':"Congress",'value': 15
    }];


    // Set the dimensions of our chart to be displayed 
    var barsWidth = 400,
        barsHeight = 400,
        axisMargin = 80;

    var chartHeight = barsHeight+axisMargin,
        chartWidth = barsWidth+axisMargin;

   var document_width=$(document).width();

    // Select the chart element on the page so we can reference it in code
    // Also set the width and height attributes of the chart SVG 
    //var chart = d3.select(content);
       if(document_width<1600){
          var chart = d3.select(content);

        }else{
             var chart = d3.select(content)
              .attr('height', chartHeight);
        }
           
        //.attr('width', chartWidth+100)
        //.attr('height', chartHeight);

    // Create a linear scale for our y-axis to map datapoint values to pixel heights of bars
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(data, function(d){
        // return the value property of each datapoint so the max function can compare
            return d.value;
        })])
        .rangeRound([barsHeight, 0]);

    // Create a scale that returns the bands each bar should be in along the x-axis
    let xScale = d3.scaleBand()
        .domain(
            data.map(
                function(d){
            // For each datapoint in our data array
            // Return the name property into our new domain array
                    return d.name;
                }
            )
        )
        .rangeRound([0,barsWidth])
        .padding(0.1);

        // Create an SVG group that we will add the individual bar elements of our chart to
        var bars = chart.append('g')
            .attr('id', "bars-container");

        // Bind the data to our .bars svg elements
        // Create a rectangle for each data point and set position and dimensions using scales
        bars.selectAll('.bar')
            .data(data)
            .enter().append("rect")
                .attr('class', "bar")
                .attr('x', function(d){
                    return xScale(d.name);
                })
                .attr('y', function(d){
                    return yScale(d.value); 
                })
                .attr('width', xScale.bandwidth())
                .attr('height', function(d){return barsHeight-yScale(d.value);});

        // Move the bars so that there is space on the left for the y-axis
        bars.attr('transform', 'translate('+axisMargin+',0)');

        // Create a new SVG group for the y-axis elements
        // Generate the y-axis with 10 ticks and move into position
        yAxis = chart.append('g')
            .attr('id','y-axis')
            .call(d3.axisLeft(yScale).ticks(10))
                .attr('transform', 'translate('+axisMargin+',0)')
                .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 6)
                 .attr("x", -180)
                 .attr("dy", "-5.1em")
                 .attr("text-anchor", "end")
                 .text("Number of tweets");

        // Create another group for the x-axis elements
        // Generate the x-axis using the our x scale and move into positon
        // Select the text elements and rotate by 45 degrees
        xAxis = chart.append('g')
            .attr('id', 'x-axis')
            .call(d3.axisBottom(xScale))
            .attr('transform', 'translate('+axisMargin+','+barsHeight+')')
                .append("text")
           .attr("y", 50)
           .attr("x", 180)
           
           .text("Unique words")
            .selectAll("text")
                .style("text-anchor",'start')
                .attr('transform', 'rotate(45)');
    }

    /* Render the dashboard */

    function render() {
    
        var html =
            '<div >' +
                '<div class="row ">' +
                         '<div class=" col-sm-6" style="margin-top:5%">' +
                            '<div >'  +
                                '<div  id="chart" style="text-align:center"></div>' +
                            '</div>' +
                        '</div>' +
                    '<div class="col-sm-6" style="margin-top:5%">' + 
                        '<div  >' +
                            '<svg id="chart1"  width="600" height="380"><text style="transform: translate(40%, 10px);">Sentiment Analysis of Tweets.</text></svg>' +
                                          
                        '</div>' +
                    '</div>' +
                '</div>' +    
                    
                '</div>' +
                '<div class="row" style="margin-top:20px;">' +
                    '<div class="line2 col-sm-4">' +
                        '<div  class="svg-container" >' +
                            '<svg id="chart2" preserveAspectRatio="xMinYMin meet" viewBox="0 0 600 400" class="svg-content-responsive"><text style="transform: translate(40%, 10px);">XYZ Foods Stock Price</text></svg>' +
                        '</div>' +
                    '</div>' +

                    '<div class="bar1 col-sm-4" >' +
                        '<div  class="svg-container">' +
                            '<svg id="chart3" preserveAspectRatio="xMinYMin meet" viewBox="0 0 600 400" class="svg-content-responsive"><text style="transform: translate(40%, 10px);">Common words in tweets sent by BJP</text></svg>' +
                        '</div>' +
                    '</div>' +

                    '<div class=" col-sm-4" >' +
                        '<div  class="svg-container">'  +
                            '<svg id="chart4" preserveAspectRatio="xMinYMin meet" viewBox="0 0 600 400" class="svg-content-responsive"><text style="transform: translate(40%, 10px);">Common words in INC tweets.</text></svg>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
                ;


        $("#content").html(html);

        chart  = createPieChart('#chart');
        chart1 = createLineChartDemo('#chart1');
        chart2 = createAAPChart('#chart2');
        chart3 = createBJPChart('#chart3');
        chart4 = createINCChart('#chart4');
      

    }

    return {
        
        render: render
    }


}());
