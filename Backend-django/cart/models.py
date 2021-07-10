from django.db import models
from django.contrib.auth.models import User
from products.models import Product

# Create your models here.
class Cart(models.Model):
    buyer = models.ForeignKey(User, on_delete = models.RESTRICT)
    product = models.ForeignKey(Product, on_delete = models.RESTRICT)
    count = models.IntegerField(default = 1)
    checked_out = models.BooleanField(default = False, null = True)
    created_on = models.DateTimeField(auto_now_add = True, null = True)


    def __str__(self):
        return f"{self.buyer.username} --> {self.product.name[:50]}"