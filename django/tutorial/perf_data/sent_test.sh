#!/bin/bash
curl -X POST -d '
{
    "perf_name":"benchio",
    "perf_value" : 9,
    "perf_time" : "2023-20-10 19:26:00"
}' http://127.0.0.1:8000/perf/add





