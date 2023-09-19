import requests
import random
import datetime


def send_random_perf(address,time_format,seed=10):
    "Sends to the database some uniformly distributed variables"

    for n in range(300):
        perf_value=random.random()
        
        perf_time=(datetime.datetime.now() - datetime.timedelta(hours=n) ).strftime(time_format)

        j= {"perf_name" : "benchio", "perf_value": perf_value, "perf_time" : perf_time }

        requests.post(address + r"/add",json=j )


def get_perf(address,time_format):
        from_date="2023-10-09 02:50:17"
        to_date="2023-13-09 02:50:17"
        
        perfs=requests.get(address + r"/get",params={"from":from_date,"to":to_date} ).json()



        return perfs




if __name__ == "__main__":
        time_format=r"%Y-%d-%m %H:%M:%S"
        address="http://127.0.0.1:8000/perf"
        #send_random_perf(address,seed=10,time_format=time_format=r"%Y-%d-%m %H:%M:%S")
        print(get_perf(address,time_format) )
