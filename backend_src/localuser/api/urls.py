from django.conf.urls import url, include
from rest_framework import routers
from .views import UserViewSet, StatusViewSet, UserUnsafeUpdateAPIView
from django.views.decorators.csrf import csrf_exempt

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'status', StatusViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^v2/users/(?P<pk>[\w-]+)/$', csrf_exempt(UserUnsafeUpdateAPIView.as_view())),
]

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.