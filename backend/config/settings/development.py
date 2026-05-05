from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
SECRET_KEY = 'django-insecure-s-%m@-*i9z*xlstvm+nyzeg3-i%74vfws-glk%u#5232%(j74!'

DEBUG = True
ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

# Database for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}