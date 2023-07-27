from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms
from home.models import Users

class UsersForm(forms.ModelForm):
    Password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Users
        fields = ['Username', 'Password', 'Email']


