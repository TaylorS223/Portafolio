<template>
  <form class="formulario-modulo" @submit.prevent="emitir">
    <input v-model="titulo" placeholder="Título" required />
    <textarea v-model="descripcion" placeholder="Descripción" required></textarea>
    <label>
      <input type="checkbox" v-model="completado" />
      Completado
    </label>
    <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Agregar' }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ITareas } from '../../types/tareas';

const props = defineProps<{
  tareaEditar?: ITareas;
}>();

const emit = defineEmits<{
  (e: 'guardar', tarea: ITareas): void;
}>();

const titulo = ref('');
const descripcion = ref('');
const completado = ref(false);

const modoEdicion = ref(false);

watch(
  () => props.tareaEditar,
  (nueva) => {
    if (nueva) {
      titulo.value = nueva.titulo;
      descripcion.value = nueva.descripcion;
      completado.value = nueva.completado;
      modoEdicion.value = true;
    }
  },
  { immediate: true }
);

function emitir() {
  const nuevaTarea: ITareas = {
    id: props.tareaEditar?.id ?? Date.now(),
    titulo: titulo.value,
    descripcion: descripcion.value,
    completado: completado.value,
  };
  emit('guardar', nuevaTarea);
  titulo.value = '';
  descripcion.value = '';
  completado.value = false;
  modoEdicion.value = false;
}
</script>
