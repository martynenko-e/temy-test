from django.conf.urls import url, include
from django.views.generic.base import TemplateView
from .models import User, Status
from .views import (index, login_view, logout_view)
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    # url(r'^$', index, name='index'),
    url(r'^api/', include("localuser.api.urls")),
    url(r'^api/auth/login/$', login_view, name='login'),
    url(r'^api/auth/logout/$', logout_view, name='logout'),
    url(r'^/?.*', TemplateView.as_view(template_name="ang_index.html"), name='add-point')
]