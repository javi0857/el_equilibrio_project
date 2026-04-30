import { useState } from 'react'
import { PlayerForm } from './PlayerForm'
import { PlayerList } from './PlayerList'

export function PlayerManager({ players, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)

  const handleSubmit = (data) => {
    if (editing) {
      onUpdate(editing.id, data)
      setEditing(null)
    } else {
      onAdd(data)
    }
  }

  const handleEdit = (player) => {
    setEditing(player)
  }

  const handleCancelEdit = () => {
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {editing ? 'Editar Jugador' : 'Nuevo Jugador'}
        </h3>
        <PlayerForm
          initialData={editing}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Actualizar' : 'Crear Jugador'}
        />
        {editing && (
          <button
            onClick={handleCancelEdit}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar edición
          </button>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Jugadores ({players.length})
        </h3>
        <PlayerList
          players={players}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}
