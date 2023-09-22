from rest_framework import serializers
from .models import perfVar
from .models import perfBenchmark

time_format=r"%Y-%d-%m %H:%M:%S"

class perfRequestSerializer(serializers.Serializer):
    from_date=serializers.DateTimeField(format=time_format,input_formats=[time_format])
    to_date=serializers.DateTimeField(format=time_format,input_formats=[time_format])
    

class perfVarSerializer(serializers.ModelSerializer):

    perf_time = serializers.DateTimeField(format=time_format,required=True,input_formats=[time_format])

    class Meta:
        model = perfVar
        fields=['perf_name','perf_value','perf_time']

class perfBenchmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = perfBenchmark
        fields = [ "name" ]
    