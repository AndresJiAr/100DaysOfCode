// legendXPosLayout is a helper function that defines spacing between legend's elements on the x-axis
const legendXPosLayout = (i) => {
  if (i < 6) {
    return 0;
  } else if (i < 12) {
    return 80;
  } else {
    return 160;
  };
};

// legendYPosLayout is a helper function that defines spacing between legend's elements on the y-axis
const legendYPosLayout = (i) => {
  switch (i) {
    case 0:
    case 6:
    case 12:
      return 0;
    case 1:
    case 7:
    case 13:
      return 20;
    case 2:
    case 8:
    case 14:
      return 40;
    case 3:
    case 9:
    case 15:
      return 60;
    case 4:
    case 10:
    case 16:
      return 80;
    case 5:
    case 11:
    case 17:
      return 100;
  };
};

// wrap is a function that wraps the text elements within each tile
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            };
        };
    });
};

const render = data => {
  // const width = document.body.clientWidth;
  // const height = document.body.clientHeight;
  const width = 1260;
  const height = 550;
  
  // define space for the treemap
  const margin = { top: 80, right: 80, bottom: 150, left: 80 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  
  const dataName = d => d.data.name;
  const dataCategory = d => d.data.category;
  const dataValue = d => d.data.value;
  
  const xValue = d => d.x0;
  const yValue = d => d.y0;
  const tileWidth = d => d.x1 - xValue(d);
  const tileHeight = d => d.y1 - yValue(d);
  
  const tileTextXPos = d => xValue(d) + 5;
  const tileTextYPos = d => yValue(d) + 10;
  
  // Create and position axes text labels and the title
  const titleText = 'Video Game Sales';
  const titleXAxisPos = innerWidth / 2;
  const titleYAxisPos = -30;
  
  const subtitleText = 'Top 100 Most Sold Video Games Grouped by Platform';
  const subtitleYAxisPos = titleYAxisPos + 22;
  
  // categoriesFill defines color scheme for each tile grouping
  const categoriesFill = {
    'Wii': 'rgb(76, 146, 195)',
    'DS': 'rgb(190, 210, 237)',
    'X360': 'rgb(254, 153, 61)',
    'GB': 'rgb(254, 201, 147)',
    'PS3': 'rgb(86, 180, 86)',
    'NES': 'rgb(174, 229, 161)',
    '3DS': 'rgb(254, 173, 170)',
    'PS': 'rgb(163, 120, 111)',
    'N64': 'rgb(209, 176, 169)',
    'PS2': 'rgb(222, 82, 83)',
    'PS4': 'rgb(169, 134, 202)',
    'SNES': 'rgb(208, 192, 221)',
    'GBA': 'rgb(234, 116, 206)',
    'XB': 'rgb(249, 197, 219)',
    'PC': 'rgb(153, 153, 153)',
    '2600': 'rgb(199, 200, 202)',
    'PSP': 'rgb(202, 200, 81)',
    'XOne': 'rgb(226, 227, 170)'
  };
  
  // create an svg
  const svg = d3.select('svg')
    // .style('width', width)
    // .style('height', height);
    .attr('viewBox', `0 0 ${width} ${height}`);
  
  // define and append treemap to the svg
  const treemap = svg.append('g')
    .attr('id', 'treemap')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  let root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
  
  d3.treemap()
    .size([innerWidth, innerHeight]) (root)
  
  // append the title section
  const titleSection = treemap.append('g')
    .attr('text-anchor', 'middle');
  
  titleSection.append('text')
    .attr('id', 'title')
    .attr('x', titleXAxisPos)
    .attr('y', titleYAxisPos)
    .text(titleText);
  
  titleSection.append('text')
    .attr('id', 'description')
    .attr('x', titleXAxisPos)
    .attr('y', subtitleYAxisPos)
    .text(subtitleText);
  
  // define tooltips initial setting
  let tooltip = d3.select('body').append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  
  // append tiles
  const tileGrouping = treemap.selectAll(null).data(root.leaves())
    .enter().append('g')
      .attr('transform', d => `translate(${xValue(d)}, ${yValue(d)})`);
  
  tileGrouping.append('rect')
    .attr('class', 'tile')
    .attr('data-name', d => dataName(d))
    .attr('data-category', d => dataCategory(d))
    .attr('data-value', d => dataValue(d))
    .attr('width', d => tileWidth(d))
    .attr('height', d => tileHeight(d))
    .style('fill', d => categoriesFill[dataCategory(d)])
    .on('mouseover', d => {
          tooltip.transition().duration(100).style('opacity', 0.9);
          tooltip.html(`Name: ${dataName(d)} 
                        </br>Category: ${dataCategory(d)}
                        </br>Value: ${dataValue(d)}`)
            .style('left', d3.event.pageX - 50 + "px")
            .style('top', d3.event.pageY - 120 + "px")
            .attr('data-value', dataValue(d))
       })
       .on('mouseout', d => {
          tooltip.transition().duration(500).style('opacity', 0);
       });;
  
    tileGrouping.append('text')
        .attr('class', 'tileText')
        .attr('x', 3)
        .attr('y', 10)
        .text(d => dataName(d))
        .call(wrap, 45)
  
  const categoriesFillArray = Object.entries(categoriesFill);
  
  // append the legend element
  const legend = svg.append('g').attr('id', 'legend')
    .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + 100})`);
  
  const legendGrouping = legend.selectAll('g').data(categoriesFillArray)
    .enter().append('g');
        
  legendGrouping.append('rect')
    .attr('class', 'legend-item')
    .attr('x', (d, i) => legendXPosLayout(i))
    .attr('y', (d, i) => legendYPosLayout(i))
    .attr('width', 15)
    .attr('height', 15)
    .style('fill', d => d[1]);

  legendGrouping.append('text')
    .attr('class', 'legend-item-text')
    .attr('x', (d, i) => legendXPosLayout(i) + 20)
    .attr('y', (d, i) => legendYPosLayout(i) + 10)
    .text(d => d[0]);
};

// Send an AJAX request to retrieve, parse through the dataset and then render it
document.addEventListener('DOMContentLoaded', function() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json', true);
  request.send();
  request.onload = function () {
    let data = JSON.parse(request.responseText);
    render(data);
  };
});