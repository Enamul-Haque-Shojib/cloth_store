from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

router = DefaultRouter()

router.register('list', views.ClothViewSet)
router.register('color', views.ColorViewSet)
router.register('size', views.SizeViewSet)
router.register('category', views.CategoryViewSet)
router.register('wishlist', views.ClothWishListViewSet)
router.register('cartlist', views.ClothCartListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('clothdetails/<int:clothid>', views.ClothDetailsView.as_view(), name='cloth_details' ),
    path('clothwishlist/', views.ClothWishListView.as_view(), name='cloth_wishlist' ),
    path('clothcartlist/', views.ClothCartListView.as_view(), name='cloth_cartlist' ),
    path('addwishlist/<int:clothid>', views.clothWishList, name='add_wishlist' ),
    path('addcartlist/<int:clothid>', views.clothCartList, name='add_cartlist' ),
    path('addcartlistplus/<int:clothid>', views.clothCartListPlus, name='add_cartlist_plus' ),
    path('addcartlistminus/<int:clothid>', views.clothCartListMinus, name='add_cartlist_minus' ),
    path('deletecartlist/<int:pk>', views.ClothCardListDeleteView.as_view(), name='delete_cartlist' ),
    path('deletewishlist/<int:pk>', views.ClothWishListDeleteView.as_view(), name='delete_wishlist' ),
    path('deletewishlistall/', views.deleteWishlistAll, name='delete_wishlist_all' ),
    path('buynowcartlist/', views.BuyNow, name='buynow_cartlist' ),
    
    path('passwordreset/', auth_views.PasswordResetView.as_view(template_name="password_reset_form.html"), name = 'password_reset'),
    path('passwordresetdone/', auth_views.PasswordResetDoneView.as_view(template_name="password_reset_done.html"), name = 'password_reset_done'),
    path('passwordresetconfirm/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_confirm.html"), name = 'password_reset_confirm'),
    path('passwordresetcomplete/', auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_complete.html"), name = 'password_reset_complete'),
]