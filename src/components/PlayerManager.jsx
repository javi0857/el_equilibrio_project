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
      <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-none p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[2px] h-full bg-[var(--accent)] opacity-60" />
        <h3 className="text-2xl font-[var(--font-display)] tracking-wide uppercase mb-1">
          {editing ? 'Editar Jugador' : 'Nuevo Jugador'}
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-[var(--font-mono)] mb-4">
          {editing ? 'Modificando registro existente' : 'Agregar al roster'}
        </p>
        <PlayerForm
          initialData={editing}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Actualizar' : 'Crear Jugador'}
        />
        {editing && (
          <button
            onClick={handleCancelEdit}
            className="mt-4 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition font-[var(--font-mono)] tracking-wider uppercase"
          >
            [Cancelar edición]
          </button>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-[var(--font-display)] tracking-wide uppercase mb-1">
          Roster ({players.length})
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-[var(--font-mono)] mb-4">
          Gestionar jugadores registrados
        </p>
        <PlayerList
          players={players}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      </section>
    </div>
  )
}
