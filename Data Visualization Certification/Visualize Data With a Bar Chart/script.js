function getDateFromString(dateStr)  {
 
    const dateArray = dateStr.split("-");
    if(dateArray.length > 2)
    {
      return new Date(dateArray[0],dateArray[1],dateArray[2]);;    
    }
    return null;
    
  }
  
  function getYearFromDate(dateStr) {
    
    const dateArray = dateStr.split("-");
    return dateArray[0];
  }
  
  
    document.addEventListener('DOMContentLoaded',function(){
      
        req=new XMLHttpRequest();
        req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  
        req.send();
        req.onload=function() {
          
         json=JSON.parse(req.responseText);        
         const dataSet = json.data;   
         const w = 1000;
         const h = 700;
         const padding = 70;        
         const minYear =  d3.min(dataSet, function(d){ return getYearFromDate(d[0]); });      
         const maxYear =  d3.max(dataSet, function(d){ return getYearFromDate(d[0]); });
          
         const xWidthFactor = parseFloat(maxYear - minYear) / dataSet.length;        
          
         const xScale = d3.scaleLinear()
         .domain([minYear, maxYear]).range([padding, w - padding]);       
      
         const yScale = d3.scaleLinear()
         .domain([0, d3.max(dataSet, (d) => d[1])])
         .range([h - padding, padding]);
         
      const svg = d3.select("#main")
                    .append("svg")
                    .attr("width",w)
                    .attr("height",h);
          
      svg.append("text") 
      .attr("id","title")        
      .attr("class","chart-title")
      .attr('x', w/2-50)
      .attr('y', 100)
      .text("GDP Data")
      
          
          
       const yAxis = d3.axisLeft(yScale);
       const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); 
          
       const xScaleWidthfactor = xWidthFactor * 10; 
          
  
              ///     X & Y axis                
          
          
       svg.append('g')
       .attr("transform", "translate("+padding+","+0+")")      
       .attr("id","y-axis")        
       .call(yAxis);        
          
        svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .attr("id","x-axis")
        .call(xAxis);       
          
          
         // Tooltip
          
  var tooltip = d3.select("body")
                .append("div")
                .attr("class", "toolTip")
                .attr("id","tooltip");
          
       //   Rect        
          
          svg.selectAll("rect")
         .data(dataSet)
         .enter()
         .append("rect")
         
         .attr("x", (d, i) => {return xScale((i*xWidthFactor)+parseInt(minYear));})
         .attr("y", (d, i) => {         
           return yScale(d[1]);         
         })
         .attr("class","bar")
         .attr("width", xScaleWidthfactor)
         .attr("height", (d, i) => {
            return (h - padding - yScale(d[1]));})
         .attr("data-date",function(d,i){
            return d[0];
          })
          .attr("data-gdp",function(d){
            return d[1];
          })
          .on("mouseover", function(d,i){
              tooltip
                .style("left", d3.event.pageX - 100 + "px")
                .style("top", d3.event.pageY - 80 + "px")
                .style("display", "inline-block")
            
                .html("Date: "+d[0])
                .attr("data-date",d[0]);
           })
              .on("mouseout", function(d){ tooltip.style("display", "none");});
          
          
          
          
         //  Axis Label
          
          svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 + padding-60)
          .attr("x",0 - (h / 2.5))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("GDP"); 
          
          
          svg.append("text")             
        .attr("transform",
              "translate(" + (w/1.5) + " ," + 
                             (h - padding +40) + ")")
        .style("text-anchor", "middle")
        .text("Year");
          
       };
    });