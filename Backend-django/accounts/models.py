from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
    owner = models.OneToOneField(User, on_delete = models.CASCADE)
    name = models.CharField(max_length = 200, null = True, blank = True)
    email = models.EmailField(null = True)
    age = models.IntegerField(default = 20)
    image = models.ImageField(upload_to = "accounts", default = "accounts/user.png")

    def __str__(self):
        return self.owner.username


class Address(models.Model):
    owner = models.ForeignKey(User, on_delete = models.CASCADE)
    fullName = models.CharField(max_length = 100, null = True)
    addressLine1 = models.CharField(max_length = 200, null = True)
    addressLine2 = models.CharField(max_length = 200, null = True, blank = True)
    city = models.CharField(max_length = 200, null = True)
    state = models.CharField(max_length = 200, null = True)
    pincode = models.CharField(null = True, max_length = 20)
    country = models.CharField(null = True, max_length = 100)
    mobile = models.CharField(null = True, max_length = 15)

    def __str__(self):
        return self.owner.username