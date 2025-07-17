<template>
  <form class="formulario-modulo" @submit.prevent="emitir">
    <input v-model="dia" placeholder="Día" required />
    <input v-model="horaInicio" type="time" required />
    <input v-model="horaFin" type="time" required />
    <textarea v-model="descripcion" placeholder="Descripción" required></textarea>
    <button class="boton" :class="{'boton-primario': !modoEdicion, 'boton-editar': modoEdicion}" type="submit">
      {{ modoEdicion ? 'Actualizar' : 'Agregar' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IJornada } from '../../types/jornada';

const props = defineProps<{
  jornadaEditar?: IJornada;
}>();

const emit = defineEmits<{
  (e: 'guardar', jornada: IJornada): void;
}>();

const dia = ref('');
const horaInicio = ref('');
const horaFin = ref('');
const descripcion = ref('');
const modoEdicion = ref(false);

watch(
  () => props.jornadaEditar,
  (j) => {
    if (j) {
      dia.value = j.dia;
      horaInicio.value = j.horaInicio;
      horaFin.value = j.horaFin;
      descripcion.value = j.descripcion;
      modoEdicion.value = true;
    }
  },
  { immediate: true }
);

function emitir() {
  const nuevaJornada: IJornada = {
    id: props.jornadaEditar?.id ?? Date.now(),
    dia: dia.value,
    horaInicio: horaInicio.value,
    horaFin: horaFin.value,
    descripcion: descripcion.value,
  };
  emit('guardar', nuevaJornada);
  dia.value = '';
  horaInicio.value = '';
  horaFin.value = '';
  descripcion.value = '';
  modoEdicion.value = false;
}
</script>
