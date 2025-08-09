import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/obtener_usuario'
import type { Usuario } from '../types/Usuario'

function Users() {
  const {
    data,
    isLoading,
    error,
    refetch,
    dataUpdatedAt
  } = useQuery<Usuario[]>({
    queryKey: ['Usuario'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p>⏳ Cargando usuarios…</p>
  if (error)     return <p>❌ Ups, error al cargar usuarios.</p>

  return (
    <>
      <button onClick={() => refetch()}>🔄 Refrescar</button>
      <small>
        Última actualización: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </small>

      <ul>
        {data?.map((u) => (
          <li key={u.login.uuid}>
            {u.name.first} {u.name.last} — <em>{u.email}</em>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Users
