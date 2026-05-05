import pytest
from rest_framework import status
from django.urls import reverse
from .models import ListItem, Category

pytestmark = pytest.mark.django_db


# --- POST /api/tasks/ ---

def test_create_task(api_client, category):
    url = reverse('task-list')
    data = {'description': 'Nouvelle tâche', 'category': category.id}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert ListItem.objects.count() == 1


def test_create_task_missing_description(api_client, category):
    url = reverse('task-list')
    data = {'category': category.id}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# --- GET /api/tasks/?category_id= ---

def test_filter_tasks_by_category(api_client, category):
    other_category = Category.objects.create(name="Personnel")
    ListItem.objects.create(description="Tâche travail", category=category)
    ListItem.objects.create(description="Tâche personnelle", category=other_category)

    url = reverse('task-list')
    response = api_client.get(url, {'category_id': category.id})

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['description'] == "Tâche travail"


# --- DELETE /api/tasks/{id}/ ---

def test_delete_task(api_client, task):
    url = reverse('task-detail', args=[task.id])
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert ListItem.objects.count() == 0
