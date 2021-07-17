from django.urls import path
from . import views
from .views import current_user, UserList

app_name = "accounts"

urlpatterns = [
    path("", views.Account.as_view(), name = "account"),
    path("account-create/", views.AccountCreate.as_view(), name = "create-account"),
    path("address/", views.AddressList.as_view(), name = "address"),
    path("address-edit/<int:pk>/", views.AddressEdit.as_view(), name = "address-edit"),
    path("register/", views.Register.as_view(), name = "register"),
    path("all-users/", views.UserList.as_view(), name = "all-user"),
    path("user-edit/<int:pk>/", views.UserEdit.as_view(), name = "user-details"),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]


