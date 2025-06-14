import type { database, getNextPacienteId } from '../types/database'
import type { Paciente, PacienteInput, PacienteUpdate } from '../types/paciente'

/**
 * Repository para manejar la persistencia de pacientes
 * Se encarga únicamente de las operaciones CRUD sobre el array de pacientes
 */
export class PacienteRepository {
  
  /**
   * Obtiene todos los pacientes
   */
  static getAll(): Paciente[] {
    return database.pacientes
  }

  /**
   * Busca un paciente por ID
   */
  static findById(id: number): Paciente | undefined {
    return database.pacientes.find(paciente => paciente.id === id)
  }

  /**
   * Busca pacientes por nombre (búsqueda parcial)
   */
  static findByName(nombre: string): Paciente[] {
    return database.pacientes.filter(paciente => 
      paciente.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(nombre.toLowerCase())
    )
  }

  /**
   * Agrega un nuevo paciente
   */
  static create(pacienteData: PacienteInput): Paciente {
    const newPaciente: Paciente = {
      ...pacienteData,
      id: getNextPacienteId()
    }
    
    database.pacientes.push(newPaciente)
    return newPaciente
  }

  /**
   * Actualiza un paciente existente
   */
  static update(id: number, updates: PacienteUpdate): Paciente | null {
    const index = database.pacientes.findIndex(paciente => paciente.id === id)
    
    if (index === -1) {
      return null
    }
    
    database.pacientes[index] = { 
      ...database.pacientes[index], 
      ...updates 
    }
    
    return database.pacientes[index]
  }

  /**
   * Elimina un paciente
   */
  static delete(id: number): boolean {
    const index = database.pacientes.findIndex(paciente => paciente.id === id)
    
    if (index === -1) {
      return false
    }
    
    database.pacientes.splice(index, 1)
    return true
  }

  /**
   * Cuenta total de pacientes
   */
  static count(): number {
    return database.pacientes.length
  }

  /**
   * Obtiene pacientes por género
   */
  static findByGender(genero: 'Masculino' | 'Femenino' | 'Otro'): Paciente[] {
    return database.pacientes.filter(paciente => paciente.genero === genero)
  }
} 