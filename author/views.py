from django.shortcuts import render
from . import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView
from django.urls import reverse_lazy
from django.contrib import messages


class UserRegistrationApiView(APIView):
    serializer_class = serializers.RegistrationSerializer
    

    def post(self, request):
        serializers = self.serializer_class(data = request.data)
        if serializers.is_valid():
            user = serializers.save()
            print(user)
            token = default_token_generator.make_token(user)
            # print("token: ",token)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            # print('uid: ', uid)
            confirm_link = f"http://127.0.0.1:8000/author/active/{uid}/{token}"
            email_subject = 'Confirm Your Email'
            email_body = render_to_string("confirm_email.html", {'confirm_link':confirm_link})
            email = EmailMultiAlternatives(email_subject, '', to=[user.email])
            email.attach_alternative(email_body, 'text/html')
            email.send()
            
            messages.warning(request, 'Check your email address')
            return Response("Check your email for confirmation")
            
        return Response(serializers.errors)
    
def activate(request, uid64, token):
    try:
        uid = urlsafe_base64_decode(uid64).decode()
        user = User._default_manager.get(pk=uid)
    except(User.DoesNotExist):
        user = None
        
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('log')
    else:
        return redirect('reg')
    


class UserLoginApiView(APIView):
    template_name = 'registration.html'
    def post(self, request):
        serializer = serializers.UserLoginSerializer(data = self.request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(username = username, password = password)
            
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                # print(token)
                # print(_)
                login(request, user)
                messages.success(request, 'Logged in successfully')
                return Response({'token' : token.key, 'user_id' : user.id})
            else:
                
                return Response({'error' : "invalid Credential"})
        return Response(serializer.errors)
    

    


class RegistrationView(TemplateView):
    template_name = 'registration.html'

class LoginView(TemplateView):
    template_name = 'login.html'

class ProfileView(TemplateView):
    template_name = 'profile.html'

class UserLogoutView(LogoutView):
     def get_success_url(self):
        messages.success(self.request, 'Logged out successfully')
        return reverse_lazy('log')