import { type User } from '../types'

interface Props {
  users: User[]
}

export function UserList({users}: Props) {
  return (
    <table style={{width: '100%'}}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => (
          <tr key={user.id.value}>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}