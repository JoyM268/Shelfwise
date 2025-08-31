from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    book_id = models.CharField(max_length=100, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    authors = models.JSONField(default=list, blank=True)
    page_count = models.PositiveIntegerField(default=0)
    thumbnail = models.URLField(max_length=500, null=True, blank=True)
    categories = models.ManyToManyField(Category, related_name="books", blank=True)

    def __str__(self):
        return self.title