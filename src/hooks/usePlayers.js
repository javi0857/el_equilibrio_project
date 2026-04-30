import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'el_equilibrio_project-players'

function loadPlayers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function savePlayers(players) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
}

export function usePlayers() {
  const [players, setPlayers] = useState(loadPlayers)

  useEffect(() => {
    savePlayers(players)
  }, [players])

  const addPlayer = useCallback((player) => {
    setPlayers(prev => [...prev, { ...player, id: Date.now().toString() }])
  }, [])

  const updatePlayer = useCallback((id, updates) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const deletePlayer = useCallback((id) => {
    setPlayers(prev => prev.filter(p => p.id !== id))
  }, [])

  return { players, addPlayer, updatePlayer, deletePlayer }
}
