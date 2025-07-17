<template>
  <div class="contenedor-modulo">
    <h2 class="titulo-modulo">Gestión de Jornadas</h2>

    <JornadaForm :jornadaEditar="jornadaEditando" @guardar="guardarJornada" />

    <div v-if="jornadas.length === 0" class="lista-items">
      <p>No hay jornadas registradas.</p>
    </div>

    <div v-else class="lista-items">
      <JornadaItem
        v-for="j in jornadas"
        :key="j.id"
        :jornada="j"
        @editar="editarJornada"
        @eliminar="eliminarJornada"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IJornada } from '../../types/jornada';

import JornadaItem from './JornadaItem.vue';
import JornadaForm from './JornadaForm.vue';

const {jornadas} = defineProps<{
  jornadas: IJornada[];
}>();

const emit = defineEmits<{
  (e: 'add-jornada', jornada: IJornada): void;
  (e: 'update-jornada', id: number, jornada: IJornada): void;
  (e: 'delete-jornada', id: number): void;
}>();

const jornadaEditando = ref<IJornada | undefined>(undefined);

function guardarJornada(j: IJornada) {
  if (jornadaEditando.value) {
    emit('update-jornada', j.id, j);
    jornadaEditando.value = undefined;
  } else {
    emit('add-jornada', j);
  }
}

function editarJornada(j: IJornada) {
  jornadaEditando.value = { ...j };
}

function eliminarJornada(id: number) {
  emit('delete-jornada', id);
}
</script>
