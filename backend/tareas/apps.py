from django.apps import AppConfig


class TareasConfig(AppConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
    name = 'tareas'
