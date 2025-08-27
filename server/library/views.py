import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Library
from .serializers import LibrarySerializer

def create_categories_list(category):
    return category.get("name")

def filter_book_details(book):
    book_details = book.get("book", {})
    categories = map(create_categories_list, book_details.get("categories", []))
    return {
        "id": book_details.get("book_id"),
        "title": book_details.get("title"),
        "description": book_details.get("description"),
        "authors": book_details.get("authors", []),
        "publisher": book_details.get("publisher"),
        "publishedDate": book_details.get("published_date"),
        "isbn": book_details.get("isbn"),
        "categories": categories,
        "pageCount": book_details.get("page_count"),
        "averageRating": book_details.get("average_rating"),
        "ratingsCount": book_details.get("rating_count"),
        "language": book_details.get("language"),
        "dimensions": {
            "height": book_details.get("height"),
            "width": book_details.get("width"),
            "thickness": book_details.get("thickness"),
        },
        "status": book.get("status_info"),
        "imageLinks": {
            "smallThumbnail": book_details.get("small_thumbnail"),
            "thumbnail": book_details.get("thumbnail")
        }
    }

class UserBooks(APIView):
    def get(self, request):
        try:
            instance = Library.objects.filter(user=request.user)
            data = LibrarySerializer(instance, many=True).data
            filtered_data = map(filter_book_details, data)
            return Response(filtered_data, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"error": "An unexpected error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

