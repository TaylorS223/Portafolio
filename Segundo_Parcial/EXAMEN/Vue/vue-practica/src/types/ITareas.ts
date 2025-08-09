import type { IJornada } from './IJornada';

export interface ITareas {
    id: string;
    usuarioId: string; // ID del usuario que creó la tarea
    nombre: string;
    horaInicio: string;
    horaFin: string;
    IJornada: IJornada; // Jornada asociada a la tarea
}

export type Tareas_id = Omit<ITareas, 'id'>;
