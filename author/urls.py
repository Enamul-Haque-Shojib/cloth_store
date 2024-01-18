from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter() 


urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.UserRegistrationApiView.as_view(), name = 'register'),
    path('login/', views.UserLoginApiView.as_view(), name = 'login'),
    path('logout/', views.UserLogoutView.as_view(), name = 'logout'),
    path('active/<uid64>/<token>', views.activate, name = 'activate'),
    path('reg/', views.RegistrationView.as_view(), name = 'reg'),
    path('log/', views.LoginView.as_view(), name = 'log'),
    path('profile/', views.ProfileView.as_view(), name = 'profile'),
]