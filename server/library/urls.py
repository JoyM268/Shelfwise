from django.urls import path
from .views import UserBooks

urlpatterns = [
    path('library/', UserBooks.as_view()),
]
