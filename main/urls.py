# pylint: disable=invalid-name
from django.urls import path

from main import views


urlpatterns = [
    path('', views.index, name='index'),
    path('cookie-policy', views.cookie_policy, name='cookie_policy'),
]
