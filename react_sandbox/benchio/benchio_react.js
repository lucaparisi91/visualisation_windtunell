import React from "react";
import * as d3 from "d3";

import {useMemo, useState} from 'react';

const n = 100

const times = [...Array(n).keys()].map( i => 
   new Date(Date.now() - i * 60*60*1000)
).sort( (a,b) => a.getTime() - b.getTime() )
//console.log(times)

const data=times.map( t => [ t ,     Math.random()] )



function Figure( props    )
{
    const margin = {top: 10, right: 30, bottom: 30, left: 30}
    const padding = { top : 10, right: 10, bottom: 20,left : 30 }

    const display_width = props.width - margin.left - margin.right - padding.left - padding.right
    const display_height = props.height - margin.top - margin.bottom - padding.top - padding.bottom;

    
    //const xScale = d3.scaleLinear()
    //.domain([0,1])
    //.range([ 0,box_width ]);


    const originalXExtent = useMemo( ()=> d3.extent(times) , []  )
    const originalYExtent = [0,1]

    const [xExtent,setXExtent] = useState( originalXExtent )
    const [yExtent,setYExtent] = useState( originalYExtent )


    const xScale = useMemo( () => {
        const timeXScale = d3.scaleTime().domain(xExtent).range([0,display_width]).nice() 
        return timeXScale
    } ,[xExtent]        )




    const yScale= useMemo( () => d3.scaleLinear().domain(yExtent).range([display_height,0]).nice() , [yExtent] )


    
    
    const [zoomBox,setZoomBox ] = useState( { left: 0, top:0, width: 0 , height: display_height, display : false} )



    const handleZoomMouseDown= (e)=>{
       
        const left= e.clientX - e.target.getBoundingClientRect().left
        //const top = e.clientY - e.target.getBoundingClientRect().top
        
        //console.log( yScale.invert(top))
        setZoomBox( {...zoomBox,left: left,display:true,width:0, top: 0 } )

    }

    const handleZoomMouseMove = (e) =>{

        if (zoomBox.display)
        {
            const x = e.clientX - e.target.getBoundingClientRect().left
            //const y = e.clientY - e.target.getBoundingClientRect().top


            const width = x - zoomBox.left
            //const height = y - zoomBox.top


           
            setZoomBox( {...zoomBox, width: width }  )

            
        }
        
    }

    const handleZoomMouseUp = (e) =>{

        if (zoomBox.display)
        {
            const minWindowSize = 10 
            if ( Math.abs(zoomBox.width) >= minWindowSize )
            {
                const left = d3.min([zoomBox.left,zoomBox.left + zoomBox.width])
                const right = left + Math.abs(zoomBox.width)
                const newExtent = [ xScale.invert( left ) , xScale.invert( right) ]
                //console.log(newExtent)
                setXExtent(newExtent)
            }
            
            setZoomBox( {...zoomBox, width: 0, display: false }  )

        }
        
    }

    const handleZoomMouseOut = (e) => {
        if (zoomBox.display)
        {   
            setZoomBox( {...zoomBox, display: false , width: 0 , height:0} )
        }

    }
    


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

                <rect transform={`translate( ${ d3.min([zoomBox.left,zoomBox.left + zoomBox.width])},${ zoomBox.top })`} width={Math.abs(zoomBox.width) } height={Math.abs(zoomBox.height)} opacity={0.2}  />
                <rect width={display_width} height={display_height} onMouseDown={ handleZoomMouseDown } onMouseMove={handleZoomMouseMove} onMouseUp={handleZoomMouseUp} onMouseOut={ handleZoomMouseOut } visibility={"hidden"}  />
                

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


function HAxis ( props )
{
    const width = props.width
    const scale= props.scale
    const tickHeight= 10
    const color="black"
    const nTicks=6


            const parseTime = (d) => d.toLocaleString('default', { month: 'short', day: 'numeric',hour:'numeric',hour12:true })

            const verticalThick = <path d={`M0 0 v${tickHeight}`} stroke={`black`}    />
            const markers= scale.ticks(nTicks).map( 
        xth => <g className="marker" key={xth} transform={`translate(${scale(xth)},0) `}>
            {verticalThick}
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
            {verticalThick }
        </g>
    </g>)

}


function VAxis ( props )
{
    const height = props.height
    const scale= props.scale
    const tickWidth= 10
    const color="black"
    const nTicks=6
    const fontSize=10

    const horizontalTick = <path d={`M0 0 h${-tickWidth}`} stroke={`black`}    />
    
    const markers= scale.ticks(nTicks).map( 
        yth => <g className="marker" key={yth} transform={`translate(0,${scale(yth)}) `}>
            {horizontalTick}
            <text transform={`translate(${ - (tickWidth + fontSize)},${fontSize/4.})`} key={yth} style={{
        fontSize: `${fontSize}px`,
        textAnchor : "middle"
    }} >
        
       {  yth}      
            </text>
            
             
            </g>
    )
    

    return (<g >
        <path d={`M0 0 v ${height}`} stroke={color}>
        </path>
        <g className = "ticks">
            {markers}
            {horizontalTick }
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

