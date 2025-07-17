<template>
  <div class="contenedor-modulo">
    <h1 class="titulo-modulo">Lista de Estudiantes</h1>
    <div class="lista-items">
      <Estudiantes
        v-for="estudiante in estudiantes"
        :key="estudiante.id"
        :estudiante="estudiante"
        @update:estudiantes="handleEstudianteUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Estudiantes from '../jordan/Estudiantes.vue';
import type { IEstudiantes } from '../../types/estudiantes';

const estudiantes = ref<IEstudiantes[]>([
  { id: 1, nombre: 'Ana', apellido: 'López', edad: 20, curso: 'Matemáticas' },
  { id: 2, nombre: 'Luis', apellido: 'Pérez', edad: 22, curso: 'Historia' },
]);

function handleEstudianteUpdate(updated: IEstudiantes) {
  const index = estudiantes.value.findIndex(e => e.id === updated.id);
  if (index !== -1) {
    estudiantes.value[index] = {
      ...estudiantes.value[index],
      curso: estudiantes.value[index].curso + ' (Actualizado)',
    };
  }
}
</script>
