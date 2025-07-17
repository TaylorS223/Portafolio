//Realizado por Jordan
<script setup lang="ts">
import { ref } from 'vue';
import type { IEstudiantes } from '../types/estudiantes';
import Contenedor from '../components/jordan/Contenedor.vue'; // el "componente inteligente"

const estudiantes = ref<IEstudiantes[]>([
  { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, curso: 'Matemáticas' },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', edad: 22, curso: 'Historia' },
]);

const addEstudiante = (nuevo: IEstudiantes) => {
  estudiantes.value.push(nuevo);
};

const updateEstudiante = (id: number, updatedEstudiante: IEstudiantes) => {
  const index = estudiantes.value.findIndex(e => e.id === id);
  if (index !== -1) {
    estudiantes.value[index] = { ...estudiantes.value[index], ...updatedEstudiante };
  }
};

const deleteEstudiante = (id: number) => {
  estudiantes.value = estudiantes.value.filter(e => e.id !== id);
};
</script>

<template>
  <div>
    <Contenedor
      :estudiantes="estudiantes"
      @add-estudiante="addEstudiante"
      @update-estudiante="updateEstudiante"
      @delete-estudiante="deleteEstudiante"
    />
  </div>
</template>

<style scoped>

</style>
