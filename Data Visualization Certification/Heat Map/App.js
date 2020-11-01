const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const w = 1000,
      h = 380,
      padding = 50;

class Svg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
  }
  
  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ 
        data: data
      }
    ));
    
    d3.select('#visualization')
      .append('div')
      .attr('id', 'tooltip');
  }
  
  render() {          
    return(
      <div id='visualization'>
        <svg style={{'width': w, 'height': h}} id='svg'>
        </svg>
      </div>
    )
  }
  
  componentDidUpdate() {    
    const data = this.state.data.monthlyVariance,
          baseTemp = this.state.data.baseTemperature;
    
    const maxTemp = d3.max(data, (d) => d.variance),
          minTemp = d3.min(data, (d) => d.variance),
          maxYear = d3.max(data, (d) => d.year),
          minYear = d3.min(data, (d) => d.year);
    
    const tempScale = d3.scaleSequential(d3.interpolateInferno).domain([minTemp, maxTemp]);
    const yearScale = d3.scaleTime().domain([minYear, maxYear]).range([padding+20, w - 20]);
    const monthScale = d3.scaleBand().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).range([h-padding, padding]);
  
    let svg = d3.select('svg');
    
    /* Bars */
    const rects = svg.selectAll('rect').data(data).enter();
    rects.append('rect').attr('class', 'cell')
      .attr('data-month', (d) => d.month-1)
      .attr('data-year', (d) => d.year)
      .attr('data-temp', (d) => d.variance)
      .attr('x', (d) => yearScale(d.year))
      .attr('y', (d) => {
        return (h-padding) - (h-2*padding)/12 * (d.month)
      })
      .attr('width', (w-padding)/(data.filter((item) => item.month === 1)).length)
      .attr('height', (h-2*padding)/12)
      .style('fill', (d) => {
        return tempScale(d.variance)
      })
    .on('mouseover', (d, i) => {
      const tooltip = d3.select('#tooltip')
      tooltip
      .attr('data-year', d.year)
      .style('opacity', 0.8)
      .html(() => {
        const timeParse = d3.timeFormat("%B")
        const month = timeParse(new Date(d.year + '-' + d.month))
        return `${month} ${d.year}<br>Temp: ${(baseTemp+d.variance).toFixed(2)}&deg;C<br>Var: ${d.variance.toFixed(2)}&deg;C`;
      })
      .style('left', () => `${yearScale(d.year)}px`)
      .style('bottom', () => `${(h-2*padding)/12 * (d.month)}px`)
      .style('transform', 'translateX(20px)')
    })
    .on('mouseout', () => {
      const tooltip = d3.select('#tooltip')
      tooltip.style('opacity', 0)
    });
        
    /* Axes */
    const xAxis = d3.axisBottom(yearScale).tickFormat(d3.formatPrefix('.0s', 1e2)).tickSizeOuter (0);
    const yAxis = d3.axisLeft(monthScale).tickFormat((d) => {
          const timeParse = d3.timeFormat("%B")
          const month = timeParse(new Date(1999 + '-' + d))
          return month
          }).tickSizeOuter (0);
    
    svg.append('g').attr('id', 'x-axis').attr('transform', `translate(0, ${h - padding})`).call(xAxis);
    
    svg.append('g').attr('id', 'y-axis').attr('transform', `translate(${padding+20}, 0)`).call(yAxis);
    
    /* Legend */
    const legend = svg.append('g').attr('id', 'legend')
    const min = minTemp, max = maxTemp;
    const legendData = [min, (min + 1*(max-min)/7), (min + 2*(max-min)/7), (min + 3*(max-min)/7), (min + 4*(max-min)/7), (min + 5*(max-min)/7), (min + 6*(max-min)/7), max];
    
    legend.attr('transform', `translate(${w/2 - 2*padding}, ${h-padding/2})`).style('opacity', '0.8');
      
   legend.selectAll('rect')
    .data(legendData).enter()
    .append('rect')
    .attr('width', padding/2)
    .attr('height', padding/2)
    .attr('x', (d, i) => i * padding/2)
    .attr('y', 0)
    .style('fill', (d) => tempScale(d))
    legend.selectAll('text').data(legendData).enter()
    .append('text')
    .attr('x', (d, i) => i * padding/2 + padding/4)
    .attr('y', padding/4)
    .text((d) => (d+baseTemp).toFixed(0))
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .style('fill', '#a2a394')
    
    
    /* Description */
    svg.append('text').attr('id', 'description').text('1753 - 2015: base temperature 8.66℃').attr('x', w/2).attr('y', padding/2).attr('text-anchor', 'middle').attr('alignment-baseline', 'central')
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a href='https://learn.freecodecamp.org/data-visualization/data-visualization-projects/visualize-data-with-a-heat-map' target='_blank'><h2>FCC Data Visualization Projects - Visualize Data with a Heat Map</h2></a>
      </header>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id='svg-container-big'>
        <h1 id='title'>Monthly Global Land-Surface Temperature</h1>
        <Svg/>
      </div>
    );
  }
}

ReactDOM.render(
    <div>
      <Header/>
      <Main />
    </div>,
  document.getElementById('root')
);