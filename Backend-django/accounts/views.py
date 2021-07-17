from django.shortcuts import render, get_object_or_404
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from .models import Account, Address
from .serializers import AddressSerializer, CreateUserSerializer, AdminUserCreateSerializer, AdminUserEditSerializer, AccountCreateSerializer, AccountEditSerializer
from .permissions import OwnerOnly, AdminOnly
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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

class Register(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserCreateSerializer
    permission_classes = [AdminOnly]

class UserEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserEditSerializer
    permission_classes = [AdminOnly]