import { useState } from 'react'
import { formatTime } from '../lib/utils'

export default function VictoryScreen({ elapsed, leaderboard, onSaveScore, onPlayAgain }) {
  const [fakeKey] = useState(() => 'AIzaSy-LMAO-th1s-1s-n0t-r3al-n1c3-try-' + Math.random().toString(36).slice(2, 8))
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSave = async () => {
    if (!name.trim() || saving) return
    setSaving(true)
    await onSaveScore(name.trim())
    setSaving(false)
    setSaved(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Google-style top nav */}
      <nav className="h-16 border-b border-gborder flex items-center px-6 shrink-0">
        <div className="flex items-center gap-2.5">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path fill="#34A853" d="M2 17l10 5 10-5"/>
            <path fill="#FBBC04" d="M2 12l10 5 10-5"/>
          </svg>
          <span className="text-base font-medium text-gdark">Google Cloud</span>
          <span className="text-base text-gray-400 font-light ml-1">|</span>
          <span className="text-base text-gray-600 ml-1">API Key Speedrun</span>
        </div>
      </nav>

      {/* Success banner */}
      <div className="bg-gradient-to-r from-ggreen to-emerald-500 text-white">
        <div style={{ maxWidth: '896px', margin: '0 auto' }} className=" px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            API Key Generated
          </div>
          <h1 className="text-4xl font-normal mb-2 tracking-tight">
            You survived the gauntlet!
          </h1>
          <p className="text-green-100 text-lg">
            You navigated every dark pattern Google Cloud could throw at you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '896px', margin: '0 auto' }} className=" w-full px-8 py-10 flex-1">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Time card */}
          <div className="border border-gborder rounded-lg overflow-hidden">
            <div className="bg-gsidebar px-6 py-3 border-b border-gborder">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Time</span>
            </div>
            <div className="p-6 text-center">
              <div className="text-5xl font-mono font-bold text-gblue mb-2">
                {formatTime(elapsed)}
              </div>
              <p className="text-sm text-gray-400">
                {elapsed < 180000 ? 'Speed demon!' : elapsed < 360000 ? 'Well done!' : elapsed < 600000 ? 'Not bad!' : 'Room for improvement!'}
              </p>
            </div>
          </div>

          {/* Save score card */}
          <div className="border border-gborder rounded-lg overflow-hidden">
            <div className="bg-gsidebar px-6 py-3 border-b border-gborder">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Save to Global Leaderboard</span>
            </div>
            <div className="p-6">
              {!saved ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                    maxLength={20}
                    className="w-full border border-gborder rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue focus:border-transparent"
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full px-6 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                      saving ? 'bg-gray-300 text-gray-500' : 'bg-gblue text-white hover:bg-blue-600'
                    }`}
                  >
                    {saving ? 'Saving...' : 'Save Score'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 rounded-lg p-4 text-sm">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Score saved to global leaderboard!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Key display */}
        <div className="mt-8 border border-gborder rounded-lg overflow-hidden">
          <div className="bg-gsidebar px-6 py-3 border-b border-gborder flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your API Key</span>
            <button
              onClick={handleCopy}
              className="text-gblue text-xs font-medium hover:underline cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy</>
              )}
            </button>
          </div>
          <div className="bg-[#1e1e1e] p-5">
            <code className="text-green-400 text-sm font-mono break-all select-all">
              {fakeKey}
            </code>
          </div>
          <div className="bg-gsidebar px-6 py-2 border-t border-gborder">
            <p className="text-xs text-gray-400">
              This is obviously not a real API key. Please don't try to use it.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onPlayAgain}
            className="bg-gblue text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Play Again
          </button>
          <button
            onClick={onPlayAgain}
            className="text-gblue text-sm font-medium hover:underline cursor-pointer"
          >
            Back to Leaderboard
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gborder bg-gsidebar mt-auto">
        <div style={{ maxWidth: '896px', margin: '0 auto' }} className=" px-8 py-4 text-xs text-gray-400">
          No affiliation with Google. This is a parody.
        </div>
      </div>
    </div>
  )
}
