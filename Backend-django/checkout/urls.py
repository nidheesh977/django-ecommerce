from django.urls import path
from . import views

app_name = "checkout"

urlpatterns = [
    path("product-checkout/", views.ProductCheckoutView.as_view(), name = "product-checkout"),
    path("cart-checkout/", views.CartCheckoutView.as_view(), name = "cart-checkout"),
    path("product-checkout/<int:pk>/", views.ProductCheckoutDetailView.as_view()),
    path("cart-checkout/<int:pk>/", views.CartCheckoutDetailView.as_view()),
    path("checkout-products/", views.CheckoutProductsList.as_view()),
    path("checkout-carts/", views.CheckoutCartsList.as_view()),
    path("delete-product-checkout/<int:pk>/", views.DeleteProductCheckout.as_view()),
    path("delete-cart-checkout/<int:pk>/", views.DeleteCartCheckout.as_view()),
]