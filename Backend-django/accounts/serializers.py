from rest_framework import serializers
from .models import Address, Account
from django.contrib.auth.models import User

class AccountEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["name", "age", "image"]

class AccountCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get('request')

        account = Account()
        account.owner = request.user
        account.name = validated_data["name"]
        account.age = validated_data["age"]

        try:
            account.image = validated_data["image"]
        except:
            pass

        account.save()
        return account



    class Meta:
        model = Account
        exclude = ["owner"]

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class AdminUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name", "is_active", "is_staff", "is_superuser",  "last_login", "date_joined"]
        extra_kwargs = {"password": {"write_only":True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

class AdminUserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "is_active", "is_staff", "is_superuser", "last_login", "last_login", "date_joined"]

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)

        instance.save()
        return instance


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only":True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        Account.objects.create(owner = instance, name = instance.username)
        return instance

