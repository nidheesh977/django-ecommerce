from rest_framework.permissions import BasePermission

class OwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool((request.user and request.user == obj.buyer) or request.user.is_superuser)
