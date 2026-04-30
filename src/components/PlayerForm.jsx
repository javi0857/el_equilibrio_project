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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre del jugador"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ataque: {attack}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={attack}
            onChange={e => setAttack(e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Defensa: {defense}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={defense}
            onChange={e => setDefense(e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {submitLabel || 'Guardar'}
      </button>
    </form>
  )
}
