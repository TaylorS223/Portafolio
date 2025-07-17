//realizado por David
<script setup lang="ts">
import { ref } from 'vue';
import type { ITareas } from '../types/tareas';
import ContenedorTareas from '../components/david/contenedorTarea.vue';

const tareas = ref<ITareas[]>([
  { id: 1, titulo: 'Hacer ejercicio', descripcion: '30 minutos de cardio', completado: false },
  { id: 2, titulo: 'Estudiar Vue 3', descripcion: 'Leer guía oficial y practicar', completado: true },
]);

const addTarea = (nueva: ITareas) => {
  tareas.value.push(nueva);
};

const updateTarea = (id: number, updatedTarea: ITareas) => {
  const index = tareas.value.findIndex(t => t.id === id);
  if (index !== -1) {
    tareas.value[index] = { ...tareas.value[index], ...updatedTarea };
  }
};

const deleteTarea = (id: number) => {
  tareas.value = tareas.value.filter(t => t.id !== id);
};
</script>

<template>
  <div>
    <ContenedorTareas
      :tareas="tareas"
      @add-tarea="addTarea"
      @update-tarea="updateTarea"
      @delete-tarea="deleteTarea"
    />
  </div>
</template>


