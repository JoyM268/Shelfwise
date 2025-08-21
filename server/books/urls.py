from django.urls import path
from .views import getBookDetails, getBooksByGenre, getRecentBooks, getBooksByQuery

urlpatterns = [
    path('books/genre/', getBooksByGenre.as_view()),
    path('books/recent/', getRecentBooks.as_view()),
    path('books/<str:bookId>/', getBookDetails.as_view()),
    path('books/', getBooksByQuery.as_view())
]
