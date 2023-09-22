from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("add", views.add_performance, name="perf_add"),
    path("get",view=views.get_performance,name="perf_get")

]