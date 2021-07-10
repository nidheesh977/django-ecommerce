from django.urls import path
from . import views

app_name = "cart"

urlpatterns = [
    path("", views.CartList.as_view(), name = "cart-list"),
    path("<int:pk>/", views.CartDetail.as_view(), name = "cart-detail"),
]