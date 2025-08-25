from django.db import models
from user.models import User
from books.models import Book
# Create your models here.
    

class Library(models.Model):
    READING_STATUS_CHOICES = [
        ('PR', 'Plan To Read'),
        ('R', 'Reading'),
        ('C', 'Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="library")
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=2, choices=READING_STATUS_CHOICES, default="PR")
    added_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} | {self.book.title}"
