from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class RegistroIMC(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    peso = models.FloatField()
    altura = models.FloatField()
    imc = models.FloatField()
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - IMC {self.imc}"