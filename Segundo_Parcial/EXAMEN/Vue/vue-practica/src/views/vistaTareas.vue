<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IJornada} from '../types/IJornada';
import type { ITareas } from '../types/ITareas';
import { obtenerJornadas, obtenerTareas } from '../services/Tareaservices';

const jornadas = ref<IJornada[]>([]);
const tareas = ref<ITareas[]>([]);

onMounted(async () => {
  jornadas.value = await obtenerJornadas();
  tareas.value = await obtenerTareas();
});

function tareasPorJornada(horario: string): ITareas[] {
  return tareas.value.filter(t => t.IJornada.horario === horario);
}
</script>

<template>
  <div>
    <h1>Agenda de Tareas</h1>
    <div v-for="jornada in jornadas" :key="jornada.id" style="margin-bottom: 2em;">
      <h2>{{ jornada.horario }}</h2>
      <div v-if="tareasPorJornada(jornada.horario).length > 0">
        <div v-for="tarea in tareasPorJornada(jornada.horario)" :key="tarea.id" style="margin-left: 1em;">
          <p><strong>{{ tarea.nombre }}</strong></p>
          <p>{{ tarea.horaInicio }} - {{ tarea.horaFin }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay tareas para esta jornada.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

p {
  margin: 0.2rem 0;
}
</style>
