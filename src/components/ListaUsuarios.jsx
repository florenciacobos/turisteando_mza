import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')

      if (error) {
        console.error('Error al cargar usuarios:', error.message)
      } else {
        setUsuarios(data)
      }

      setLoading(false)
    }

    fetchUsuarios()
  }, [])

  if (loading) return <p>Cargando usuarios...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <ul className="space-y-2">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="border p-2 rounded shadow">
              <p><strong>ID:</strong> {usuario.id}</p>
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaUsuarios
