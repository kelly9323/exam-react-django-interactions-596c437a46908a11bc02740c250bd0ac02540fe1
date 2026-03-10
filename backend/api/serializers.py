from rest_framework import serializers
from .models import ListItem, Category

class ListItemSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # display the category name instead of ID
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = ListItem
        fields = ['id', 'description', 'is_completed', 'category', 'category_name', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']