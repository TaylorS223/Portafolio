// src/servicios/subidaImagenService.ts
//codigo creado por Jordan Lema

import { supabase } from '../SupabaseConfig';

async function validarProductoUsuario(productoId: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) throw new Error('No hay sesión activa');
  const userId = session.user.id;
  const { data, error } = await supabase
    .from('producto')
    .select('producto_id')
    .eq('producto_id', productoId)
    .eq('usuario_id', userId)
    .single();
  if (error || !data) throw new Error('Producto no encontrado o no pertenece al usuario');
  return userId;
}

export async function subirImagenProducto(file: File, productoId: string): Promise<string | null> {
  try {
    const userId = await validarProductoUsuario(productoId);
    const nombreArchivo = `${userId}/${productoId}_${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('imagenproducto')
      .upload(nombreArchivo, file);

    if (uploadError) {
      console.error('Error subiendo imagen:', uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('imagenproducto')
      .getPublicUrl(nombreArchivo);

    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from('imagenproducto')
      .insert({
        obtener_id: productoId,
        url: publicUrl,
        descripcion_alternativa: file.name,
      });

    if (dbError) {
      console.error('Error guardando imagen en DB:', dbError);
      return null;
    }

    return publicUrl;
  } catch (error) {
    console.error('Error en subirImagenProducto:', error);
    return null;
  }
}
