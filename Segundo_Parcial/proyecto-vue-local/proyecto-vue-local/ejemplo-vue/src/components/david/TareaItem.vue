//src/components/david/Tareas.vue

<template>
  <div class="item-card">
    <h3>{{ tarea.titulo }}</h3>
    <p>{{ tarea.descripcion }}</p>
    <p>
      Estado:
      <span :class="tarea.completado ? 'estado-completado' : 'estado-pendiente'">
        {{ tarea.completado ? 'Completado' : 'Pendiente' }}
      </span>
    </p>
    <div class="acciones-item">
      <button class="boton boton-editar" @click="$emit('editar', tarea)">Editar</button>
      <button class="boton boton-eliminar" @click="$emit('eliminar', tarea.id)">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITareas } from '../../types/tareas';

defineProps<{
  tarea: ITareas;
}>();

defineEmits<{
  (e: 'editar', tarea: ITareas): void;
  (e: 'eliminar', id: number): void;
}>();
</script>


