import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import { perfChart, Figure } from "./benchio/benchio.js";

import App from "./react_app.js";
import * as d3 from "d3";


const domNode= document.getElementById("chart_control")
const root = createRoot(domNode)

const data = await d3.csv("benchio_unstriped_hdf5_all_filesystems.csv")
const dataGrouped= d3.group( data, (d) => d.name )


const fig = new Figure()
const chart = new perfChart( dataGrouped ,fig)


root.render( <App onDateChange= { (time1,time2) => { 
    chart.xlim(time1,time2)
     } } />)

dataGrouped.forEach( (value,key) => {console.log(value)} )


