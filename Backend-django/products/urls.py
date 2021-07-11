from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.ProductList.as_view(), name = 'product-list'),
    path('<int:pk>/', views.ProductDetail.as_view(), name = 'product-detail'),
    path('product-filter/', views.ProductFilter.as_view(), name = "product-filter"),
    path('category/', views.CategoryList.as_view(), name = 'category-list'),
    path('category-products/<int:pk>/', views.CategoryProducts.as_view(), name = 'category-product-detail'),
    path('category/<int:pk>/', views.CategoryEdit.as_view(), name = 'category-detail'),
]