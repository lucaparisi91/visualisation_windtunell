import React from "react";
import * as d3 from "d3";
import {useMemo, useState} from 'react';

function BoxZoom( { xScale,setXExtent, width,height} )
{


    const [zoomBox,setZoomBox ] = useState( { left: 0, top:0, width: 0 , height: height, display : false} )


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
            setZoomBox( {...zoomBox, display: false , width: 0 } )
        }

    }

    return (
        <>
    <rect transform={`translate( ${ d3.min([zoomBox.left,zoomBox.left + zoomBox.width])},${ zoomBox.top })`} width={Math.abs(zoomBox.width) } height={Math.abs(zoomBox.height)} opacity={0.2}  />
    <rect width={width} height={height} onMouseDown={ handleZoomMouseDown } onMouseMove={handleZoomMouseMove} onMouseUp={handleZoomMouseUp} onMouseOut={ handleZoomMouseOut } visibility={"hidden"}  />
    
    </>
    )

}


export {BoxZoom }