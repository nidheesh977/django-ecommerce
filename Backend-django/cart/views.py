from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Cart
from .serializers import CartSerializer, CartAdminSerializer
from products.serializers import ProductSerializer
from .permissions import OwnerOrAdmin
from products.models import Product

class CartList(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            carts = Cart.objects.all().order_by("-id")

        else:
            carts = Cart.objects.filter(buyer = user, checked_out = False).order_by("-id")
        return carts
    
    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return CartAdminSerializer
        return CartSerializer
        
    permission_classes = [permissions.IsAuthenticated]


class CartProductList(generics.ListAPIView):
    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            product_id = Cart.objects.all().values_list('product', flat=True).distinct()
        else:
            product_id = Cart.objects.filter(buyer = user, checked_out = False).values_list('product', flat=True).distinct()
        products = Product.objects.filter(pk__in = list(product_id))

        return products

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]




class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return CartAdminSerializer
        return CartSerializer

    permission_classes = [OwnerOrAdmin]