from rest_framework import permissions

class AdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_superuser)