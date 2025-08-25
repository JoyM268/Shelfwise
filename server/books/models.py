from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    published_date = models.CharField(max_length=20, null=True, blank=True)
    isbn = models.CharField(max_length=13, unique=True, null=True, blank=True)
    page_count = models.PositiveIntegerField(default=0)
    height = models.CharField(max_length=10, null=True, blank=True)
    width = models.CharField(max_length=10, null=True, blank=True)
    thickness = models.CharField(max_length=10, null=True, blank=True)
    average_rating = models.FloatField(default=0.0)
    rating_count = models.PositiveIntegerField(default=0)
    small_thumbnail = models.URLField(max_length=500, null=True, blank=True)
    thumbnail = models.URLField(max_length=500, null=True, blank=True)  
    language = models.CharField(max_length=30, default="English")
    categories = models.ManyToManyField(Category, related_name="books")

    def __str__(self):
        return self.title