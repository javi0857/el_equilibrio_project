import { useState } from 'react'
import { drawTeams } from '../utils/drawTeams'

export function TeamDrawer({ players, onDraw }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [numTeams, setNumTeams] = useState(2)

  const togglePlayer = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === players.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(players.map(p => p.id))
    }
  }

  const handleDraw = () => {
    if (selectedIds.length < numTeams) return
    const result = drawTeams(selectedIds, players, numTeams)
    onDraw(result)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de equipos
          </label>
          <input
            type="number"
            min="2"
            max="10"
            value={numTeams}
            onChange={e => setNumTeams(Math.max(2, Math.min(10, Number(e.target.value))))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {selectedIds.length === players.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {players.map(player => (
            <label
              key={player.id}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition ${
                selectedIds.includes(player.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(player.id)}
                onChange={() => togglePlayer(player.id)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-800">{player.name}</span>
              <span className="text-xs text-gray-400 ml-auto">
                A:{player.attack} D:{player.defense}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={handleDraw}
          disabled={selectedIds.length < numTeams}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sortear ({selectedIds.length} jugadores)
        </button>
      </div>
    </div>
  )
}
