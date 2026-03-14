import { useState, useMemo } from 'react'

// Generate a grid of abstract images with descriptions
const imagePool = [
  { emoji: '🔑', label: 'key' },
  { emoji: '🗝️', label: 'key' },
  { emoji: '🔐', label: 'lock' },
  { emoji: '🔒', label: 'lock' },
  { emoji: '🔓', label: 'lock' },
  { emoji: '📊', label: 'chart' },
  { emoji: '📈', label: 'chart' },
  { emoji: '🎨', label: 'art' },
  { emoji: '🖼️', label: 'art' },
  { emoji: '🔧', label: 'tool' },
  { emoji: '⚙️', label: 'gear' },
  { emoji: '💻', label: 'computer' },
  { emoji: '🖥️', label: 'computer' },
  { emoji: '📱', label: 'phone' },
  { emoji: '☁️', label: 'cloud' },
  { emoji: '🌐', label: 'globe' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function CaptchaModal({ onComplete, addToast }) {
  const grid = useMemo(() => shuffle(imagePool).slice(0, 9), [])
  const [selected, setSelected] = useState(new Set())
  const [attempts, setAttempts] = useState(0)

  // The "correct" answer: select only the key emojis
  const correctIndices = grid
    .map((item, i) => item.label === 'key' ? i : -1)
    .filter(i => i !== -1)

  const toggle = (idx) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const handleVerify = () => {
    const selectedArr = [...selected].sort()
    const correct = correctIndices.sort()
    const isCorrect = selectedArr.length === correct.length &&
      selectedArr.every((v, i) => v === correct[i])

    if (isCorrect) {
      onComplete()
    } else {
      setAttempts(a => a + 1)
      if (attempts >= 1) {
        // After 2 failures, let them through anyway
        addToast('Verification passed (with reduced confidence).', 'warning')
        setTimeout(onComplete, 1000)
      } else {
        addToast('Incorrect selection. Please try again.', 'error')
        setSelected(new Set())
      }
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[400px]">
        <div className="p-5 border-b border-gborder bg-gblue rounded-t-xl">
          <h2 className="text-white font-medium">Verify you're not a robot</h2>
        </div>

        <div className="p-5">
          <p className="text-sm text-gdark font-medium mb-3">
            Select all images containing <strong>API keys</strong>
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Click on tiles that represent keys or key-like objects.
          </p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {grid.map((item, i) => (
              <button
                key={i}
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

          <button
            onClick={handleVerify}
            className="w-full bg-gblue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Verify
          </button>

          {attempts > 0 && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Attempt {attempts + 1}. Select only the key/key-shaped items.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
