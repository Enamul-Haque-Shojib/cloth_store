from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from rest_framework import viewsets, filters, pagination
# Create your views here.
from . import models
from . import forms
from . import serializers
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.views.generic import TemplateView, ListView, DetailView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework.response import Response


class ClothViewSet(viewsets.ModelViewSet):
    queryset = models.Cloth.objects.all()
    serializer_class = serializers.ClothSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'price', 'color__name', 'Size__name', 'category__name']
    ordering_fields = ['Size__name', 'rating', 'price']


class ColorViewSet(viewsets.ModelViewSet):
    queryset = models.Color.objects.all()
    serializer_class = serializers.ColorSerializer

class SizeViewSet(viewsets.ModelViewSet):
    queryset = models.Size.objects.all()
    serializer_class = serializers.SizeSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer







class ClothWishListFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, query_set, view):
        u = request.user
        if u:
            return query_set.filter(author = u)
        return query_set

class ClothWishListViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.ClothWishList.objects.all()
    serializer_class = serializers.ClothWishListSerializer
    filter_backends = [ClothWishListFilter]  


class ClothCartListFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, query_set, view):
        u = request.user
        if u:
            return query_set.filter(author = u)
        return query_set

class ClothCartListViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.ClothCartList.objects.all()
    serializer_class = serializers.ClothCartListSerializer
    filter_backends = [ClothCartListFilter] 
    





class ClothDetailsView(DetailView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    model = models.Cloth
    template_name = 'cloth_details.html'
    pk_url_kwarg = 'clothid'
    

    def post(self, request, *args, **kwargs):
        review_form = forms.ReviewForm(data = self.request.POST)
        
        cloth_object = self.get_object()
        if review_form.is_valid():
            new_review = review_form.save(commit = False)
            new_review.cloth = cloth_object
            new_review.author = self.request.user
            new_review.save()
            count_rating=0
            review_model = models.Review.objects.filter(cloth = cloth_object.clothid)
            total_reviews = len(review_model)
            for rev in review_model:
                print('>>>>',rev.rating)
                count_rating = count_rating + int(rev.rating)
            avg_rating = count_rating/total_reviews
           
            cloth_object.rating = format(avg_rating, ".1f")
            cloth_object.save()
        return self.get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cloth = self.object
        reviews = cloth.reviews.all()

        review_form = forms.ReviewForm()
        
        context['reviews'] = reviews
        context['review_form'] = review_form
        return context
    

    



class ClothWishListView(TemplateView):
    template_name = 'cloth_wishlist.html'

class ClothCartListView(TemplateView):
    template_name = 'cloth_cartlist.html'


@login_required
def clothWishList(request, clothid):

    cloth = models.Cloth.objects.get(pk = clothid)
    
    check_in_cloth_wishlist = models.ClothWishList.objects.filter(clothid = cloth.clothid, name = cloth.name, author = request.user)
      
    
    
    if request.method == 'GET':

        if check_in_cloth_wishlist:
            messages.warning(request, 'You have already added this your wish list')
            return redirect('cloth_details',clothid=cloth.clothid)
        else:
            cloth_wishlist = models.ClothWishList()
            cloth_wishlist.clothid = cloth.clothid
            cloth_wishlist.name = cloth.name
            cloth_wishlist.price = cloth.price
            cloth_wishlist.description = cloth.description
            cloth_wishlist.category = cloth.category
            cloth_wishlist.rating = cloth.rating
            cloth_wishlist.author = request.user
            
            cloth_wishlist.image = cloth.image
            cloth_wishlist.quantity = cloth.quantity
            

            cloth_wishlist.save()

            # cloth_wishlist.Size.add(cloth)
            # cloth_wishlist.color.add(cloth)

            cloth_wishlist.save()
            
            messages.success(request, 'The item is added in wishlist')
            return redirect('cloth_details',clothid=cloth.clothid)
                
    return render(request, 'cloth_details.html')


@login_required
def clothCartList(request, clothid):
    cloth = models.Cloth.objects.get(pk = clothid)
    
    if request.method == 'GET':
        if cloth.quantity != 0:
            cloth_cartlist = models.ClothCartList.objects.filter(clothid = cloth.clothid, name = cloth.name, author = request.user)
            if cloth_cartlist:
                s = models.ClothCartList.objects.get(clothid = cloth.clothid, name = cloth.name, author=request.user)
                cloth.quantity = cloth.quantity-1
                s.quantity = s.quantity + 1
                s.price = s.price + 1
                cloth.save()
                s.save()
                return redirect('cloth_details',clothid=cloth.clothid)
                    
            
            else:
                x = models.ClothCartList()
                x.clothid = cloth.clothid
                x.name = cloth.name
                x.price = cloth.price
                x.quantity = 1
                x.description = cloth.description
                x.category = cloth.category
                x.author = request.user
                x.image = cloth.image
                x.rating = cloth.rating
                cloth.quantity = cloth.quantity - 1
                x.save()
                cloth.save()
                messages.success(request, 'The item is added in CardList')
                return redirect('cloth_details',clothid=cloth.clothid)
        else:
            messages.warning(request, 'Out of Stock!!')
            return redirect('cloth_details',clothid=cloth.clothid)


    return render(request, 'cloth_details.html')

@login_required
def clothCartListPlus(request, clothid):
    cloth = models.Cloth.objects.get(pk = clothid)
    
    if request.method == 'GET':
        if cloth.quantity != 0:
            cloth_cartlist = models.ClothCartList.objects.filter(clothid = cloth.clothid, name = cloth.name, author = request.user)
            if cloth_cartlist:
                s = models.ClothCartList.objects.get(clothid = cloth.clothid, name = cloth.name, author=request.user)
                cloth.quantity = cloth.quantity-1
                s.quantity = s.quantity + 1
                s.price = s.price + 1
                cloth.save()
                s.save()
                return redirect('cloth_cartlist')
                    
            
            else:
               
                return redirect('cloth_cartlist')
        else:
            messages.warning(request, 'Out of Stock!!')
            return redirect('cloth_cartlist')


    return render(request, 'cartlist.html')


@login_required
def clothCartListMinus(request, clothid):
    cloth = models.Cloth.objects.get(pk = clothid)
    
    if request.method == 'GET':
        if cloth.quantity != 0:
            cloth_cartlist = models.ClothCartList.objects.filter(clothid = cloth.clothid, name = cloth.name, author = request.user)
            if cloth_cartlist:
                s = models.ClothCartList.objects.get(clothid = cloth.clothid, name = cloth.name, author=request.user)
                if s.quantity > 0:
                    cloth.quantity = cloth.quantity+ 1
                    s.quantity = s.quantity - 1
                    s.price = s.price - 1
                    cloth.save()
                    s.save()
                    return redirect('cloth_cartlist')
                else:

                    return redirect('cloth_cartlist')
            
            else:
               
                return redirect('cloth_cartlist')
        else:
            messages.warning(request, 'Out of Stock!!')
            return redirect('cloth_cartlist')


    return render(request, 'cartlist.html')





class ClothCardListDeleteView(DeleteView):
     model = models.ClothCartList
     pk_url_kwarg = 'id'
     template_name = 'delete_cartlist.html'
     success_url = reverse_lazy('cloth_cartlist')

class ClothWishListDeleteView(DeleteView):
     model = models.ClothWishList
     pk_url_kwarg = 'id'
     template_name = 'delete_wishlist.html'
     success_url = reverse_lazy('cloth_wishlist')








    

