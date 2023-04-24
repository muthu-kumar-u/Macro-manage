from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=200,help_text="Email should be unique")

    class Meta:
        model = User
        fields = ['username','email','password1','password2']

