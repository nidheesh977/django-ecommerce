from rest_framework import permissions

class ObjIsAdminOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_superuser)

class ListIsAdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_superuser)


class AdminOrStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_staff)