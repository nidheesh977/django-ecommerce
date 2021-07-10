from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Cart
from .serializers import CartSerializer, CartAdminSerializer
from .permissions import OwnerOrAdmin

class CartList(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            carts = Cart.objects.all()

        else:
            carts = Cart.objects.filter(buyer = user, checked_out = False)
        return carts
    
    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return CartAdminSerializer
        return CartSerializer
        
    permission_classes = [permissions.IsAuthenticated]


class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return CartAdminSerializer
        return CartSerializer

    permission_classes = [OwnerOrAdmin]






