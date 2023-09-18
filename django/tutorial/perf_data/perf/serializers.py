from rest_framework import serializers
from .models import perfVar
class perfVarSerializer(serializers.Serializer):
    
    perf_name = serializers.CharField(max_length=200,required=True )
    perf_value = serializers.FloatField( required=True )
    perf_time = serializers.CharField( max_length=200,required=True)
    
    def create(self,validated_data):
        return perfVar(**validated_data)
    