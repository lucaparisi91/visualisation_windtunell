from django.http import HttpResponse,JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from .serializers import perfVarSerializer
from .models import perfVar

def index(request):
    return HttpResponse("Hello, world. You're at the perf index.")

@csrf_exempt
def add_performance(request):


    if request.method=="POST":
        print("POST")
        data = JSONParser().parse(request)
        serializer = perfVarSerializer(data=data)
        if serializer.is_valid():
            print("is valid")
            print(serializer.save().save() )
            return JsonResponse( serializer.data,status=201  )
        else:
            print("is not valid")
            return JsonResponse(serializer.errors,status=400)
    elif request.method=="GET":

        perf_data=perfVar.objects.all()
        serializer = perfVarSerializer(perf_data, many=True)
        return JsonResponse(serializer.data, safe=False)

        


