// src/entidades/Imagenp.ts
// Codigo Creado por Jordan Lema 

export interface ImagenProducto {
  id: string; 
  obtener_id: string; 
  url: string;
  descripcion_alternativa?: string; 
}


export type CreateImagenProductoInput = Omit<ImagenProducto, 'id'>;