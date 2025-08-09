import { supabase } from '../../SupabaseConfig';
import type { Cliente_id, ICliente } from '../types/ICliente';

const tabla = "clientes";

export async function crearCliente(crear: Cliente_id): Promise<ICliente>  {
    const {data, error} = await supabase
        .from(tabla)
        .insert([crear])
        .select()
        .single();

    if (error){
        console.log("No se pudo crear el Cliente: ", error);
    }

    return data as ICliente;
} 

export async function leerCliente(): Promise<ICliente[]> {
    const {data, error} = await supabase
        .from(tabla)
        .select();

    if(error){
        console.log("Fallo la lectura de PCliente", error)
    }

    return data as ICliente[];
}

export async function actualizarCliente(id: string, actualizar: ICliente): Promise<ICliente> {
    const {data, error} = await supabase
        .from(tabla)
        .update(actualizar)
        .eq("id", id)
        .select()
        .single();

    if(error){
        console.log("Ocurrio un error al actualizar", error)
    }

    return data as ICliente;
}

export async function borrarCliente(id: string): Promise<ICliente> {
    const {data, error} = await supabase
    .from(tabla)
    .delete()
    .eq("id", id)
    .select()
    .single()
    
    if (error){
        console.log("Ha ocurrido un error al momento de borrar el Cliente: ", error)
    }

    return data as ICliente;
}