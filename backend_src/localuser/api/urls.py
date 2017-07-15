from django.conf.urls import url, include
from rest_framework import routers
from .views import UserViewSet, StatusViewSet
# from django.views.decorators.csrf import csrf_exempt

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'status', StatusViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]