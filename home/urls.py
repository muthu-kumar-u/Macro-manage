from django.urls import path
from django.contrib.auth import views as auth_view
from .views import home,register,logout,profile,about,error_404

app_name = 'home'

urlpatterns = [

    path('',home,name="home"),
    path('about/',about,name="about"),
    path('error_404/',error_404,name="error_404"),
    path('register/',register,name="register"),
    path('profile/',profile,name="profile"),    path('login/',auth_view.LoginView.as_view(template_name = 'login.html'),name='login',),
    path('logout/',logout,name="logout"),

]