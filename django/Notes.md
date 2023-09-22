## API Interface

Time string format: `"%Y-%d-%m %H:%M:%S"`

- perf/get
  - GET with parameters from:`time string`, to:`time string`
- perf/add
  - POST , json data { perf_name:string ,perf_time:time string, perf_value: float }

## Django notes

- tests.py is incompatible with a subdirectory with the name tests in the same folder
- Django will create an empty development server during testing, different from the live database server
- Use transaction `atomic` when triggering exceptions in testing

## Diary



