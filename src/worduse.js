let wuMargin = {top: 90, right: 170, bottom: 30, left: 80},
    wuWidth = 900 - wuMargin.left - wuMargin.right,
    wuHeight = 600 - wuMargin.top - wuMargin.bottom

let wuSvg = d3.select("#worduse")
              .append('svg')
              .attr('width', wuWidth + wuMargin.left + wuMargin.right)
              .attr('height', wuHeight + wuMargin.top + wuMargin.bottom)
              .append("g")
              .attr('transform', 
                    "translate(" + wuMargin.left + "," + wuMargin.top +")")

// To ensure that the professor is able to easily view the project locally, all data has to exist in-file.
const protesterWordsData = [
    {"term": "crowd", "uses": 7},
    {"term": "looting", "uses": 7},
    {"term": "protesters", "uses": 6},
    {"term": "crowds", "uses": 4},
    {"term": "demonstrators", "uses": 3},
    {"term": "threw rocks", "uses": 3},
    {"term": "smashed", "uses": 2},
    {"term": "looted", "uses": 2}
]

const protestsWordsData = [
    {"term": "unrest", "uses": 5},
    {"term": "protests", "uses": 3},
    {"term": "peaceful", "uses": 3},
    {"term": "standoff", "uses": 3},
    {"term": "chaotic", "uses": 2},
    {"term": "tensions", "uses": 2},
    {"term": "violence", "uses": 2},
    {"term": "violent", "uses": 2}
]

// Create x-axis.
let wuX = d3.scaleLinear()
            .range([0, wuWidth])
let wuXAxis = wuSvg.append('g')
                   .attr('transform', "translate(0," + wuHeight + ")")

// Create y-axis.
let wuY = d3.scaleBand()
            .range([0, wuHeight])
            .padding(1)
let wuYAxis = wuSvg.append('g')
                   .attr('class', "myYAxis")

function update(data) {
    // Update the x-axis.
    wuX.domain([0, 10])
    wuXAxis.transition().duration(1000).call(d3.axisBottom(wuX))
           .selectAll('text')
           .attr('transform', "translate(-10,0)rotate(-45)")
           .style('text-anchor', 'end')

    // Update the y-axis.
    wuY.domain(data.map(function(d) { return d.term }))
    wuYAxis.transition().duration(1000).call(d3.axisLeft(wuY))

    let j = wuSvg.selectAll('.myline')
                 .data(data)
    
    j.enter()
     .append('line')
     .attr('class', 'myline')
     .merge(j)
     .transition()
     .duration(1000)
     .attr('x1', function(d) { return wuX(d.uses) })
     .attr('x2', wuX(0))
     .attr('y1', function(d) { return wuY(d.term) })
     .attr('y2', function(d) { return wuY(d.term) })
     .attr('stroke', 'grey')

     let u = wuSvg.selectAll('circle')
                  .data(data)

     u.enter()
      .append('circle')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('cx', function(d) { return wuX(d.uses) })
      .attr('cy', function(d) { return wuY(d.term) })
      .attr('r', '4')
      .attr('fill', '#69b3a2')
      .attr('stroke', 'black')

}

update(protesterWordsData)

