import * as d3 from "d3";


class Figure
{
  constructor()
  {
    this.margin = {top: 10, right: 30, bottom: 30, left: 60},
    this.width = 460 - this.margin.left - this.margin.right,
    this.height = 400 - this.margin.top - this.margin.bottom;

    // append the svg object to the body of the page
    this.svg = d3.select("#container-chart")
    .append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

};


class perfChart
{

  constructor(data,fig)
  {
    this.fig=fig
    this.data=data
    this.draw()
  }


  draw( )
  {
    const svg = this.fig.svg
    const width = this.fig.width
    const height = this.fig.height
    
    // Add X axis --> it is a date format
    this.xScale = d3.scaleTime()
      .domain(d3.extent(this.data, function(d) { return parseTime(d.datetime); }))
      .range([ 0, width ]);
    
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class","xaxis")
      .call(d3.axisBottom(this.xScale).ticks(5));

    // Add Y axis
    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, function(d) { return d.perf_value; }))
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(this.yScale));
    
    //console.log(y.domain())
    // Add the line
    svg.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("class","perf-path")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(  (d)=>{ return this.xScale(parseTime(d.datetime)) })
        .y( (d) => { return this.yScale(d.perf_value) })
        )
  }

  xlim( time1, time2)
  {
    const xRange = [ parseTime(time1),parseTime(time2)]

    this.xScale= d3.scaleTime()
    .domain( xRange )
    .range([ 0, this.fig.width ]);

    this.yScale = d3.scaleLinear()
    .domain(d3.extent(this.data, function(d) { return d.perf_value; }))
    .range([ this.fig.height, 0 ]);

    this.fig.svg.select(".xaxis").call(d3.axisBottom(this.xScale).ticks(5));

    const data2=this.data.filter((d) => ( parseTime(d.datetime) >=xRange[0]) && ( parseTime(d.datetime) <=xRange[1])  )

    //console.log(data2)

    this.fig.svg.select(".perf-path").datum(data2).attr("d", d3.line()
    .x( (d) => { return this.xScale(parseTime(d.datetime)) })
    .y( (d) => { return this.yScale(d.perf_value) })
    )

  }


}


const parseTime=function( time )
{
  const format = d3.timeParse("%Y-%m-%d %H:%M:%S")
  return format(time)

}




export { parseTime, perfChart, Figure }