from django.urls import path
from .views import UserBooks, DeleteBook

urlpatterns = [
    path('library/<str:book_id>/', DeleteBook.as_view()),
    path('library/', UserBooks.as_view()),
]
