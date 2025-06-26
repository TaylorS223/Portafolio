import type { User } from '../types/User'

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://randomuser.me/api/?results=10')
  if (!res.ok) throw new Error('Error al obtener usuarios')
  const data = await res.json()
  return data.results
}