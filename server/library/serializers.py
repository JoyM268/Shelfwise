from .models import Library
from rest_framework import serializers
from books.serializers import BookSerializer

class LibrarySerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = Library
        fields = ['book', 'status_info']