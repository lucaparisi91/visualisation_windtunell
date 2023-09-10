import React from "react";
import * as d3 from "d3";





function Figure( props    )
{
    const margin = {top: 10, right: 30, bottom: 30, left: 60}
    const box_width = props.width - margin.left - margin.right
    const box_height = props.height - margin.top - margin.bottom;

    const n = 100

    const times = [...Array(n).keys()].map( i => 
       new Date(Date.now() - i * 60*60*1000)
    ).sort( (a,b) => a.getTime() - b.getTime() )
    console.log(times)

    const data=times.map( t => [ t ,     Math.random()] )


    
    //const xScale = d3.scaleLinear()
    //.domain([0,1])
    //.range([ 0,box_width ]);

    const xScale=d3.scaleTime().domain(d3.extent(times)).range([0,box_width]).nice()


    const yScale=d3.scaleLinear().domain([0,1]).range([box_height,0])



    return ( 
    <svg width={ props.width} height={props.height}  >
        <g transform={`translate(${margin.left},${props.height - margin.bottom})`}   >
        <HAxis width={box_width} scale={ xScale}  />
        </g>
        
        <clipPath id="clip-display">
            <rect width={box_width} height={box_height} />
        </clipPath>

        <g transform={`translate(${margin.left},${margin.top})`} clipPath={"url(#clip-display)"} >
        <Lines data={data} xScale={xScale} yScale={yScale} />
        <Scatter data={data} xScale={xScale} yScale={yScale} /> 
        </g> 
 
        
    </svg>
    )

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

