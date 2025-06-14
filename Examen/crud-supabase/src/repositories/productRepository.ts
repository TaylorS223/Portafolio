import type { Product } from '../types/product'
import { database } from '../types/database'

export class ProductRepository {
  static getAll(): Product[] {
    return database.products
  }

  static findById(id: number): Product | undefined {
    return database.products.find(p => p.id === id)
  }

  static create(data: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...data,
      id: this.getNextId()
    }
    database.products.push(newProduct)
    return newProduct
  }

  static update(id: number, updates: Partial<Omit<Product, 'id'>>): Product | null {
    const product = this.findById(id)
    if (!product) return null
    Object.assign(product, updates)
    return product
  }

  static delete(id: number): boolean {
    const index = database.products.findIndex(p => p.id === id)
    if (index === -1) return false
    database.products.splice(index, 1)
    return true
  }

  static getNextId(): number {
    const ids = database.products.map(p => p.id)
    return ids.length ? Math.max(...ids) + 1 : 1
  }

  static count(): number {
    return database.products.length
  }
}
