<template>
  <div class="contenedor-modulo">
    <h2 class="titulo-modulo">Gestión de Tareas</h2>

    <TareaForm :tareaEditar="tareaEditando" @guardar="guardarTarea" />

    <div v-if="tareas.length === 0" class="lista-items">
      <p>No hay tareas registradas.</p>
    </div>

    <div v-else class="lista-items">
      <TareaItem
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @editar="editarTarea"
        @eliminar="eliminarTarea"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ITareas } from '../../types/tareas';

import TareaItem from './TareaItem.vue';
import TareaForm from './TareaForm.vue';

const {tareas} = defineProps<{
  tareas: ITareas[];
}>();

const emit = defineEmits<{
  (e: 'add-tarea', tarea: ITareas): void;
  (e: 'update-tarea', id: number, tarea: ITareas): void;
  (e: 'delete-tarea', id: number): void;
}>();

const tareaEditando = ref<ITareas | undefined>(undefined);

function guardarTarea(tarea: ITareas) {
  if (tareaEditando.value) {
    emit('update-tarea', tarea.id, tarea);
    tareaEditando.value = undefined;
  } else {
    emit('add-tarea', tarea);
  }
}

function editarTarea(tarea: ITareas) {
  tareaEditando.value = { ...tarea };
}

function eliminarTarea(id: number) {
  emit('delete-tarea', id);
}
</script>

