from django.db import models

# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length = 200, null = True, unique = True)

    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length = 300, null = True)
    category = models.ForeignKey(Category, on_delete = models.SET_NULL, null = True)
    main_img = models.ImageField(upload_to = "products", default = 'products/product.png')
    price = models.FloatField(null = True)
    discount = models.FloatField(null = True, blank = True)
    created_on = models.DateTimeField(auto_now_add = True, null = True)

    def __str__(self):
        return self.name

class Rating(models.Model):
    product = models.OneToOneField(Product, on_delete = models.CASCADE)
    one_star = models.IntegerField(null = True, blank = True, default = 0)
    two_star = models.IntegerField(null = True, blank = True, default = 0)
    three_star = models.IntegerField(null = True, blank = True, default = 0)
    four_star = models.IntegerField(null = True, blank = True, default = 0)
    five_star = models.IntegerField(null = True, blank = True, default = 0)

    def __str__(self):
        return self.product.name

class SubImgs(models.Model):
    image = models.ImageField(upload_to = "images", null = True)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)

    def __str__(self):
        return self.product.name