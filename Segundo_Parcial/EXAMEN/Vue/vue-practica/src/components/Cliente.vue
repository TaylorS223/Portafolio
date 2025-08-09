<script setup lang="ts">
import type { IJornada} from '../types/IJornada';
import type { ITareas } from '../types/ITareas';

defineProps<{
  jornadas: IJornada[],
  tareas: ITareas[]
}>();

</script>

<template>
  <div>
    <div v-for="jornada in jornadas" :key="jornada.id" style="margin-bottom: 2em;">
      <h2>{{ jornada.horario }}</h2>
      <div v-for="tarea in tareas.filter(t => t.IJornada?.horario === jornada.horario)" :key="tarea.id" style="margin-left: 1em;">
        <p><strong>{{ tarea.nombre }}</strong></p>
        <p>{{ tarea.horaInicio }} - {{ tarea.horaFin }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #2c3e50;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

p {
  margin: 0.2rem 0;
}
</style>
