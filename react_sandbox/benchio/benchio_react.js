import React from "react";
import * as d3 from "d3";

import {useMemo, useState} from 'react';

const n = 100

const times = [...Array(n).keys()].map( i => 
   new Date(Date.now() - i * 60*60*1000)
).sort( (a,b) => a.getTime() - b.getTime() )
console.log(times)

const data=times.map( t => [ t ,     Math.random()] )



function Figure( props    )
{
    const margin = {top: 10, right: 30, bottom: 30, left: 60}
    const padding = { top : 10, right: 10, bottom: 20,left : 10 }

    const display_width = props.width - margin.left - margin.right - padding.left - padding.right
    const display_height = props.height - margin.top - margin.bottom - padding.top - padding.bottom;


  



    
    //const xScale = d3.scaleLinear()
    //.domain([0,1])
    //.range([ 0,box_width ]);

    const [xExtent,setXExtent] = useState( d3.extent(times) )

    const xScale = useMemo( () => d3.scaleTime().domain(xExtent).range([0,display_width]).nice()  ,[xExtent]        )




    const yScale=d3.scaleLinear().domain([0,1]).range([display_height,0])
    

    const figure = 
    <svg width={ props.width} height={props.height}  >
        <g transform={`translate(${margin.left + padding.left},${props.height - margin.bottom})`}   >
        <HAxis width={display_width} scale={ xScale}  />
        </g>
        
        <clipPath id="clip-display">
            <rect width={props.width - margin.left - margin.right} height={props.height - margin.top -margin.bottom} />
        </clipPath>

        <g transform={`translate(${margin.left},${margin.top})`} clipPath={"url(#clip-display)"} >
            <g transform={`translate(${padding.left},${padding.right})`} >

                <Lines data={data} xScale={xScale} yScale={yScale} />
                <Scatter data={data} xScale={xScale} yScale={yScale} /> 
        </g>
        </g> 
 
        
    </svg>

    let t1 = new Date("2023-09-09")
    let t2 = new Date("2023-09-11")

    //const dataExtent = d3.extent(times)
    //t1=dataExtent[0]
    //t2=dataExtent[1]


    return (<>
        <div>
        {figure}
        </div>
        
        <button onClick={ (e)=>{ setXExtent( [t1,t2])  } } > Resize </button>
    </> )

}

function HAxis ( props )
{
    const nTicks=5 
    const width = props.width
    const scale= props.scale
    const tickHeight= 10
    const color="black"



            const parseTime = (d) => d.toLocaleString('default', { month: 'short', day: 'numeric',hour:'numeric',hour12:true })


            const markers= scale.ticks().map( 
        xth => <g className="marker" key={xth} transform={`translate(${scale(xth)},0) `}>
            <path d={`M0 0 v${tickHeight}`} stroke={`black`}    />
            <text transform={`translate(0,${tickHeight + 10})`} key={xth} style={{
        fontSize: "10px",
        textAnchor : "middle"
    }} >
       {parseTime(xth)}
            </text>
            
             
            </g>
    )
    

    return (<g >
        <path d={`M0 0 h ${width}`} stroke={color}>
        </path>
        <g className = "ticks">
            {markers}
        </g>
    </g>)

}



function Scatter(props)
{
    const radius=10
    const strokeColor="gray"
    const fillColor="white"


    const markers = props.data.map( (d)=> <circle key={`${d[0]}-${d[1]}`} cx={props.xScale(d[0])} cy={props.yScale(d[1])} r={radius} strokeWidth={5} stroke={strokeColor} fill={fillColor} ></circle>  )


    return < g className="scatter" > {markers}</g>
}

function Lines(props)
{
    const colorStroke="gray"
    const strokeWidth=5

    const lc=d3.line().x( d => props.xScale(d[0])   ).y( d=> props.yScale(d[1]) )
    return <path d={lc(props.data)} stroke={colorStroke} strokeWidth={strokeWidth} fill="none"/>

}

export {Figure}

