from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.views import auth_login, auth_logout
from django.contrib.auth.forms import UserCreationForm


def register(request):
    """
    registration view
    """
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('game/test')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


def redirected_login(request, **kwargs):
    print('test')
    if request.user.is_authenticated():
        return HttpResponseRedirect('game/test')
    else:
        return login(request)


