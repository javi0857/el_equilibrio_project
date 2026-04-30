import { useState, useEffect } from 'react'
import { drawTeams } from '../utils/drawTeams'

export function TeamDrawer({ players, onDraw }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [numTeams, setNumTeams] = useState(2)
  const [teamNames, setTeamNames] = useState(Array(2).fill(''))

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

  useEffect(() => {
    setTeamNames(prev => {
      const updated = Array(numTeams).fill('')
      for (let i = 0; i < Math.min(prev.length, numTeams); i++) {
        updated[i] = prev[i]
      }
      return updated
    })
  }, [numTeams])

  const updateTeamName = (index, value) => {
    setTeamNames(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleDraw = () => {
    if (selectedIds.length < numTeams) return
    const names = teamNames.map((n, i) => n.trim() || `Equipo ${i + 1}`)
    const result = drawTeams(selectedIds, players, numTeams, names)
    onDraw(result)
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[2px] h-full bg-[var(--accent)] opacity-60" />

      <div>
        <label className="block text-xs font-[var(--font-mono)] text-[var(--text-secondary)] mb-2 tracking-wider uppercase">
          Número de Equipos
        </label>
        <input
          type="number"
          min="2"
          max="10"
          value={numTeams}
          onChange={e => setNumTeams(Math.max(2, Math.min(10, Number(e.target.value))))}
          className="w-24 px-3 py-2 bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] font-[var(--font-mono)] text-sm focus:outline-none focus:border-[var(--accent)] transition text-center"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-[var(--font-mono)] text-[var(--text-secondary)] mb-2 tracking-wider uppercase">
          Nombres de Equipos
        </label>
        {teamNames.map((name, i) => (
          <input
            key={i}
            type="text"
            value={name}
            onChange={e => updateTeamName(i, e.target.value)}
            placeholder={`Equipo ${i + 1}`}
            className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] font-[var(--font-mono)] text-sm focus:outline-none focus:border-[var(--accent)] transition placeholder-[var(--text-muted)]"
          />
        ))}
      </div>

      <button
        onClick={handleSelectAll}
        className="text-xs font-[var(--font-mono)] text-[var(--text-muted)] hover:text-[var(--accent)] transition tracking-wider uppercase"
      >
        [{selectedIds.length === players.length ? 'Deseleccionar todos' : 'Seleccionar todos'}]
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
        {players.map(player => (
          <label
            key={player.id}
            className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-all duration-300 ${
              selectedIds.includes(player.id)
                ? 'border-[var(--accent)] bg-[var(--accent-glow)]'
                : 'border-[var(--border)] bg-[var(--bg-input)] hover:border-[var(--text-muted)]'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(player.id)}
              onChange={() => togglePlayer(player.id)}
              className="w-4 h-4 accent-[var(--accent)] bg-[var(--bg-primary)] border-[var(--border)] rounded-none"
            />
            <span className="text-sm font-[var(--font-mono)] text-[var(--text-primary)] flex-1">
              {player.name}
            </span>
            <span className="text-[10px] font-[var(--font-mono)] text-[var(--text-muted)]">
              A:{player.attack} D:{player.defense}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleDraw}
        disabled={selectedIds.length < numTeams}
        className="w-full bg-[var(--accent)] text-[var(--bg-primary)] py-3 font-[var(--font-display)] text-xl tracking-[0.2em] uppercase hover:bg-[var(--accent-hover)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed relative group overflow-hidden"
      >
        <span className="relative z-10">Sortear ({selectedIds.length})</span>
        <div className="absolute inset-0 bg-[var(--accent-hover)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </button>
    </div>
  )
}
