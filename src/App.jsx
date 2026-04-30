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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] noise-bg relative">
      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-6xl font-[var(--font-display)] tracking-wider text-center uppercase leading-none mb-2">
            El Equilibrio
          </h1>
          <p className="text-center text-[var(--text-muted)] text-xs font-[var(--font-mono)] tracking-[0.3em] uppercase">
            Team Balancing System
          </p>
          <div className="w-24 h-[2px] bg-[var(--accent)] mx-auto mt-4 opacity-60" />
        </header>

        <nav className="flex border-b border-[var(--border)] mb-8">
          <button
            onClick={() => { setTab('players'); setTeams(null) }}
            className={`px-6 py-3 text-sm font-[var(--font-mono)] tracking-wider uppercase transition-all duration-300 border-b-2 ${
              tab === 'players'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Jugadores ({players.length})
          </button>
          <button
            onClick={() => setTab('draw')}
            disabled={players.length < 2}
            className={`px-6 py-3 text-sm font-[var(--font-mono)] tracking-wider uppercase transition-all duration-300 border-b-2 ${
              tab === 'draw'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            Sortear
          </button>
        </nav>

        <main className="space-y-6">
          {tab === 'players' && (
            <div className="animate-fade-in">
              <PlayerManager
                players={players}
                onAdd={addPlayer}
                onUpdate={updatePlayer}
                onDelete={deletePlayer}
              />
            </div>
          )}

          {tab === 'draw' && (
            <div className="space-y-6 animate-fade-in">
              <TeamDrawer players={players} onDraw={handleDraw} />
              <TeamResult teams={teams} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
