const urlData = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const urlMap = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

const w = 1000,
      h = 700,
      padding = 50;

class Svg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], map: {}}
    this.getData = this.getData.bind(this);
  }
  
  
  getData(error, data, map) {
    if (error) throw error;

    this.setState({data: data, map: map})
  };
  
  componentDidMount() {
    d3.queue()
      .defer(d3.json, urlData)
      .defer(d3.json, urlMap)
      .await(this.getData);
    
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
    const data = this.state.data,
          map = this.state.map;
    
    let svg = d3.select('svg');
    
    
    let path = d3.geoPath()
    
   //SCALES
    const max = d3.max(data, (d) => d.bachelorsOrHigher),
          min = d3.min(data, (d) => d.bachelorsOrHigher);
    
    const colorScale = d3.scaleLinear().domain([min, max]).range([225, 25]);
    
    
    //COUNTIES
    svg.append("g")
      .attr('transform', 'translate(0, 50)')
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(map, map.objects.counties).features)
      .enter().append("path")
      .attr("class", "county")
      .attr('data-fips', (d) => data.filter((item) => item.fips === d.id)[0].fips)
      .attr('data-education', (d) => data.filter((item) => item.fips === d.id)[0].bachelorsOrHigher)
      .attr("d", path)
      .style('fill', (d, i) => {
        let rgb = data.filter((item) => item.fips === d.id)[0].bachelorsOrHigher
        return `rgb(${Math.round(colorScale(rgb))}, ${Math.round(colorScale(rgb))}, 255)`;
      })
      .on('mouseover', (d, i) => {
      
        const tooltip = d3.select('#tooltip')
        tooltip
        .attr('data-education', document.getElementsByClassName('county')[i].getAttribute('data-education'))
        .style('opacity', 0.8)
        .html(() => {
          const item = data.filter((item) => item.fips === d.id)[0];
          return `${item.bachelorsOrHigher}%<br>${item.area_name}, ${item.state}`
        })
        .style("left", (d3.event.pageX + 10) - (document.getElementById('visualization').offsetLeft) + "px") 
        .style("top", (d3.event.pageY) - (document.getElementById('visualization').offsetTop) + "px") 
        .style('transform', 'translateX(20px)')
      })
      .on('mouseout', () => {
        const tooltip = d3.select('#tooltip')
        tooltip.style('opacity', 0)
      });;
    
    //STATES
    svg.append('g').attr('id', 'states').attr('transform', 'translate(0,50)')
      .append("path")
      .datum(topojson.mesh(map, map.objects.states))
      .attr("class", "state")
      .attr("d", path);
    
    
    //LEGEND
    const legendData = [min, min + (max-min)/5, min + 2*(max-min)/5, min + 3*(max-min)/5, min + 4*(max-min)/5, max];
    
    let legend = svg.append('g').attr('transform', 'translate(650, 60)')
      .attr('id', 'legend')
      .selectAll('rect')
      .data(legendData).enter();
    
    legend
    .append('rect')
    .attr('width', 30)
    .attr('height', 20)
    .attr('x', (d, i) => i*30)
    .style('fill', (d) => `rgb(${Math.round(colorScale(d))}, ${Math.round(colorScale(d))}, 255)`
)
    
    legend
    .append('text')
    .attr('x', (d, i) => i*30 + 15)
    .attr('y', 10)
    .text((d) => Math.round(d))
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    
    svg.append('text')
    .attr('id', 'legend-percent')
    .text('%').attr('x', 650 + 10 + legendData.length * 30).attr('y', 60 + 10)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('font-weight', 'bold')
    
    /* Description */
    svg.append('text').attr('id', 'description').text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)").attr('x', w/2).attr('y', padding/2).attr('text-anchor', 'middle').attr('alignment-baseline', 'central').attr('font-weight', 'bold')
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a href='https://learn.freecodecamp.org/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map' target='_blank'><h2>FCC Data Visualization Projects - Visualize Data with a Choropleth Map</h2></a>
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
        <h1 id='title'>United States Educational Attainment</h1>
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