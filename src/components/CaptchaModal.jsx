import { useState, useMemo, useCallback } from 'react'
import { shuffle } from '../lib/utils'
import { Spinner } from '../lib/utils'

const themes = [
  {
    prompt: 'API keys',
    targetLabel: 'key',
    imagePool: [
      { emoji: '🔑', label: 'key' }, { emoji: '🗝️', label: 'key' },
      { emoji: '🔐', label: 'lock' }, { emoji: '🔒', label: 'lock' },
      { emoji: '🔓', label: 'lock' }, { emoji: '📊', label: 'chart' },
      { emoji: '📈', label: 'chart' }, { emoji: '🎨', label: 'art' },
      { emoji: '🖼️', label: 'art' }, { emoji: '🔧', label: 'tool' },
      { emoji: '⚙️', label: 'gear' }, { emoji: '💻', label: 'computer' },
      { emoji: '🖥️', label: 'computer' }, { emoji: '📱', label: 'phone' },
      { emoji: '☁️', label: 'cloud' }, { emoji: '🌐', label: 'globe' },
    ],
  },
  {
    prompt: 'clouds',
    targetLabel: 'cloud',
    imagePool: [
      { emoji: '☁️', label: 'cloud' }, { emoji: '🌤️', label: 'cloud' },
      { emoji: '⛅', label: 'cloud' }, { emoji: '🌥️', label: 'cloud' },
      { emoji: '🌧️', label: 'rain' }, { emoji: '⛈️', label: 'storm' },
      { emoji: '🌈', label: 'rainbow' }, { emoji: '❄️', label: 'snow' },
      { emoji: '🌊', label: 'wave' }, { emoji: '🔥', label: 'fire' },
      { emoji: '💨', label: 'wind' }, { emoji: '🌀', label: 'cyclone' },
      { emoji: '☀️', label: 'sun' }, { emoji: '🌙', label: 'moon' },
      { emoji: '⭐', label: 'star' }, { emoji: '🌍', label: 'earth' },
    ],
  },
  {
    prompt: 'locks',
    targetLabel: 'lock',
    imagePool: [
      { emoji: '🔒', label: 'lock' }, { emoji: '🔓', label: 'lock' },
      { emoji: '🔐', label: 'lock' }, { emoji: '🔑', label: 'key' },
      { emoji: '🗝️', label: 'key' }, { emoji: '🛡️', label: 'shield' },
      { emoji: '⚔️', label: 'sword' }, { emoji: '🏰', label: 'castle' },
      { emoji: '🚪', label: 'door' }, { emoji: '🪟', label: 'window' },
      { emoji: '📦', label: 'box' }, { emoji: '💎', label: 'gem' },
      { emoji: '🎯', label: 'target' }, { emoji: '🔔', label: 'bell' },
      { emoji: '📌', label: 'pin' }, { emoji: '🧲', label: 'magnet' },
    ],
  },
]

const TOTAL_ROUNDS = 3

export default function CaptchaModal({ onComplete, addToast }) {
  const [round, setRound] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [loading, setLoading] = useState(false)

  const roundThemes = useMemo(() => shuffle(themes).slice(0, TOTAL_ROUNDS), [])

  const currentTheme = roundThemes[round] || roundThemes[0]
  const grid = useMemo(() => shuffle(currentTheme.imagePool).slice(0, 9), [round, currentTheme])

  const correctIndices = grid
    .map((item, i) => item.label === currentTheme.targetLabel ? i : -1)
    .filter(i => i !== -1)

  const toggle = (idx) => {
    if (loading) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const handleVerify = useCallback(() => {
    const selectedArr = [...selected].sort()
    const correct = [...correctIndices].sort()
    const isCorrect = selectedArr.length === correct.length &&
      selectedArr.every((v, i) => v === correct[i])

    if (isCorrect) {
      if (round + 1 >= TOTAL_ROUNDS) {
        addToast('Verification complete!', 'success')
        onComplete()
      } else {
        setLoading(true)
        addToast(`Round ${round + 1} passed! Loading next challenge...`, 'info')
        setTimeout(() => {
          setRound(r => r + 1)
          setSelected(new Set())
          setLoading(false)
        }, 3000 + Math.random() * 2000)
      }
    } else {
      addToast('Incorrect selection. Please try again.', 'error')
      setSelected(new Set())
    }
  }, [selected, correctIndices, round, onComplete, addToast])

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[420px]">
        <div className="p-5 border-b border-gborder bg-gblue rounded-t-xl">
          <h2 className="text-white font-medium text-base">Verify you're not a robot</h2>
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < round ? 'bg-green-400' : i === round ? 'bg-white' : 'bg-blue-400/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-gdark font-medium mb-2">
            Round {round + 1}/{TOTAL_ROUNDS}: Select all images containing <strong>{currentTheme.prompt}</strong>
          </p>
          <p className="text-xs text-gray-400 mb-5">
            Click on tiles that match the description.
          </p>

          {loading ? (
            <div className="h-[280px] flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 text-gblue"><Spinner size="lg" /></div>
                <p className="text-sm text-gray-500">Loading new images...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {grid.map((item, i) => (
                <button
                  key={`${round}-${i}`}
                  onClick={() => toggle(i)}
                  className={`w-full aspect-square rounded-lg border-2 flex items-center justify-center text-3xl transition-all cursor-pointer ${
                    selected.has(i)
                      ? 'border-gblue bg-blue-50 ring-2 ring-gblue/30'
                      : 'border-gborder hover:border-gray-400 bg-gray-50'
                  }`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              loading ? 'bg-gray-200 text-gray-400' : 'bg-gblue text-white hover:bg-blue-600'
            }`}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}
