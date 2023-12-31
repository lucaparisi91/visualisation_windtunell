from django.db import models

class perfVar(models.Model):
    perf_name = models.CharField(max_length=200, null=False )
    perf_value = models.FloatField()
    perf_time = models.DateTimeField()


    def __str__(self):
        return f"{self.perf_name},{self.perf_value},{self.perf_time} "
    

class perfBenchmark( models.Model):
    name = models.CharField( max_length=200,null=False)

    class Meta:
        constraints=[models.UniqueConstraint(fields=["name"],name="unique_name") ]

    def __str__(self):
        return f"{self.name}"