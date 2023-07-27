from django.db import models
# Create your models here.


class Users(models.Model):

    Username = models.CharField(verbose_name='username',max_length=30,unique=True)
    Password = models.CharField(verbose_name='password',max_length=120)
    Email  = models.CharField(verbose_name='email address',max_length=255,unique=True)

