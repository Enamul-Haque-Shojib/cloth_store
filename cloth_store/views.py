from django.shortcuts import render
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'

class AboutUsView(TemplateView):
    template_name = 'about_us.html'

