from django.urls import path
from .views import getBookDetails, getBooksByGenre, getTopBooks, getBooksByQuery

urlpatterns = [
    path('books/genre/', getBooksByGenre.as_view()),
    path('books/top/', getTopBooks.as_view()),
    path('books/<str:bookId>/', getBookDetails.as_view()),
    path('books/', getBooksByQuery.as_view())
]
