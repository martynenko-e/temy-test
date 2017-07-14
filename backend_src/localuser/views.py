# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from .models import User, Status
import json

# Create your views here.

def index(request):
    if request.user.is_authenticated():
        status = True
        button_log_text = "Log Out"
    else:
        status = False
        button_log_text = "Log In"
    context = {
        "button_log_text": button_log_text,
        "status": status
    }
    return render(request, 'index.html', context)


@csrf_exempt
def login_view(request):
    # Authenticate user, if no exist, create new one and redirect to status
    username = json.loads(request.body)['username']
    print username

    user = authenticate(username=username, password='password')
    if user is not None:
        # A backend authenticated the credential
        login(request, user)  
    else:
        user = User.objects.create_user(username, '', 'password')
        status, created = Status.objects.get_or_create(name="Vacation")
        Status.objects.get_or_create(name="Working")
        Status.objects.get_or_create(name="Business Trip")
        user.status = status
        user.save()
        user = authenticate(username=username, password='password')
        login(request, user)
        # No backend authenticated the credential
    dict = {'username': user.username, 'status': user.status.name, 'id': user.id}
    return HttpResponse(json.dumps(dict), content_type='application/json')


@csrf_exempt
def logout_view(request):
    logout(request)
    dict = {'register':False}
    return HttpResponse(json.dumps(dict), content_type='application/json')

