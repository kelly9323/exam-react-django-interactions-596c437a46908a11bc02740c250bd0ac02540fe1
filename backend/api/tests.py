import pytest
from django.db import IntegrityError
from .models import ListItem

pytestmark = pytest.mark.django_db


def test_new_task_is_not_completed_by_default(category):
    task = ListItem.objects.create(description="Nouvelle tâche", category=category)
    assert task.is_completed == False


def test_task_can_be_marked_as_complete(task):
    task.is_completed = True
    task.save()
    task.refresh_from_db()
    assert task.is_completed == True


@pytest.mark.django_db(transaction=True)
def test_task_requires_existing_category():
    with pytest.raises(IntegrityError):
        ListItem.objects.create(description="Tâche orpheline", category_id=9999)
