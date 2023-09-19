## API Interface

Time string format: `"%Y-%d-%m %H:%M:%S"`

- perf/get
  - GET with parameters from:`time string`, to:`time string`
- perf/add
  - POST , json data { perf_name:string ,perf_time:time string, perf_value: float }
