import pytest
from rest_framework.test import APIClient
from .models import Category, ListItem


@pytest.fixture
def category(db):
    return Category.objects.create(name="Travail")


@pytest.fixture
def task(category):
    return ListItem.objects.create(description="Rédiger le rapport", category=category)


@pytest.fixture
def api_client():
    return APIClient()
