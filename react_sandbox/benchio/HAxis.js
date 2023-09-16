import React from "react";
import * as d3 from "d3";


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


export { HAxis }