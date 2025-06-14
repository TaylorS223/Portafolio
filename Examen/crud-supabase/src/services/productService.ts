import { Product } from '../types/product'
import { ProductRepository } from '../repositories/productRepository'

export class ProductService {
  static async getAll(): Promise<Product[]> {
    console.log(' Obteniendo todos los productos...')
    const products = ProductRepository.getAll()
    console.log(` ${products.length} productos encontrados`)
    return products
  }

  static async getById(id: number): Promise<Product | null> {
    console.log(` Buscando producto con ID ${id}...`)
    const product = ProductRepository.findById(id)
    if (!product) {
      console.warn(' Producto no encontrado')
      return null
    }
    return product
  }

  static async create(productInput: Omit<Product, 'id'>): Promise<Product> {
    console.log(' Creando producto...')
    const nuevo = ProductRepository.create(productInput)
    console.log(` Producto creado con ID ${nuevo.id}`)
    return nuevo
  }

  static async update(id: number, updates: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    console.log(` Actualizando producto con ID ${id}...`)
    const actualizado = ProductRepository.update(id, updates)
    if (!actualizado) {
      console.warn(' Producto no encontrado para actualizar')
      return null
    }
    console.log(' Producto actualizado')
    return actualizado
  }

  static async delete(id: number): Promise<boolean> {
    console.log(` Eliminando producto con ID ${id}...`)
    const eliminado = ProductRepository.delete(id)
    console.log(eliminado ? ' Producto eliminado' : ' Producto no encontrado')
    return eliminado
  }

  static async count(): Promise<number> {
    return ProductRepository.count()
  }

  static async searchByName(query: string): Promise<Product[]> {
    return ProductRepository.getAll().filter(p =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    )
  }

  static async getByCategory(categoryId: number): Promise<Product[]> {
    return ProductRepository.getAll().filter(p => p.categoria_id === categoryId)
  }
}
