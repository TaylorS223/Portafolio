DOCUMENTACION NUEVA

# Sistema JSON Simple para Pacientes y Categorías

Este proyecto ha sido simplificado para estudiantes. Ahora utiliza un objeto JSON simple en memoria con una arquitectura en capas clara y separada.

## 📁 Estructura del Proyecto
src/
├── types/
│ ├── database.ts # Define el objeto JSON con los datos
│ ├── category.ts # Interface para categorías
│ └── paciente.ts # Interface para pacientes
├── repositories/ # 🆕 Capa de acceso a datos
│ ├── categoryRepository.ts # CRUD para categorías
│ ├── pacienteRepository.ts # CRUD para pacientes
│ └── index.ts
├── services/ # Capa de lógica de negocio
│ ├── categoryService.ts # Lógica de negocio de categorías
│ ├── pacienteService.ts # Lógica de negocio de pacientes
│ └── index.ts
└── presentations/ # Capa de presentación (sin cambios)


## 🏗️ Arquitectura en 3 Capas

### 1. **📊 Capa de Datos (Repositories)**
- **Responsabilidad**: Manejo directo del objeto JSON
- **Archivos**: `repositories/categoryRepository.ts`, `repositories/pacienteRepository.ts`
- **Qué hace**: CRUD básico, búsquedas, conteos

```typescript
// Ejemplo: CategoryRepository
export class CategoryRepository {
  static getAll(): Category[] { /* ... */ }
  static findById(id: number): Category | undefined { /* ... */ }
  static create(data: CategoryInput): Category { /* ... */ }
  static update(id: number, updates: CategoryUpdate): Category | null { /* ... */ }
  static delete(id: number): boolean { /* ... */ }
  static count(): number { /* ... */ }
}

## 🏗️ Arquitectura en 3 Capas

### 1. **📊 Capa de Datos (Repositories)**
- **Responsabilidad**: Manejo directo del objeto JSON
- **Archivos**: `repositories/categoryRepository.ts`, `repositories/pacienteRepository.ts`
- **Qué hace**: CRUD básico, búsquedas, conteos

```typescript
// Ejemplo: CategoryRepository
export class CategoryRepository {
  static getAll(): Category[] { /* ... */ }
  static findById(id: number): Category | undefined { /* ... */ }
  static create(data: CategoryInput): Category { /* ... */ }
  static update(id: number, updates: CategoryUpdate): Category | null { /* ... */ }
  static delete(id: number): boolean { /* ... */ }
  static count(): number { /* ... */ }
}

⚙️ Capa de Servicios (Services)
Responsabilidad: Lógica de negocio y orquestación

Archivos: services/categoryService.ts, services/pacienteService.ts

Qué hace: Validaciones, logs, reglas de negocio, usa repositories

// Ejemplo: CategoryService
export class CategoryService {
  static async getAll(): Promise<Category[]> {
    console.log('📋 Obteniendo todas las categorías...')
    const categories = CategoryRepository.getAll()
    console.log(`✅ ${categories.length} categorías obtenidas`)
    return categories
  }
  // ... más métodos
}

// Ejemplo: CategoryService
export class CategoryService {
  static async getAll(): Promise<Category[]> {
    console.log('📋 Obteniendo todas las categorías...')
    const categories = CategoryRepository.getAll()
    console.log(`✅ ${categories.length} categorías obtenidas`)
    return categories
  }
  // ... más métodos
}

🎯 ¿Qué cambió?

✅ Separación por responsabilidades: Cada capa tiene un propósito claro

✅ Un archivo por entidad: CategoryRepository, PacienteRepository

✅ Fácil de entender: Cada archivo es pequeño y específico

✅ Escalable: Agregar nuevas entidades es simple

✅ Misma API en services: No se rompe el código existente

BASE DE DATOS
export const database = {
  categories: [
    { id: 1, description: 'Cardiología', created_at: '2025-06-13T12:00:00Z' },
    { id: 2, description: 'Pediatría', created_at: '2025-06-12T15:30:00Z' },
  ],
  pacientes: [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 30, categoryId: 1 },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', edad: 25, categoryId: 2 },
  ]
}

🔧 Cómo Usar
1. Desde Services (Recomendado para presentaciones)

import { CategoryService, PacienteService } from './services'

// Obtener todos
const categories = await CategoryService.getAll()
const pacientes = await PacienteService.getAll()

// Operaciones específicas
const paciente = await PacienteService.getById(1)
const pacientesFiltrados = await PacienteService.searchByNombre('Juan')
2. Desde Repositories (Para lógica de datos directa)


import { CategoryRepository, PacienteRepository } from './repositories'

// Acceso directo a datos (sin logs)
const categories = CategoryRepository.getAll()
const count = CategoryRepository.count()
const paciente = PacienteRepository.findById(1)