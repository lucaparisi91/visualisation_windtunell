import React from "react";
import * as d3 from "d3";

import {useMemo, useState} from 'react';
import { BoxZoom } from "./BoxZoom";
import { HAxis } from "./HAxis";
import { VAxis } from "./VAxis";



function Figure( props    )
{

    const data = props.data

    if ( data == null )
    {
        return <></>
    }

    else 
    {
        
    const margin = {top: 10, right: 30, bottom: 30, left: 30}
    const padding = { top : 10, right: 10, bottom: 20,left : 30 }

    const display_width = props.width - margin.left - margin.right - padding.left - padding.right
    const display_height = props.height - margin.top - margin.bottom - padding.top - padding.bottom;

    
    //const xScale = d3.scaleLinear()
    //.domain([0,1])
    //.range([ 0,box_width ]);
    //console.log(data)

    const originalXExtent = useMemo( ()=> d3.extent(data, (d)=> d[0]) , [data]  )
    const originalYExtent = useMemo( ()=> d3.extent(data, (d)=> d[1]) , [data]  )
    

    const [xExtent,setXExtent] = useState( originalXExtent )
    const [yExtent,setYExtent] = useState( originalYExtent )


    const xScale = useMemo( () => {
        const timeXScale = d3.scaleTime().domain(xExtent).range([0,display_width]).nice() 
        return timeXScale
    } ,[xExtent]        )




    const yScale= useMemo( () => d3.scaleLinear().domain(yExtent).range([display_height,0]).nice() , [yExtent] )


    const figure = 
    <svg width={ props.width} height={props.height}  >
        <g transform={`translate(${margin.left + padding.left},${props.height - margin.bottom})`}   >
        <HAxis width={display_width} scale={ xScale}  />
        </g>

        <g transform={`translate(${margin.left},${margin.top + padding.top})`}   >
        <VAxis height={display_height} scale={ yScale}  />
        </g>

        
        <clipPath id="clip-display">
            <rect width={props.width - margin.left - margin.right} height={props.height - margin.top -margin.bottom} />
        </clipPath>

        <g transform={`translate(${margin.left},${margin.top})`} clipPath={"url(#clip-display)"} >
            <g transform={`translate(${padding.left},${padding.right})`}  style={ { "pointerEvents": "bounding-box"} } >
                <Lines data={data} xScale={xScale} yScale={yScale} />
                <Scatter data={data} xScale={xScale} yScale={yScale} /> 

              <BoxZoom xScale={xScale} setXExtent={setXExtent} width={display_width} height={display_height}  />
                

        </g>
        </g> 
 
        
    </svg>

    let t1 = new Date("2023-09-10")
    let t2 = new Date("2023-09-11")

    //const dataExtent = d3.extent(times)
    //t1=dataExtent[0]
    //t2=dataExtent[1]


    return (<>
        <div>
        {figure}
        </div>
        
        <button onClick={ (e)=>{ 
            setXExtent( originalXExtent   )  
            setYExtent( originalYExtent )
            } } > Reset </button>
    </> )

        }

}


function Scatter(props)
{
    const radius=2
    const strokeColor="gray"
    const fillColor="white"


    const markers = props.data.map( (d)=> <circle key={`${d[0]}-${d[1]}`} cx={props.xScale(d[0])} cy={props.yScale(d[1])} r={radius} strokeWidth={1} stroke={strokeColor} fill={fillColor} ></circle>  )


    return < g className="scatter" > {markers}</g>
}

function Lines(props)
{
    const colorStroke="gray"
    const strokeWidth=1

    const lc=d3.line().x( d => props.xScale(d[0])   ).y( d=> props.yScale(d[1]) )
    return <path d={lc(props.data)} stroke={colorStroke} strokeWidth={strokeWidth} fill="none"/>

}

export {Figure}

