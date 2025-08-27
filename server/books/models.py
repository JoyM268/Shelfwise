from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    book_id = models.CharField(max_length=100, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    authors = models.JSONField(default=list, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    published_date = models.CharField(max_length=20, null=True, blank=True)
    isbn = models.CharField(max_length=13, unique=True, null=True, blank=True)
    page_count = models.PositiveIntegerField(default=0)
    height = models.CharField(max_length=10, null=True, blank=True)
    width = models.CharField(max_length=10, null=True, blank=True)
    thickness = models.CharField(max_length=10, null=True, blank=True)
    average_rating = models.FloatField(default=0.0, null=True)
    rating_count = models.PositiveIntegerField(default=0, null=True)
    small_thumbnail = models.URLField(max_length=500, null=True, blank=True)
    thumbnail = models.URLField(max_length=500, null=True, blank=True)  
    language = models.CharField(max_length=30, default="English")
    categories = models.ManyToManyField(Category, related_name="books", blank=True)

    def __str__(self):
        return self.title