// types/category.ts
export interface Category {
  id: number;
  nombre: string;
}

// types/product.ts
export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria_id: number
  imagen_url?: string
  created_at: string
}