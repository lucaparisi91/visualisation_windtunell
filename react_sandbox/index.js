import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { PerfVis } from "./benchio/PerfVis";


//import App from "./react_app.js";
import * as d3 from "d3";

const parseTime=function( time )
{
  const format = d3.timeParse("%Y-%d-%m %H:%M:%S")
  return format(time)

}

const domNode= document.getElementById("container-chart")
const root = createRoot(domNode)

//const data2 = await d3.csv("benchio_unstriped_hdf5.csv")


//const data = data2.map ( d => [ parseTime(d["datetime"]),parseFloat(d["perf_value"])] )

//const response = await fetch("http://localhost:8000/perf/get",{method: "get"});
//let data = await response.json()
//data = data.map ( d => [ parseTime(d["perf_time"]),parseFloat(d["perf_value"]) ] )

//console.log(data)

//const n = 100

//const times = [...Array(n).keys()].map( i => 
//   new Date(Date.now() - i * 60*60*1000)
//).sort( (a,b) => a.getTime() - b.getTime() )

//const data=times.map( t => [ t ,     Math.random()] )



//const dataGrouped= d3.group( data, (d) => d.name )


//const fig = new Figure()
//const chart = new perfChart( dataGrouped ,fig)


root.render( 
    < PerfVis  />
 )





//root.render( <App onDateChange= { (time1,time2) => { 
//    chart.xlim(time1,time2)
//     } } />)

//dataGrouped.forEach( (value,key) => {console.log(value)} )


