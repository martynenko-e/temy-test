from rest_framework import serializers
from localuser.models import User, Status

class StatusSerializer(serializers.HyperlinkedModelSerializer):
    
    users = serializers.HyperlinkedRelatedField(many=True, view_name='user-detail', read_only=True)

    class Meta:
        model = Status
        fields = ('name', 'users')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    status = serializers.SlugRelatedField(
        queryset=Status.objects.all(),
        many=False,
        read_only=False,
        slug_field='name'
    )
    username = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'status')