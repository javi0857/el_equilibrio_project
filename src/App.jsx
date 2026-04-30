import { useState } from 'react'
import { usePlayers } from './hooks/usePlayers'
import { PlayerManager } from './components/PlayerManager'
import { TeamDrawer } from './components/TeamDrawer'
import { TeamResult } from './components/TeamResult'

function App() {
  const { players, addPlayer, updatePlayer, deletePlayer } = usePlayers()
  const [tab, setTab] = useState('players')
  const [teams, setTeams] = useState(null)

  const handleDraw = (result) => {
    setTeams(result)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Sorteo de Equipos
        </h1>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => { setTab('players'); setTeams(null) }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              tab === 'players'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Jugadores
          </button>
          <button
            onClick={() => setTab('draw')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              tab === 'draw'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Sortear
          </button>
        </div>

        {tab === 'players' && (
          <PlayerManager
            players={players}
            onAdd={addPlayer}
            onUpdate={updatePlayer}
            onDelete={deletePlayer}
          />
        )}

        {tab === 'draw' && (
          <div className="space-y-6">
            <TeamDrawer players={players} onDraw={handleDraw} />
            <TeamResult teams={teams} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
