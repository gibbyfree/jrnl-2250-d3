// Code for mouseover interactivity largely pulled from: https://www.d3-graph-gallery.com/graph/line_cursor.html

let margin = {top: 30, right: 250, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

let wcSvg = d3.select("#wordcount")
              .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .append("g")
              .attr('transform', 
                    "translate(" + margin.left + "," + margin.top +")")

// To ensure that the professor is able to easily view the project locally, all data has to exist in-file.
const wordcountData = [
    {"date": "08/11/2014", "wordcount": 1198},
    {"date": "08/12/2014", "wordcount": 2104},
    {"date": "08/13/2014", "wordcount": 2610},
    {"date": "08/14/2014", "wordcount": 4041},
    {"date": "08/15/2014", "wordcount": 17017},
    {"date": "08/16/2014", "wordcount": 5015},
    {"date": "08/17/2014", "wordcount": 4068},
    {"date": "08/18/2014", "wordcount": 8579},
    {"date": "08/19/2014", "wordcount": 5919},
    {"date": "08/20/2014", "wordcount": 7789},
    {"date": "08/21/2014", "wordcount": 12001},
    {"date": "08/22/2014", "wordcount": 6152},
    {"date": "08/23/2014", "wordcount": 4032},
    {"date": "08/24/2014", "wordcount": 6370},
    {"date": "08/25/2014", "wordcount": 7293},
    {"date": "08/26/2014", "wordcount": 1385},
    {"date": "08/27/2014", "wordcount": 2245},
    {"date": "08/28/2014", "wordcount": 1829},
    {"date": "08/29/2014", "wordcount": 387},
    {"date": "08/30/2014", "wordcount": 0},
    {"date": "08/31/2014", "wordcount": 3475},
    {"date": "09/01/2014", "wordcount": 0},
    {"date": "09/02/2014", "wordcount": 1142},
    {"date": "09/03/2014", "wordcount": 3048},
    {"date": "09/04/2014", "wordcount": 4393},
    {"date": "09/05/2014", "wordcount": 838},
    {"date": "09/06/2014", "wordcount": 0},
    {"date": "09/07/2014", "wordcount": 838},
    {"date": "09/08/2014", "wordcount": 1169},
    {"date": "09/09/2014", "wordcount": 1154},
    {"date": "09/10/2014", "wordcount": 2415},
    {"date": "09/11/2014", "wordcount": 876}]

// Create x-axis from date.
let x = d3.scaleTime()
          .domain(d3.extent(wordcountData, function(d) { return new Date(d.date)}))
          .range([0, width])
          wcSvg.append('g')
               .attr('transform', "translate(0," + height +")")
               .call(d3.axisBottom(x)
               .tickFormat(d3.timeFormat("%m/%d"))
               .ticks(4))

// Create y-axis from wordcount.
let y = d3.scaleLinear()
          .domain([0, d3.max(wordcountData, function(d) {return +d.wordcount})])
          .range([height, 0])
          wcSvg.append('g')
               .call(d3.axisLeft(y))

let bisect = d3.bisector(function(d) { return new Date(d.date)}).left

// Circle + text for mouseover interactivity
let focus = wcSvg.append('g')
                 .append('circle')
                 .style('fill', 'none')
                 .attr('stroke', 'black')
                 .attr('r', 8.5)
                 .style('opacity', 0)

let focusText = wcSvg.append('g')
                     .append('text')
                     .style('opacity', 0)
                     .attr('text-anchor', 'left')
                     .attr('allignment-baseline', 'middle')
   
 wcSvg.append('path')
      .datum(wordcountData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
                   .x(function(d) { return x(new Date(d.date)) })
                   .y(function(d) { return y(d.wordcount) }))

// Pointer event monitoring rect that sits on top of the rest of the viz
let mouseoverRect = wcSvg.append('rect')
                         .style('fill', 'none')
                         .style('pointer-events', 'all')
                         .attr('width', width)
                         .attr('height', height)
                         .on('mouseover', mouseover)
                         .on('mousemove', mousemove)
                         .on('mouseout', mouseout)

function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity", 1)
}

function mousemove() {
    let x0 = x.invert(d3.mouse(this)[0])
    let i = bisect(wordcountData, x0, 1)
    selectedData = wordcountData[i]
    focus.attr("cx", x(new Date(selectedData.date)))
         .attr("cy", y(selectedData.wordcount))
    focusText.html("Date: " + selectedData.date + " - Wordcount: " + selectedData.wordcount)
             .attr("x", x(new Date(selectedData.date)))
             .attr("y", y(selectedData.wordcount))
}

function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
}