from django.shortcuts import render, get_object_or_404
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from .models import Account, Address
from .serializers import AddressSerializer, CreateUserSerializer, AdminUserCreateSerializer, AdminUserEditSerializer, AccountCreateSerializer, AccountEditSerializer
from .permissions import OwnerOnly, AdminOnly
from django.contrib.auth.models import User
from rest_framework.views import APIView
# Create your views here.

class AccountCreate(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

class Account(generics.RetrieveUpdateAPIView):
    queryset = Account.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        account = get_object_or_404(queryset, owner = self.request.user)
        return account

    serializer_class = AccountEditSerializer
    permission_classes = [OwnerOnly, permissions.IsAuthenticated]


class AddressList(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        address = user.address_set.all()
        return address

    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]


class AddressEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [OwnerOnly]

class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]

class Logout(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

        except:
            return Response(status = status.HTTP_400_BAD_REAQUEST)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserCreateSerializer
    permission_classes = [AdminOnly]

class UserEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserEditSerializer
    permission_classes = [AdminOnly]
    