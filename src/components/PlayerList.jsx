export function PlayerList({ players, onEdit, onDelete }) {
  if (players.length === 0) {
    return <p className="text-gray-400 text-center py-8">No hay jugadores creados</p>
  }

  return (
    <div className="space-y-2">
      {players.map(player => (
        <div key={player.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-900">{player.name}</p>
            <p className="text-sm text-gray-500">Ataque: {player.attack} · Defensa: {player.defense}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(player)}
              className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(player.id)}
              className="text-sm text-red-500 hover:text-red-700 px-2 py-1"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
