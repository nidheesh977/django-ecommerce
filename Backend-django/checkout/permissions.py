from rest_framework import permissions

class AdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_superuser)

class OwnerOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool((request.user and request.user == obj.buyer))