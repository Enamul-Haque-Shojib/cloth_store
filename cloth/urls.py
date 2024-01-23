from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

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
    path('buynowcartlist/', views.BuyNow, name='buynow_cartlist' ),
]