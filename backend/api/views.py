# views.py
from django.http import JsonResponse

from rest_framework import viewsets
from .models import Category, ListItem
from .serializers import CategorySerializer, ListItemSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListItemViewSet(viewsets.ModelViewSet):
    serializer_class = ListItemSerializer

    def get_queryset(self):
        queryset = ListItem.objects.all()
        category_id = self.request.query_params.get('category_id')
        
        if category_id is not None:
            queryset = queryset.filter(category__id=category_id)
            
        return queryset
    

def health_check(request):
    """Une vue simple qui renvoie un statut de succès."""
    return JsonResponse({"status": "ok", "message": "API is healthy"})
