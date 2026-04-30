export function TeamResult({ teams }) {
  if (!teams || teams.length === 0) return null

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-2xl font-[var(--font-display)] tracking-wide uppercase text-[var(--text-primary)]">
        Resultado del Sorteo
      </h3>
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
    </div>
  )
}
