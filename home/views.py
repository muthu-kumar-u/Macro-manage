from django.urls import reverse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib import auth
from django.contrib import messages
from home.forms import UserRegistrationForm
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse,HttpResponseRedirect,HttpResponse
import json

def home(request):
    user = request.user

    username = user.username
    return render(request,'home.html',{'username':username})

def register(request):
    user = request.user

    username = user.username

    if request.method == 'POST':
       username = request.POST['username']
       user_email = request.POST.get('email')
       password = request.POST.get('password')

       form = UserRegistrationForm(request.POST)
       if form.is_valid():
           form.save()
           username = form.cleaned_data.get('username')
           messages.success(request,f'Hi {username},  You are successfully create your account')
           return redirect('home:home',{'username':username})
       else:
           print(form.errors)
           messages.error(request,'Please enter the correct details')
           return redirect('home:register')       
    else:   
       form = UserRegistrationForm()
       return render(request,'register.html',{'form':form})


def logout(request):
    user = request.user
    
    username = user.username
    auth.logout(request)
    return render(request,'logout.html',{'username':username})


@login_required()
def profile(request):
    user = request.user

    username = user.username
    email = user.email
    return render(request, 'profile.html', {'username': username, 'email': email})

def about(request):
    return render(request,'about.html')

def error_404(request):
    return render(request,'404.html')

