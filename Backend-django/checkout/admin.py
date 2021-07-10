from django.contrib import admin
from .models import ProductCheckout, CartCheckout
# Register your models here.

admin.site.register(ProductCheckout)
admin.site.register(CartCheckout)