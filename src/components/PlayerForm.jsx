import { useState } from 'react'

export function PlayerForm({ onSubmit, initialData, submitLabel }) {
  const [name, setName] = useState(initialData?.name || '')
  const [attack, setAttack] = useState(initialData?.attack ?? 5)
  const [defense, setDefense] = useState(initialData?.defense ?? 5)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), attack: Number(attack), defense: Number(defense) })
    if (!initialData) {
      setName('')
      setAttack(5)
      setDefense(5)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-[var(--font-mono)] text-[var(--text-secondary)] mb-2 tracking-wider uppercase">
          Nombre del Jugador
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] font-[var(--font-mono)] text-sm focus:outline-none focus:border-[var(--accent)] transition placeholder:text-[var(--text-muted)]"
          placeholder="Ingresa el nombre..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-[var(--font-mono)] text-[var(--text-secondary)] mb-2 tracking-wider uppercase">
            Ataque: <span className="text-[var(--accent)] font-bold">{attack}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={attack}
            onChange={e => setAttack(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[var(--text-muted)]">1</span>
            <span className="text-[10px] text-[var(--text-muted)]">10</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-[var(--font-mono)] text-[var(--text-secondary)] mb-2 tracking-wider uppercase">
            Defensa: <span className="text-[var(--accent)] font-bold">{defense}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={defense}
            onChange={e => setDefense(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[var(--text-muted)]">1</span>
            <span className="text-[10px] text-[var(--text-muted)]">10</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--accent)] text-[var(--bg-primary)] py-3 font-[var(--font-display)] text-lg tracking-widest uppercase hover:bg-[var(--accent-hover)] transition-all duration-300 relative group"
      >
        <span className="relative z-10">{submitLabel || 'Guardar'}</span>
        <div className="absolute inset-0 bg-[var(--accent-hover)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </button>
    </form>
  )
}
