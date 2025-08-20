from django.urls import path
from .views import getBookDetails

urlpatterns = [
    path('books/<str:bookId>/', getBookDetails.as_view()),
]
