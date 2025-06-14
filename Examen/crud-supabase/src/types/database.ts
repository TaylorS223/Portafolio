import type { Category } from './category'
import type { Product } from './product'

export interface JsonDatabase {
  categories: Category[]
  products: Product[]
}

export const database: JsonDatabase = {
  categories: [
    { id: 1, description: 'Electrónica', created_at: '2025-06-13' },
    { id: 2, description: 'Ropa', created_at: '2025-06-13' },
    { id: 3, description: 'Hogar', created_at: '2025-06-13' }
  ],
  products: [
    {
      id: 1,
      nombre: 'Audífonos Bluetooth',
      descripcion: 'Audífonos con cancelación de ruido',
      precio: 35.99,
      categoria_id: 1,
      imagen_url: 'https://example.com/audifonos.jpg',
      created_at: '2025-06-13'
    },
    {
      id: 2,
      nombre: 'Camiseta básica',
      descripcion: 'Camiseta de algodón, varios colores',
      precio: 9.5,
      categoria_id: 2,
      imagen_url: 'https://example.com/camiseta.jpg',
      created_at: '2025-06-13'
    }
  ]
}
