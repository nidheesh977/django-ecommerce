from django.shortcuts import render
from rest_framework import generics, permissions, authentication, status
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from .permissions import ObjIsAdminOrReadOnly, ListIsAdminOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import filters

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializer
    permission_classes = [ListIsAdminOrReadOnly]


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [ObjIsAdminOrReadOnly]


class ProductFilter(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["$name", "$category__title"]

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    def create(self, request, *args, **kwargs):
        if request.data["title"] == "":
            request.data._mutable = True
            request.data["title"] = "Unknown"
            request.data._mutable = False

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    serializer_class = CategorySerializer
    permission_classes = [ListIsAdminOrReadOnly]


class CategoryProducts(generics.ListAPIView):
    def get_queryset(self):
        pk = self.kwargs["pk"]
        try:
            category = Category.objects.get(id = pk)
        except:
            raise Http404
        products = Product.objects.filter(category = category)
        return products

    serializer_class = ProductSerializer

class CategoryEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [ObjIsAdminOrReadOnly]

