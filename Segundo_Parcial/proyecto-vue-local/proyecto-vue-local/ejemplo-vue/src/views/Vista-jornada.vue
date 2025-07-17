//realizado por Taylor
<script setup lang="ts">
import { ref } from 'vue';
import type { IJornada } from '../types/jornada';
import ContenedorJornada from '../components/taylor/ContenedorJornada.vue';

const jornadas = ref<IJornada[]>([
  {
    id: 1,
    dia: 'Lunes',
    horaInicio: '08:00',
    horaFin: '12:00',
    descripcion: 'Turno matutino',
  },
  {
    id: 2,
    dia: 'Martes',
    horaInicio: '13:00',
    horaFin: '17:00',
    descripcion: 'Turno vespertino',
  },
]);

const addJornada = (nueva: IJornada) => {
  jornadas.value.push(nueva);
};

const updateJornada = (id: number, jornada: IJornada) => {
  const index = jornadas.value.findIndex(j => j.id === id);
  if (index !== -1) {
    jornadas.value[index] = { ...jornadas.value[index], ...jornada };
  }
};

const deleteJornada = (id: number) => {
  jornadas.value = jornadas.value.filter(j => j.id !== id);
};
</script>

<template>
  <div>
    <ContenedorJornada
      :jornadas="jornadas"
      @add-jornada="addJornada"
      @update-jornada="updateJornada"
      @delete-jornada="deleteJornada"
    />
  </div>
</template>
