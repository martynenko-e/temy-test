from rest_framework import viewsets
from localuser.models import User, Status
from .serializers import UserSerializer, StatusSerializer
from rest_framework.generics import RetrieveUpdateAPIView



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().filter(is_staff=False)
    serializer_class = UserSerializer

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class UserUnsafeUpdateAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'