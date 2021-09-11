from django.db import models
from django.contrib.auth.models import User
from products.models import Product
from accounts.models import Address
from cart.models import Cart

# Create your models here.
class ProductCheckout(models.Model):
    buyer = models.ForeignKey(User, on_delete = models.RESTRICT)
    product = models.ForeignKey(Product, on_delete = models.RESTRICT)
    address = models.ForeignKey(Address, on_delete = models.RESTRICT)
    payed = models.BooleanField(default = False)

    DELIVERY_STATUS = [
        ("processing", "Processing"),
        ("packed", "Packed"),
        ("out_for_delivery", "Out For Delivery"),
        ("delivered", "Delivered")
    ]

    delivery_status = models.CharField(max_length = 50, choices = DELIVERY_STATUS, default = "processing")
    created_on = models.DateTimeField(auto_now_add = True)

    def __str_(self):
        return f"{self.buyer.username} --> {self.product.name[:50]}"


class CartCheckout(models.Model):
    buyer = models.ForeignKey(User, on_delete = models.RESTRICT)
    cart = models.ManyToManyField(Cart)
    address = models.ForeignKey(Address, on_delete = models.RESTRICT)
    payed = models.BooleanField(default = False)

    DELIVERY_STATUS = [
        ("processing", "Processing"),
        ("packed", "Packed"),
        ("out_for_delivery", "Out For Delivery"),
        ("delivered", "Delivered")
    ]

    delivery_status = models.CharField(max_length = 50, choices = DELIVERY_STATUS, default = "processing")
    created_on = models.DateTimeField(auto_now_add = True, null = True)

    def __str_(self):
        return f"{self.buyer.username} --> {self.cart.product.name[:50]}"