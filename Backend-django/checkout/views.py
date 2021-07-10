from django.shortcuts import render
from rest_framework import generics, status

from .models import (
    ProductCheckout,
    CartCheckout
)

from .serializers import (
    ProductCheckoutSerializer,
    ProductCheckoutAdminSerializer,
    CartCheckoutSerializer,
    CartCheckoutAdminSerializer,
    ProductCheckoutEditSerializer,
    CartCheckoutEditSerializer
)
from rest_framework import permissions
from rest_framework.response import Response
from .permissions import AdminOnly


# Create your views here.
class ProductCheckoutView(generics.ListCreateAPIView):
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            product_checkouts = ProductCheckout.objects.all()

        else:
            product_checkouts = user.productcheckout_set.all()
        return product_checkouts

    def get_serializer_class(self):
        user = self.request.user
        if user.is_superuser:
            return ProductCheckoutAdminSerializer

        return ProductCheckoutSerializer

    permission_classes = [permissions.IsAuthenticated]


class CartCheckoutView(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            cart_checkouts = CartCheckout.objects.all()
        else:
            cart_checkouts = user.cartcheckout_set.all()

        return cart_checkouts

    def get_serializer_class(self):
        user = self.request.user

        if user.is_superuser:
            return CartCheckoutAdminSerializer

        return CartCheckoutSerializer

    permission_classes = [permissions.IsAuthenticated]


class ProductCheckoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCheckout.objects.all()
    serializer_class = ProductCheckoutEditSerializer
    permission_classes = [AdminOnly]


class CartCheckoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartCheckout.objects.all()
    serializer_class = CartCheckoutEditSerializer
    permission_classes = [AdminOnly]
