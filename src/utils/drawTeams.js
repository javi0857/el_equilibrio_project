export function drawTeams(selectedPlayerIds, allPlayers, numTeams, teamNames = []) {
  const players = allPlayers
    .filter(p => selectedPlayerIds.includes(p.id))
    .map(p => ({
      ...p,
      totalLevel: (p.attack || 0) + (p.defense || 0)
    }))

  if (players.length === 0 || numTeams < 1) return []

  function variance(arr) {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length
    return arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length
  }

  function calculateScore(teams) {
    const totalLevels = teams.map(t => t.totalLevel)
    const defenses = teams.map(t => t.totalDefense)
    const attacks = teams.map(t => t.totalAttack)
    return variance(totalLevels) * 100 + variance(defenses) * 10 + variance(attacks) * 1
  }

  function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function distribute(playersShuffled) {
    const teams = Array.from({ length: numTeams }, () => ({
      players: [],
      totalAttack: 0,
      totalDefense: 0,
      totalLevel: 0
    }))

    for (const player of playersShuffled) {
      let bestTeamIndex = 0
      let bestScore = Infinity

      for (let i = 0; i < numTeams; i++) {
        teams[i].players.push(player)
        teams[i].totalAttack += player.attack
        teams[i].totalDefense += player.defense
        teams[i].totalLevel += player.totalLevel

        const score = calculateScore(teams)

        teams[i].players.pop()
        teams[i].totalAttack -= player.attack
        teams[i].totalDefense -= player.defense
        teams[i].totalLevel -= player.totalLevel

        if (score < bestScore) {
          bestScore = score
          bestTeamIndex = i
        }
      }

      teams[bestTeamIndex].players.push(player)
      teams[bestTeamIndex].totalAttack += player.attack
      teams[bestTeamIndex].totalDefense += player.defense
      teams[bestTeamIndex].totalLevel += player.totalLevel
    }

    return teams
  }

  const ITERATIONS = 1000
  let bestTeams = null
  let bestScore = Infinity

  for (let iter = 0; iter < ITERATIONS; iter++) {
    const shuffled = shuffle(players)
    const teams = distribute(shuffled)
    const score = calculateScore(teams)

    if (score < bestScore) {
      bestScore = score
      bestTeams = teams
    }
  }

  return bestTeams.map((team, i) => ({
    name: teamNames[i] || `Equipo ${i + 1}`,
    players: team.players,
    avgAttack: team.players.length ? (team.totalAttack / team.players.length).toFixed(1) : 0,
    avgDefense: team.players.length ? (team.totalDefense / team.players.length).toFixed(1) : 0,
    totalLevel: team.totalLevel
  }))
}
