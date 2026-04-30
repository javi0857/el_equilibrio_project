export function drawTeams(selectedPlayerIds, allPlayers, numTeams, teamNames = []) {
  const players = allPlayers
    .filter(p => selectedPlayerIds.includes(p.id))
    .map(p => ({
      ...p,
      totalLevel: (p.attack || 0) + (p.defense || 0)
    }))
    .sort((a, b) => b.totalLevel - a.totalLevel)

  const teams = Array.from({ length: numTeams }, () => ({
    players: [],
    totalAttack: 0,
    totalDefense: 0,
    totalLevel: 0
  }))

  let direction = 1
  let teamIndex = 0

  for (const player of players) {
    teams[teamIndex].players.push(player)
    teams[teamIndex].totalAttack += player.attack
    teams[teamIndex].totalDefense += player.defense
    teams[teamIndex].totalLevel += player.totalLevel

    if (direction === 1) {
      if (teamIndex < numTeams - 1) {
        teamIndex++
      } else {
        direction = -1
        teamIndex--
      }
    } else {
      if (teamIndex > 0) {
        teamIndex--
      } else {
        direction = 1
        teamIndex++
      }
    }
  }

  return teams.map((team, i) => ({
    name: teamNames[i] || `Equipo ${i + 1}`,
    players: team.players,
    avgAttack: team.players.length ? (team.totalAttack / team.players.length).toFixed(1) : 0,
    avgDefense: team.players.length ? (team.totalDefense / team.players.length).toFixed(1) : 0,
    totalLevel: team.totalLevel
  }))
}
