from django.shortcuts import render


def index(request):
    return render(request, 'main/index.html')


def cookie_policy(request):
    return render(request, 'main/cookie_policy.html')
