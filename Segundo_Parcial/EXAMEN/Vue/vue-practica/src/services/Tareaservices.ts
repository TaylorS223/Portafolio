import { supabase } from '../../../../React/react-practica/SupabaseConfig';
import type { ITareas } from '../types/ITareas';
import type { IJornada } from '../types/IJornada';

const tabla = "tareas";

export async function obtenerTareas(): Promise<ITareas[]> {
    const { data, error } = await supabase
        .from(tabla)
        .select('*');   
    if (error) {
        throw new Error(`Error fetching tareas: ${error.message}`);
    }
    return data as ITareas[];
}

export async function obtenerJornadas(): Promise<IJornada[]> {
    const { data, error } = await supabase
        .from('jornadas')
        .select('*');
    if (error) {
        throw new Error(`Error fetching jornadas: ${error.message}`);
    }
    return data as IJornada[];
}
