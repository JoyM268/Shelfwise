import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pycountry
from django.conf import settings
from library.models import Library
from library.serializers import LibrarySerializer
from django.core.cache import cache

api_key = settings.GOOGLE_API_KEY

def filter_book_details(book):
    details = book.get("volumeInfo", {})
    return {
        "id": book.get("id"),
        "src": details.get("imageLinks"),
        "title": details.get("title"),
        "authors": details.get("authors")
    }

def create_categories_list(category):
    return category.get("name")

class GetBookDetails(APIView):
    def get(self, request, bookId):
        cache_key = f"id:{bookId}"
        cached_results = cache.get(cache_key)
        if cache_key:
            return Response(cached_results, status=status.HTTP_200_OK)
        url = f"https://www.googleapis.com/books/v1/volumes/{bookId}?key={api_key}"
        try:
            res = requests.get(url)

            if res.status_code == 200:
                data = res.json()
                details = data.get("volumeInfo", {})

                categories = set()
                raw_categories = details.get("categories", [])
                if raw_categories:
                    for category in raw_categories:
                        for genre in category.split("/"):
                            categories.add(genre.strip())

                isbn = None
                industryIdentifiers = details.get("industryIdentifiers", [])
                if industryIdentifiers:
                    if len(industryIdentifiers) == 1:
                        isbn = industryIdentifiers[0]["identifier"] 
                    elif industryIdentifiers[0]["type"] == "ISBN_13":
                        isbn = industryIdentifiers[0]["identifier"] 
                    else:
                        isbn = industryIdentifiers[1]["identifier"] 

                language_name = None
                code = details.get("language")
                if code:
                    try:
                        language = pycountry.languages.get(alpha_2=code)
                        language_name = getattr(language, 'common_name', language.name)
                    except:
                        language_name = code

                status_value = None
                try:
                    instance = Library.objects.get(user=request.user, book_id=bookId)
                    data = LibrarySerializer(instance=instance).data
                    status_value = data["status_info"]
                    progress = data["progress"]
                except:
                    status_value = None
                    progress = None

                bookDetails = {
                    "id": data.get("id"),
                    "title": details.get("title"),
                    "authors": details.get("authors", []),
                    "publisher": details.get("publisher"),
                    "publishedDate": details.get("publishedDate"),
                    "description": details.get("description"),
                    "isbn": isbn,
                    "pageCount": details.get("pageCount"),
                    "dimensions": details.get("dimensions"),
                    "categories": list(categories),
                    "averageRating": details.get("averageRating"),
                    "ratingsCount": details.get("ratingsCount"),
                    "imageLinks": details.get("imageLinks"),
                    "language": language_name,
                    "status": status_value,
                    "progress": progress
                }

                cache.set(cache_key, bookDetails, timeout=60*60*24)

                return Response(bookDetails, status=status.HTTP_200_OK)
            elif res.status_code == 404 or res.status_code == 503:
                return Response({"error": "Book not found. Invalid ID."}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(
                    {"error": "Failed to retrieve book data from Google Books."},
                    status=res.status_code
                )
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": f"Could not connect to the Google Books API: {e}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

class GetBooksByGenre(APIView):
    def get(self, request):
        search_query = self.request.query_params.get('q', None)
        if search_query:
            genre = search_query if " " not in search_query else f"\"{search_query}\""
            cache_key = f"genre:{genre}"
            cached_results = cache.get(cache_key)
            if cached_results:
                return Response(cached_results, status=status.HTTP_200_OK)
            url = f"https://www.googleapis.com/books/v1/volumes?q=subject:{genre}&maxResults=40&key={api_key}"
            try:
                res = requests.get(url)
                if res.status_code == 200:
                    data = res.json()

                    if data.get("totalItems") == 0:
                        return Response({"error": "Invalid Genre."}, status=status.HTTP_404_NOT_FOUND)
                    
                    bookList = data.get("items", [])
                    newBookList = map(filter_book_details, bookList)
                    cache.set(cache_key, newBookList, timeout=604800)
                    return Response(newBookList, status=status.HTTP_200_OK)
                elif res.status_code == 400:
                    return Response({"error": "Invalid Genre."}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(
                        {"error": "Failed to retrieve books from Google Books."},
                        status=res.status_code
                    )
            except requests.exceptions.RequestException as e:
                return Response(
                {"error": f"Could not connect to the Google Books API: {e}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        else:
            return Response({"error": "Required parameter: q"}, status=status.HTTP_400_BAD_REQUEST)
        
class GetTopBooks(APIView):
    def get(self, request):
        cache_key = f'genre:"science fiction"'
        cached_results = cache.get(cache_key)
        if cached_results:
            return Response(cached_results, status=status.HTTP_200_OK)
        url = f"https://www.googleapis.com/books/v1/volumes?q=subject:\"science fiction\"&maxResults=40&key={api_key}"
        try:
            res = requests.get(url)
        
            if res.status_code == 200:
                data = res.json()
                bookList = data.get("items", [])
                newBookList = map(filter_book_details, bookList)
                cache.set(cache_key, newBookList, timeout=604800)
                return Response(newBookList, status=status.HTTP_200_OK)
            else:
                return Response(
                        {"error": "Failed to retrieve books from Google Books."},
                        status=res.status_code
                    )
        except requests.exceptions.RequestException as e:
                return Response(
                {"error": f"Could not connect to the Google Books API: {e}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
class GetBooksByQuery(APIView):
    def get(self, request):
        search_query = self.request.query_params.get('q', None)
        if search_query:
            title = search_query if " " not in search_query else f"\"{search_query}\""
            cache_key = f"query:{title}"
            cached_data = cache.get(cache_key)
            if cached_data:
                return Response(cached_data, status=status.HTTP_200_OK)
            url = f"https://www.googleapis.com/books/v1/volumes?q={title}&maxResults=40&key={api_key}"
            
            try:
                res = requests.get(url)
                if res.status_code == 200:
                    data = res.json()
                    
                    if data.get("totalItems") == 0:
                        return Response({"error": "Book Not Found"}, status=status.HTTP_404_NOT_FOUND)
                                 
                    bookList = data.get("items", [])
                    newBookList = map(filter_book_details, bookList)
                    cache.set(cache_key, newBookList, timeout=60*60*24)
                    return Response(newBookList, status=status.HTTP_200_OK)
                elif res.status_code == 400:
                    return Response({"error": "Book Not Found"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(
                            {"error": "Failed to retrieve books from Google Books."},
                            status=res.status_code
                        )
            except requests.exceptions.RequestException as e:
                return Response(
                {"error": f"Could not connect to the Google Books API: {e}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        else:
            return Response({"error": "Required parameter: q"}, status=status.HTTP_400_BAD_REQUEST)
