from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import RegistroIMC

# Create your views here.
def inicio (request):
    return render(request, 'imc/index.html')


@login_required
def salvar_imc(request):
    if request.method == 'POST':
        peso = request.POST.get('peso')
        altura = request.POST.get('altura')
        imc = request.POST.get('imc')

        RegistroIMC.objects.create(
            usuario=request.user,
            peso=peso,
            altura=altura,
            imc=imc
        )

        return redirect('inicio')