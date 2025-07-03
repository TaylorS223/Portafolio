//codigo creado por David Alejandro Vilañez Palma

import { supabase } from '../SupabaseConfig';
import type { Cliente } from '../entidades/cliente';

export async function obtenerClientePorId(id: string): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from('cliente')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.warn('Cliente no encontrado en tabla cliente');
    return null;
  }

  const cliente: Cliente = {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
  };

  return cliente;
}

export async function verificarSesionYCliente(): Promise<Cliente | null> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session || !session.user) {
    console.warn('No hay sesión activa o error obteniendo la sesión:', sessionError);
    return null;
  }

  const userId = session.user.id;
  return await obtenerClientePorId(userId);
}
