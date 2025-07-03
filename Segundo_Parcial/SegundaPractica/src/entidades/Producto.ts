// src/entidades/Producto.ts
// Código Creado por Taylor Steven Alava Gresely    

export interface Producto {
  producto_id: string;
  usuario_id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  creado: string;
  imagenUrl?: string;
}

export interface ProductoRequest {
  titulo: string;
  descripcion: string;
  precio: number;
  usuario_id: string;
}
