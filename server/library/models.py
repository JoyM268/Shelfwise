from django.db import models
from user.models import User
from books.models import Book

class Library(models.Model):
    READING_STATUS_CHOICES = [
        ('PR', 'Plan to Read'),
        ('R', 'Reading'),
        ('F', 'Finished'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="library")
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=2, choices=READING_STATUS_CHOICES, default="PR")
    added_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} | {self.book.title}"
    
    def status_info(self):
        return dict(self.READING_STATUS_CHOICES)[self.status]
