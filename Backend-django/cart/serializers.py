from rest_framework import serializers
from .models import Cart
from rest_framework.fields import CurrentUserDefault
from django.db.models import Q

class CartSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get('request')

        if Cart.objects.filter(buyer = request.user, product = validated_data["product"], checked_out = False).exists():
            cart = Cart.objects.get(buyer = request.user, product = validated_data["product"], checked_out = False)
            cart.count = cart.count+1
            cart.save()

        else:
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