from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser

class Status(models.Model):
    name = models.CharField(max_length=220)

    def __unicode__(self):
        return self.name


class User(AbstractUser):
    status = models.ForeignKey(Status, related_name="users", null=True)

    def __unicode__(self):
        return self.username


