import React, { useEffect, useMemo, useState } from "react";
import { Figure } from "./benchio_react.js";
import { TimeRange } from "./TimeRange.js";
import * as d3 from "d3";
import dayjs, { Dayjs } from 'dayjs';

const parseTime=function( time )
{
  const format = d3.timeParse("%Y-%d-%m %H:%M:%S")
  return format(time)

}

const formatTime=( t) =>
{
    return dayjs(t).format("YYYY-DD-MM HH:mm:ss")

}

const updateData = ( async ( setData,dataRange)=>   {


    const from_date=formatTime(dataRange[0])
    const to_date=formatTime( dataRange[1]   )

    const response = await fetch("http://localhost:8000/perf/get?" + new URLSearchParams( {
        from : from_date,
        to : to_date
    }),{method: "get"});
    let newData = await response.json()
    newData = newData.map ( d => [ parseTime(d["perf_time"]),parseFloat(d["perf_value"]) ] )
    console.log(newData)
    setData(newData)

} )


function PerfVis( )
{
    const getDefaultDateRange = () =>{
        const toDate = new Date( Date.now() )
        const fromDate= new Date( Date.now() )
        fromDate.setMonth( fromDate.getMonth() -1 )
    
        return [ fromDate,toDate ]
    
    }



    const [ data, setData] = useState(null)
    const [ dateRange, setDateRange ] = useState(getDefaultDateRange())

    
    useEffect(
       () => {updateData(setData,dateRange)} , [dateRange]
    )

    const handleDateRangeChange = ( newDateRange )=>
    {
        //console.log( newDateRange)
        setDateRange(newDateRange)
    }

    //console.log(data)
    return (
        <div>

        <Figure width={800} height={400} data={data}  >
    
        </Figure>


        < TimeRange dateRange={ dateRange } onTimeRangeChange={handleDateRangeChange} />

        </div>
    )
    

}

export { PerfVis }