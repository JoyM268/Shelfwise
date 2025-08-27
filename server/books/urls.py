from django.urls import path
from .views import GetBookDetails, GetBooksByGenre, GetTopBooks, GetBooksByQuery

urlpatterns = [
    path('books/genre/', GetBooksByGenre.as_view()),
    path('books/top/', GetTopBooks.as_view()),
    path('books/<str:bookId>/', GetBookDetails.as_view()),
    path('books/', GetBooksByQuery.as_view())
]
