import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import { perfChart, Figure } from "./benchio/benchio.js";

import App from "./react_app.js";
import * as d3 from "d3";


const domNode= document.getElementById("chart_control")
const root = createRoot(domNode)
root.render( <App/>)

const data = await d3.csv("benchio.csv")


const fig = new Figure()
const chart = new perfChart(data,fig)

  //chart.xlim("2023-07-16 09:52:00","2023-07-30 09:52:00")
