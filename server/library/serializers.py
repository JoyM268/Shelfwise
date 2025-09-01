from .models import Library
from rest_framework import serializers
from books.serializers import BookSerializer

READING_STATUS_CHOICES = [
    ('PR', 'Plan to Read'),
    ('R', 'Reading'),
    ('F', 'Finished'),
]

class LibrarySerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = Library
        fields = ['book', 'progress', 'status_info']

class UpdateStatusSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=100, required=True)
    status = serializers.ChoiceField(choices=READING_STATUS_CHOICES, required=True)
    progress = serializers.IntegerField(default=0)

class BookIdSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=100, required=True)
    status = serializers.ChoiceField(choices=READING_STATUS_CHOICES, default="PR")