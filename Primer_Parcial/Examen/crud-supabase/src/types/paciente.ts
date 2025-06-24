export interface Paciente {
  id: number
  nombre: string
  apellido: string
  edad: number
  categoryId: number
}

export interface PacienteInput {
  nombre: string
  edad: number
  apellido: string
  categoryId: number
}

export interface PacienteUpdate {
  nombre?: string
  edad?: number
  apellido?: string
  categoryId?: number
}