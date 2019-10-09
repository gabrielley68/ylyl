from django.urls import path, include
from django.shortcuts import redirect
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(redirect_authenticated_user=True), name="login"),
    path('logout/', auth_views.LogoutView.as_view(), name="logout"),
    path('', lambda request: redirect('login/', permanent=False)),  # default page => /login
    path('register/', views.register, name="register")
]
