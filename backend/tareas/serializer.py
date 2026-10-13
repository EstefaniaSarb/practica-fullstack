from rest_framework import serializers
from .models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Tarea
        fields = ['id', 'titulo', 'descripcion', 'completada', 'creada_en']
        read_only_fields = ['creada_en']