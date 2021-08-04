from rest_framework import serializers
from .models import ProductCheckout, CartCheckout
from cart.models import Cart
from accounts.models import Address

class ProductCheckoutSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get('request')

        product_checkout = ProductCheckout()
        product_checkout.buyer = request.user
        product_checkout.product = validated_data["product"]
        product_checkout.address = Address.objects.get(owner = request.user.id)

        product_checkout.save()

        return product_checkout

    class Meta:
        model = ProductCheckout
        exclude = ["buyer", "address"]
        extra_kwargs = {
            "delivery_status": {"read_only": True},
            "created_on": {"read_only": True},
            }

class ProductCheckoutAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCheckout
        fields = "__all__"

class CartCheckoutSerializer(serializers.ModelSerializer):

    def validate(self, data):
        request = self.context.get("request")
        user = request.user
        if list(user.cart_set.filter(checked_out = False)) == []:
            raise serializers.ValidationError("Cart objects empty")
        return data

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        cart_checkout = CartCheckout()
        cart = Cart()

        cart_checkout.buyer = user
        cart_checkout.address = Address.objects.get(owner = request.user)
        cart_checkout.save()
        

        cart_checkout.cart.set(user.cart_set.filter(checked_out = False))

        Cart.objects.filter(buyer = user).update(checked_out = True)
        
        cart_checkout.save()

        return cart_checkout

    class Meta:
        model = CartCheckout
        fields = "__all__"
        extra_kwargs = {
            "buyer": {"read_only": True},
            "cart": {"read_only": True},
            "address": {"read_only": True},
            "delivery_status": {"read_only": True},
            "created_on": {"read_only": True},
            }


class CartCheckoutAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartCheckout
        fields = "__all__"


class ProductCheckoutEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCheckout
        fields = "__all__"
        extra_kwargs = {
            "buyer": {"read_only": True},
            "product": {"read_only": True},
            "address": {"read_only": True},
            "created_on": {"read_only": True},
        }

class CartCheckoutEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartCheckout
        fields = "__all__"
        extra_kwargs = {
            "buyer": {"read_only": True},
            "cart": {"read_only": True},
            "address": {"read_only": True},
            "created_on": {"read_only": True},
        }