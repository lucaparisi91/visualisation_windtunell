"use strict";

import * as d3 from 'd3'




const linspace = function( a,b , n = 10 )
{
    let x = d3.range( n )
    x = x.map( (i) => a + i*(b-a)/(n-1) )
    return x
}

export const getWingShape=function( )
{
    const x = linspace(0,1, 20 )
    const yUp=x.map ( (x) => Math.sqrt(1-x*x) )
    const yDown=x.map ( (x) => - Math.sqrt(1-x*x) )
    const dataDown= yDown.map( (y,i) => [x[i] , y]   )
    const dataUp= yUp.map( (y,i) => [x[i] , y]   )
    return dataDown.concat(dataUp.reverse())
}