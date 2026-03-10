from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
SECRET_KEY = 'django-insecure-s-%m@-*i9z*xlstvm+nyzeg3-i%74vfws-glk%u#5232%(j74!'

DEBUG = True
ALLOWED_HOSTS = []

# Database for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}