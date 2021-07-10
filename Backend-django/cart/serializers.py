from rest_framework import serializers
from .models import Cart
from rest_framework.fields import CurrentUserDefault

class CartSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get('request')

        cart = Cart()
        cart.buyer = request.user
        cart.product = validated_data["product"]
        try:
            cart.count = validated_data["count"]
        except:
            pass

        cart.save()
        return cart


    class Meta:
        model = Cart
        exclude = ["checked_out", "buyer"]


class CartAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"