import * as d3 from "d3";


class Figure
{
  constructor()
  {
    this.margin = {top: 10, right: 30, bottom: 30, left: 60},
    this.width =1000 - this.margin.left - this.margin.right,
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



export { Figure }


class perfChart
{

  getElementY(d) { return  parseFloat(d.perf_value) }
  getElementX(d) { return parseTime(d.datetime) }


  getElement(d,axis) {
    
    if (axis == 0)
    {
      return this.getElementX(d)
    }
    else if (axis==1)
    {
      return this.getElementY(d)
    }


  }


  constructor(data,fig )
  {
    this.fig=fig
    this.data=data
    this.nTicks=5
    this.extent=[null,null]
    
    this.scale=[null,null]
    
    this.draw()

        

    

  }
  

  updateXScale()
  {
    const width = this.fig.width

    this.scale[0] = d3.scaleTime()
      .domain(this.extent[0])
      .range([ 0, width ]);

  }


  setAutoExtent( axis)
  {

    this.extent[axis]=null


    for ( const [key,data] of this.data)
    {

      const extent=d3.extent(data, (d) => this.getElement(d,axis) )


       if (this.extent[axis] == null)
      {
        this.extent[axis]=extent
      }
      else 
      {
        this.extent[axis][0]=Math.min( extent[0],this.extent[axis][0])
        this.extent[axis][1]=Math.max(extent[1],this.extent[axis][1])
        

      }

    }

    
      
    }

    updateYScale()
    {
      const height = this.fig.height

      this.scale[1] = d3.scaleLinear()
      .domain(this.extent[1])
      .range([ height, 0 ]);

    }



    updateScale(axis)
    {
      if (axis==0) 
      {
        this.updateXScale()
      }
      else if (axis==1)
      {
        this.updateYScale()
      }
    }
  

  
  append_track( key, data)
  {
    const svg=this.fig.svg

    const xScale=this.scale[0]
    const yScale=this.scale[1]



    svg.append("g").attr("class",`track ${key}`).append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("class","perf-path")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(  (d)=>{ return xScale(parseTime(d.datetime)) })
      .y( (d) => { return yScale( parseFloat(d.perf_value)) })
      )

  }

  drawXAxis()
  {
    const width = this.fig.width
    const height = this.fig.height


    this.fig.svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class","xaxis")
      .call(d3.axisBottom(this.scale[0]).ticks(this.nTicks));

  }

  drawYAxis()
  {
    this.fig.svg.append("g")
      .call(d3.axisLeft(this.scale[1]));
    
  }


  draw( )
  {
    const svg = this.fig.svg
    const height = this.fig.height


    //this.setAutoXExtent()
    //this.updateXScale()


    //this.drawXAxis()
    this.setAutoExtent(0)
    this.setAutoExtent( 1)

    this.updateScale(0)
    this.updateScale(1)

    this.drawXAxis()
    this.drawYAxis()


    for ( const [key,data] of this.data)
    {
      
      this.append_track( key,data)

    }
    //this.updateYScale()



    //this.drawYAxis()
    

    
    // Add Y axis
    
    
    //

    //console.log(y.domain())
    // Add the line



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