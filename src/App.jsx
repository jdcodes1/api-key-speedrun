import { useState, useEffect, useCallback, useRef } from 'react'
import LandingPage from './components/LandingPage'
import GameScreen from './components/GameScreen'
import VictoryScreen from './components/VictoryScreen'
import ToastManager from './components/ToastManager'

const LEADERBOARD_KEY = 'apikey-speedrun-leaderboard'

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || []
  } catch { return [] }
}

function saveToLeaderboard(entry) {
  const lb = getLeaderboard()
  lb.push(entry)
  lb.sort((a, b) => a.time_ms - b.time_ms)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb.slice(0, 50)))
  return lb.slice(0, 50)
}

export default function App() {
  const [screen, setScreen] = useState('landing') // landing | game | victory
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [leaderboard, setLeaderboard] = useState(getLeaderboard)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)
  const timerRef = useRef(null)

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

  const handleSaveScore = (name) => {
    const updated = saveToLeaderboard({
      name,
      time_ms: elapsed,
      date: new Date().toISOString().split('T')[0]
    })
    setLeaderboard(updated)
  }

  const handlePlayAgain = () => {
    setScreen('landing')
    setStartTime(null)
    setElapsed(0)
    setLeaderboard(getLeaderboard())
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
