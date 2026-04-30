import { useRef } from 'react'
import html2canvas from 'html2canvas'

export function TeamResult({ teams, onRedraw }) {
  if (!teams || teams.length === 0) return null

  const exportRef = useRef(null)

  const handleExport = async () => {
    if (!exportRef.current) return
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: '#ffffff',
      scale: 2
    })
    const link = document.createElement('a')
    link.download = 'equipos-sorteados.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-[var(--font-display)] tracking-wide uppercase text-[var(--text-primary)]">
          Resultado del Sorteo
        </h3>
        <div className="flex gap-2">
          {onRedraw && (
            <button
              onClick={onRedraw}
              className="text-xs font-[var(--font-mono)] text-[var(--accent)] border border-[var(--accent)] px-4 py-2 hover:bg-[var(--accent-glow)] transition tracking-wider uppercase"
            >
              Re-sortear
            </button>
          )}
          <button
            onClick={handleExport}
            className="text-xs font-[var(--font-mono)] text-[var(--accent)] border border-[var(--accent)] px-4 py-2 hover:bg-[var(--accent-glow)] transition tracking-wider uppercase"
          >
            Exportar PNG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team, i) => (
          <div
            key={i}
            className="bg-[var(--bg-card)] border border-[var(--border)] p-5 relative overflow-hidden animate-slide-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent)] opacity-60" />
            <h4 className="font-[var(--font-display)] text-xl tracking-wider uppercase text-[var(--accent)] mb-3">
              {team.name}
            </h4>
            <div className="space-y-2 mb-4">
              {team.players.map(p => (
                <div key={p.id} className="flex justify-between items-center py-1 border-b border-[var(--border)]/50 last:border-0">
                  <span className="text-sm font-[var(--font-mono)] text-[var(--text-primary)]">{p.name}</span>
                  <span className="text-[10px] font-[var(--font-mono)] text-[var(--text-muted)]">
                    A:{p.attack} D:{p.defense}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-[var(--border)]">
              <div className="grid grid-cols-3 gap-2 text-[10px] font-[var(--font-mono)] text-[var(--text-muted)] uppercase tracking-wider">
                <div>
                  <span className="block text-[var(--accent)] text-sm font-bold">{team.avgAttack}</span>
                  ATK
                </div>
                <div>
                  <span className="block text-[var(--accent)] text-sm font-bold">{team.avgDefense}</span>
                  DEF
                </div>
                <div>
                  <span className="block text-[var(--accent)] text-sm font-bold">{team.totalLevel}</span>
                  NIV
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          backgroundColor: '#0a0a0a',
          padding: '40px',
          width: '900px',
          color: '#e8e4e0'
        }}
      >
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#00ff88', textShadow: '0 0 10px #00ff88, 0 0 20px rgba(0,255,136,0.3)', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Equipos Sorteados
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: teams.length > 1 ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {teams.map((team, i) => (
            <div key={i} style={{ backgroundColor: '#1a1a1a', border: '2px solid #00ff88', boxShadow: '0 0 15px rgba(0,255,136,0.2)', padding: '24px', borderRadius: '4px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#00ff88' }} />
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#00ff88', textShadow: '0 0 8px #00ff88', marginBottom: '16px', textTransform: 'uppercase' }}>
                {team.name}
              </h3>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', marginBottom: '20px' }}>
                {team.players.map((p, idx) => (
                  <div key={p.id} style={{ marginBottom: '6px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{idx + 1}.</span>
                    <span style={{ color: '#e8e4e0' }}>{p.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#8a8580', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <div>
                  <span style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '20px', display: 'block', marginBottom: '4px' }}>{team.avgAttack}</span>
                  Ataque Est.
                </div>
                <div>
                  <span style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '20px', display: 'block', marginBottom: '4px' }}>{team.avgDefense}</span>
                  Defensa Est.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
