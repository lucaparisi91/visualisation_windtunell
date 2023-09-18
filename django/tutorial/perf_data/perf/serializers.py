from rest_framework import serializers
from .models import perfVar


class perfVarSerializer(serializers.ModelSerializer):
    perf_time = serializers.DateTimeField(format=r"%d/%m/%Y",required=True,input_formats=[r"%d/%m/%Y"])

    class Meta:
        model = perfVar
        fields=['perf_name','perf_value','perf_time']
