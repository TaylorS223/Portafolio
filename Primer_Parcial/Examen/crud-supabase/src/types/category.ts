export interface Category {
  id: number
  description: string
  created_at: string
}

export interface CategoryInput {
  description: string
}

export interface CategoryUpdate {
  description?: string
}
