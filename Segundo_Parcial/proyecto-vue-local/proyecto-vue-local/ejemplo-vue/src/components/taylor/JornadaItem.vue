<template>
  <div class="item-card">
    <h3>{{ jornada.dia }} ({{ jornada.horaInicio }} - {{ jornada.horaFin }})</h3>
    <p>{{ jornada.descripcion }}</p>
    <div class="acciones-item">
      <button class="boton boton-editar" @click="$emit('editar', jornada)">Editar</button>
      <button class="boton boton-eliminar" @click="$emit('eliminar', jornada.id)">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.acciones-item {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>

<script setup lang="ts">
import type { IJornada } from '../../types/jornada';

defineProps<{
  jornada: IJornada;
}>();

defineEmits<{
  (e: 'editar', jornada: IJornada): void;
  (e: 'eliminar', id: number): void;
}>();
</script>
