import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Library
from .serializers import LibrarySerializer, UpdateStatusSerializer, BookIdSerializer
from books.models import Book, Category
from django.conf import settings

api_key = settings.GOOGLE_API_KEY

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
        "total": book_details.get("page_count"),
        "status": book.get("status_info"),
        "src": book_details.get("thumbnail")
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

    def put(self, request):
        serializer = UpdateStatusSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            book_id = serializer.validated_data["id"]
            new_status = serializer.validated_data["status"]
            try:
                instance = Library.objects.get(user=request.user, book_id=book_id)
                instance.status = new_status
                instance.save()
                return Response({"message": "Status updated successfully."}, status=status.HTTP_200_OK)
            except Library.DoesNotExist:
                return Response({"error": "Book not found for this user."}, status=status.HTTP_404_NOT_FOUND)
            except Exception:
                return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    def delete(self, request):
        serializer = BookIdSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            book_id = serializer.validated_data["id"]
            try:
                instance = Library.objects.get(user=request.user, book_id=book_id)
                instance.delete()
                return Response({"message": "Book deleted successfully."}, status=status.HTTP_200_OK)
            except Library.DoesNotExist:
                return Response({"error": "Book not found for this user."}, status=status.HTTP_404_NOT_FOUND)
            except Exception:
                return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    def post(self, request):
        serializer = BookIdSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            book_id = serializer.validated_data["id"]
            status_info = serializer.validated_data["status"]
            try:
                book = Book.objects.filter(book_id=book_id).first()
                if not book:
                    base_url = request.build_absolute_uri('/').rstrip('/')
                    res = requests.get(f"{base_url}/api/books/{book_id}")
                    if res.status_code != 200:
                        return Response({"error": "Book not Found"}, status=status.HTTP_404_NOT_FOUND)
                    data = res.json()

                    dimensions = data.get("dimensions")
                    height = None if not dimensions else dimensions.get("height")
                    width = None if not dimensions else dimensions.get("width")
                    thickness = None if not dimensions else dimensions.get("thickness")

                    image_links = data.get("imageLinks")
                    small_thumbnail = None if not image_links else image_links.get("smallThumbnail")
                    thumbnail = None if not image_links else image_links.get("thumbnail")

                    category_names = data.get("categories", [])
                    categories = []
                    for name in category_names:
                        category, created = Category.objects.get_or_create(name=name)
                        categories.append(category)

                    book = Book.objects.create(
                        book_id=book_id, 
                        title=data.get("title"), 
                        authors=data.get("authors", []),
                        publisher=data.get("publisher"),
                        published_date = data.get("publishedDate"),
                        isbn=data.get("isbn"),
                        page_count=data.get("pageCount"),
                        height=height,
                        width=width,
                        thickness=thickness,
                        average_rating=data.get("averageRating"),
                        rating_count=data.get("ratingsCount"),
                        small_thumbnail=small_thumbnail,
                        thumbnail=thumbnail,
                        language=data.get("language")
                    )
                    book.categories.set(categories)

                instance = Library.objects.create(book=book, user=request.user, status=status_info)
                return Response({"message": "Book added successfully."}, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)