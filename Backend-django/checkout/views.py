from django.shortcuts import render
from rest_framework import generics, status

from .models import (
    ProductCheckout,
    CartCheckout
)

from .serializers import (
    ProductCheckoutSerializer,
    PayedProductCheckoutSerializer,
    ProductCheckoutAdminSerializer,
    CartCheckoutSerializer,
    CartCheckoutAdminSerializer,
    ProductCheckoutEditSerializer,
    CartCheckoutEditSerializer
)

from cart.models import Cart
from cart.serializers import CartSerializer, CartAdminSerializer

from products.serializers import ProductSerializer
from rest_framework import permissions
from rest_framework.response import Response
from .permissions import AdminOnly, OwnerOnly
from products.models import Product


# Create your views here.
class ProductCheckoutView(generics.ListCreateAPIView):
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            product_checkouts = ProductCheckout.objects.all().order_by("-id")

        else:
            product_checkouts = user.productcheckout_set.all().order_by("-id")
        return product_checkouts

    def get_serializer_class(self):
        user = self.request.user
        if user.is_superuser:
            return ProductCheckoutAdminSerializer

        return ProductCheckoutSerializer

    permission_classes = [permissions.IsAuthenticated]

class PayedProductCheckoutView(generics.CreateAPIView):
    
    queryset = ProductCheckout.objects.all()
    serializer_class = PayedProductCheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartCheckoutView(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            cart_checkouts = CartCheckout.objects.all().order_by("-id")
        else:
            cart_checkouts = user.cartcheckout_set.all().order_by("-id")

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


class CheckoutProductsList(generics.ListAPIView):
    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            cart_checkout_products = CartCheckout.objects.all().values_list("cart__product", flat = True).distinct()

            product_checkout_products = ProductCheckout.objects.all().values_list("product", flat = True).distinct()

            product_id = list(cart_checkout_products)+list(product_checkout_products)

        else:
            cart_checkout_products = CartCheckout.objects.filter(buyer = user).values_list("cart__product", flat = True).distinct()

            product_checkout_products = ProductCheckout.objects.filter(buyer = user).values_list("product", flat = True).distinct()

            product_id = list(cart_checkout_products)+list(product_checkout_products)

        products = Product.objects.filter(pk__in = list(product_id))

        return products
    
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]


class CheckoutCartsList(generics.ListAPIView):
    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            checkout_carts = CartCheckout.objects.all().values_list("cart", flat = True).distinct()
            
        else:
            checkout_carts = CartCheckout.objects.filter(buyer = user).values_list("cart", flat = True).distinct()

        carts = Cart.objects.filter(pk__in = list(checkout_carts))

        return carts
    
    def get_serializer_class(self):
        user = self.request.user

        if user.is_superuser:
            return CartAdminSerializer

        return CartSerializer
        
    permission_classes = [permissions.IsAuthenticated]

class DeleteProductCheckout(generics.DestroyAPIView):
    queryset = ProductCheckout.objects.all()
    serializer_class = ProductCheckoutEditSerializer
    permission_classes = [OwnerOnly]

class DeleteCartCheckout(generics.DestroyAPIView):
    queryset = CartCheckout.objects.all()
    serializer_class = ProductCheckoutEditSerializer
    permission_classes = [OwnerOnly]