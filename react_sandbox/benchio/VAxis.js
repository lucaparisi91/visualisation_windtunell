import React from "react";
import * as d3 from "d3";


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

export {VAxis}