<script setup lang="ts">
import VistaEstudiante from './views/Vista-estudiante.vue';
import VistaTareas from './views/Vista-tareas.vue';
import VistaJornada from './views/Vista-jornada.vue';
</script>

<template>
  <div class="contenedor-principal">
    <VistaEstudiante />
    <VistaTareas />
    <VistaJornada />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
