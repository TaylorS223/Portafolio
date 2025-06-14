import { PacienteRepository } from '../repositories/pacienteRepository'
import type { Paciente, PacienteInput, PacienteUpdate } from '../types/paciente'

/**
 * Servicio de pacientes
 * Maneja la lógica de negocio y utiliza el PacienteRepository para la persistencia
 */
export class PacienteService {
  
  static async getAll(): Promise<Paciente[]> {
    console.log(' Obteniendo todos los pacientes...')
    const pacientes = PacienteRepository.getAll()
    console.log(` ${pacientes.length} pacientes obtenidos`)
    return pacientes
  }

  static async getById(id: number): Promise<Paciente | null> {
    console.log(` Buscando paciente con ID: ${id}`)
    const paciente = PacienteRepository.findById(id)
    if (paciente) {
      console.log(` Paciente encontrado: ${paciente.nombre} ${paciente.apellido}`)
      return paciente
    } else {
      console.log(` Paciente con ID ${id} no encontrado`)
      return null
    }
  }

  static async searchByName(nombre: string): Promise<Paciente[]> {
    console.log(` Buscando pacientes por nombre: "${nombre}"`)
    const pacientes = PacienteRepository.findByName(nombre)
    console.log(` ${pacientes.length} pacientes encontrados`)
    return pacientes
  }

  static async getByGender(genero: 'Masculino' | 'Femenino' | 'Otro'): Promise<Paciente[]> {
    console.log(` Obteniendo pacientes por género: ${genero}`)
    const pacientes = PacienteRepository.findByGender(genero)
    console.log(` ${pacientes.length} pacientes encontrados`)
    return pacientes
  }

  static async create(paciente: PacienteInput): Promise<void> {
    console.log(' Creando nuevo paciente:', paciente)
    const newPaciente = PacienteRepository.create(paciente)
    console.log(` Paciente creado con ID: ${newPaciente.id}`)
  }

  static async update(id: number, paciente: PacienteUpdate): Promise<void> {
    console.log(`Actualizando paciente ID ${id}:`, paciente)
    const updated = PacienteRepository.update(id, paciente)
    if (!updated) {
      throw new Error('Paciente no encontrado')
    }
    console.log(` Paciente ${id} actualizado exitosamente`)
  }

  static async delete(id: number): Promise<void> {
    console.log(` Eliminando paciente con ID: ${id}`)
    const deleted = PacienteRepository.delete(id)
    if (!deleted) {
      throw new Error('Paciente no encontrado')
    }
    console.log(` Paciente ${id} eliminado exitosamente`)
  }

  static async getCount(): Promise<number> {
    const count = PacienteRepository.count()
    console.log(` Total de pacientes: ${count}`)
    return count
  }
} 