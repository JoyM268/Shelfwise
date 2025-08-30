from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers, validators
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['name'] = user.name
        return token


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    username = serializers.CharField(validators=[validators.UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'name']

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], name = validated_data['name'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    