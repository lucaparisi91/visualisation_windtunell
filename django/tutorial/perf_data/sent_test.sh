#!/bin/bash
curl -X POST -d '
{
    "perf_name":"benchio",
    "perf_value" : 3,
    "perf_time" : "03/09/2023" 
}' http://127.0.0.1:8000/perf/add
