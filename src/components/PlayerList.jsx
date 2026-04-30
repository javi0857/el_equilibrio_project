export function PlayerList({ players, onEdit, onDelete }) {
  if (players.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-[var(--border)]">
        <p className="text-[var(--text-muted)] font-[var(--font-mono)] text-sm uppercase tracking-wider">
          No hay jugadores creados
        </p>
        <p className="text-[var(--text-muted)] font-[var(--font-mono)] text-xs mt-2 opacity-60">
          Agrega jugadores para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {players.map((player, index) => (
        <div
          key={player.id}
          className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 hover:border-[var(--accent)]/30 transition-all duration-300 group animate-slide-in stagger-[var(--stagger)]"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex-1">
            <p className="font-[var(--font-display)] text-lg tracking-wide text-[var(--text-primary)]">
              {player.name}
            </p>
            <div className="flex gap-4 mt-1">
              <span className="text-xs font-[var(--font-mono)] text-[var(--accent)]">
                ATK:{player.attack}
              </span>
              <span className="text-xs font-[var(--font-mono)] text-[var(--text-secondary)]">
                DEF:{player.defense}
              </span>
              <span className="text-xs font-[var(--font-mono)] text-[var(--text-muted)]">
                NIV:{player.attack + player.defense}
              </span>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(player)}
              className="text-xs font-[var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-1 border border-[var(--border)] hover:border-[var(--accent)] transition uppercase tracking-wider"
              aria-label={`Editar ${player.name}`}
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(player.id)}
              className="text-xs font-[var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--danger)] px-3 py-1 border border-[var(--border)] hover:border-[var(--danger)] transition uppercase tracking-wider"
              aria-label={`Eliminar ${player.name}`}
            >
              Borrar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
