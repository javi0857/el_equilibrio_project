export function TeamResult({ teams }) {
  if (!teams || teams.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Resultado del sorteo</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{team.name}</h4>
            <div className="space-y-1 mb-3">
              {team.players.map(p => (
                <div key={p.id} className="text-sm text-gray-700 flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-gray-400 text-xs">
                    A:{p.attack} D:{p.defense}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              Promedio Ataque: {team.avgAttack} · Promedio Defensa: {team.avgDefense} · Nivel total: {team.totalLevel}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
