from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.game, name="game"),
    re_path(r'^(?:.*)/?$', views.game),
]