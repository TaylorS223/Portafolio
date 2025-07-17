<template>
  <div class="item-card estudiante-card" @click="emitirActualizacion">
    <div class="estudiante-header">
      <h3>{{ estudiante.nombre }} {{ estudiante.apellido }}</h3>
      <span class="edad-curso">{{ estudiante.edad }} años</span>
    </div>
    <p class="curso">{{ estudiante.curso }}</p>
    <div class="acciones-estudiante">
      <button class="boton boton-editar" @click.stop="emitirActualizacion">
        Actualizar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEstudiantes } from '../../types/estudiantes';

const props = defineProps<{
  estudiante: IEstudiantes;
}>();

const emit = defineEmits<{
  (e: 'update:estudiantes', updated: IEstudiantes): void;
}>();

function emitirActualizacion() {
  emit('update:estudiantes', props.estudiante);
}
</script>
