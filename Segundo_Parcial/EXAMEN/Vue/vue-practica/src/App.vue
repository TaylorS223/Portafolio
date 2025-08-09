<script setup lang="ts">
import { ref } from 'vue';
import Cliente from './components/Cliente.vue';
import type { IJornada} from './types/IJornada';
import type { ITareas } from './types/ITareas';

const jornadas = ref<IJornada[]>([
  { id: '1', horario: 'Mañana' },
  { id: '2', horario: 'Tarde' }
]);

const tareas = ref<ITareas[]>([
  {
    id: 't1',
    usuarioId: 'u1',
    nombre: 'Registro y bienvenida',
    horaInicio: '9:00 am',
    horaFin: '12:00 am',
    IJornada: { id: '1', horario: 'Mañana' }
  }, 
  {
    id: 't2',
    usuarioId: 'u1',
    nombre: 'Networking laboral',
    horaInicio: '3:00 pm',
    horaFin: '5:00 pm',
    IJornada: { id: '2', horario: 'Tarde' }
  },
  {
    id: 't3',
    usuarioId: 'u2',
    nombre: 'Reunión de equipo',
    horaInicio: '10:00 am',
    horaFin: '11:00 am',
    IJornada: { id: '1', horario: 'Mañana' }
  }
]);
</script>

<template>
  <div id="app">
    <Cliente :jornadas="jornadas" :tareas="tareas" />
  </div>
</template>
