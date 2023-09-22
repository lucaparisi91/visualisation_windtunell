from django.http import HttpResponse,JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from .serializers import perfVarSerializer, perfRequestSerializer
import datetime

from .models import perfVar

time_format = r"%Y-%d-%m %H:%M:%S"


def index(request):
    return HttpResponse("Hello, world. You're at the perf index.")


def get_performance(request):
    
    if request.method == "GET":

        from_date = request.GET.get('from',datetime.datetime.now() - datetime.timedelta(days=30))
        to_date = request.GET.get('to',datetime.datetime.now() )
        perf_data_selection=None
       

        
        if (from_date is not None or to_date is not None):
            s=perfRequestSerializer(data={"from_date":from_date , "to_date": to_date}
                                )
            if s.is_valid():
                print (s.validated_data)
                perf_data_selection=perfVar.objects.filter( perf_time__gte= s.validated_data["from_date"]  )
                perf_data_selection=perf_data_selection.filter( perf_time__lte= s.validated_data["to_date"]  )
                print(perf_data_selection.all())

            else:
                return JsonResponse(s.errors,safe=False)
            
        else:
            perf_data_selection=perfVar.objects.all()


        serializer = perfVarSerializer(perf_data_selection, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"error":"only GET requests are allowed"},safe=False,status=400)



@csrf_exempt
def add_performance(request):
        if request.method == "POST":

            data = JSONParser().parse(request)
            serializer = perfVarSerializer(data=data)
            if serializer.is_valid():
                print("is valid")
                print(serializer.save().save() )
                return JsonResponse( serializer.data,status=201  )
            else:
                print("is not valid")
                return JsonResponse(serializer.errors,status=400)
        else:
            return JsonResponse({"error":"only POST requests are allowed"},safe=False,status=400)

    
   

