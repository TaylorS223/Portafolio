import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users'
import type { User } from '../types/User'

function Users() {
  const {
    data,
    isLoading,
    error,
    refetch,
    dataUpdatedAt
  } = useQuery<User[]>({
    queryKey: ['users'],
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
