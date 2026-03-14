import { useState, useEffect, useCallback, useRef } from 'react'
import LandingPage from './components/LandingPage'
import GameScreen from './components/GameScreen'
import VictoryScreen from './components/VictoryScreen'
import ToastManager from './components/ToastManager'
import { fetchLeaderboard, saveScore, db } from './lib/neon'

const LEADERBOARD_KEY = 'apikey-speedrun-leaderboard'

function getLocalLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || []
  } catch { return [] }
}

function saveLocalLeaderboard(entry) {
  const lb = getLocalLeaderboard()
  lb.push(entry)
  lb.sort((a, b) => a.time_ms - b.time_ms)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb.slice(0, 50)))
  return lb.slice(0, 50)
}

export default function App() {
  const [screen, setScreen] = useState('landing') // landing | game | victory
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [leaderboard, setLeaderboard] = useState(getLocalLeaderboard)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)
  const timerRef = useRef(null)

  // Fetch leaderboard from Supabase on mount
  useEffect(() => {
    if (db) {
      fetchLeaderboard().then(data => {
        if (data.length > 0) setLeaderboard(data)
      })
    }
  }, [])

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId.current
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts(t => t.filter(toast => toast.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(toast => toast.id !== id))
  }, [])

  useEffect(() => {
    if (screen === 'game' && startTime) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime)
      }, 50)
      return () => clearInterval(timerRef.current)
    }
  }, [screen, startTime])

  const handleStart = () => {
    setScreen('game')
    setStartTime(Date.now())
    setElapsed(0)
  }

  const handleVictory = () => {
    clearInterval(timerRef.current)
    const finalTime = Date.now() - startTime
    setElapsed(finalTime)
    setScreen('victory')
  }

  const handleSaveScore = async (name) => {
    const entry = {
      name,
      time_ms: elapsed,
      date: new Date().toISOString().split('T')[0]
    }

    // Save to Supabase if available
    if (db) {
      await saveScore(name, elapsed)
      const fresh = await fetchLeaderboard()
      if (fresh.length > 0) {
        setLeaderboard(fresh)
        return
      }
    }

    // Fallback to localStorage
    const updated = saveLocalLeaderboard(entry)
    setLeaderboard(updated)
  }

  const handlePlayAgain = async () => {
    setScreen('landing')
    setStartTime(null)
    setElapsed(0)
    if (db) {
      const fresh = await fetchLeaderboard()
      if (fresh.length > 0) {
        setLeaderboard(fresh)
        return
      }
    }
    setLeaderboard(getLocalLeaderboard())
  }

  return (
    <div className="min-h-screen bg-white relative">
      {screen === 'landing' && (
        <LandingPage leaderboard={leaderboard} onStart={handleStart} />
      )}
      {screen === 'game' && (
        <GameScreen
          elapsed={elapsed}
          onVictory={handleVictory}
          addToast={addToast}
        />
      )}
      {screen === 'victory' && (
        <VictoryScreen
          elapsed={elapsed}
          leaderboard={leaderboard}
          onSaveScore={handleSaveScore}
          onPlayAgain={handlePlayAgain}
        />
      )}
      <ToastManager toasts={toasts} onDismiss={removeToast} />
    </div>
  )
}
