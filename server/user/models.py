from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = None
    last_name = None
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name