import { useState } from 'react'

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const centis = Math.floor((ms % 1000) / 10)
  return `${minutes}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`
}

function getMedal(i) {
  if (i === 0) return '🥇'
  if (i === 1) return '🥈'
  if (i === 2) return '🥉'
  return `${i + 1}`
}

export default function LandingPage({ leaderboard, onStart }) {
  const [showRules, setShowRules] = useState(false)

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
        <div className="ml-auto flex items-center" style={{ gap: '16px' }}>
          <a href="https://github.com" target="_blank" rel="noopener" className="text-sm text-gblue hover:underline">GitHub</a>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#8e6abf', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 500 }}>
            U
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-r from-[#1a73e8] via-[#1a73e8] to-[#6c63ff] text-white">
          <div className="flex items-center gap-12" style={{ maxWidth: '1024px', margin: '0 auto', padding: '64px 32px' }}>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-ggreen animate-pulse"></span>
                Speedrun Challenge
              </div>
              <h1 className="text-5xl font-normal leading-tight mb-4 tracking-tight">
                Can you generate<br/>a Gemini API key?
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
                Navigate a labyrinth of menus, modals, and dark patterns to generate
                a (totally fake) API key. Your time is tracked. The global leaderboard is watching.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={onStart}
                  style={{
                    backgroundColor: '#fff',
                    color: '#1a73e8',
                    padding: '12px 32px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    border: 'none',
                  }}
                >
                  Begin Speedrun
                </button>
                <button
                  onClick={() => setShowRules(!showRules)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'rgba(255,255,255,0.9)',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {showRules ? 'Hide rules' : 'How it works'}
                </button>
              </div>
            </div>
            {/* Decorative illustration */}
            <div className="hidden lg:flex flex-col items-center gap-3 opacity-90">
              <div className="grid grid-cols-3 gap-2">
                {['🔑','🔒','☁️','⚡','🛡️','🔐','📊','🌐','🤖'].map((e, i) => (
                  <div key={i} className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/10">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showRules && (
            <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 32px 32px' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-sm text-blue-50 border border-white/10">
                <h3 className="font-medium text-white mb-3 text-base">How it works</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-ggreen mt-0.5">✓</span> Timer starts when you click "Begin Speedrun"</li>
                  <li className="flex items-start gap-2"><span className="text-ggreen mt-0.5">✓</span> Navigate the fake Google Cloud console to find how to generate an API key</li>
                  <li className="flex items-start gap-2"><span className="text-gyellow mt-0.5">⚠</span> The UI is intentionally confusing — that's the point</li>
                  <li className="flex items-start gap-2"><span className="text-ggreen mt-0.5">✓</span> Timer stops when you successfully generate the key</li>
                  <li className="flex items-start gap-2"><span className="text-gblue-300 mt-0.5">ℹ</span> No real API keys are created. This is entirely a parody.</li>
                  <li className="flex items-start gap-2"><span className="text-gyellow mt-0.5">⚠</span> Every run is randomized — memorizing won't help!</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="border-b border-gborder bg-gsidebar">
          <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '16px 32px' }} className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-gdark">{leaderboard.length}</span>
              <span className="text-sm text-gray-500">Attempts</span>
            </div>
            <div className="w-px h-8 bg-gborder"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-gdark">
                {leaderboard.length > 0 ? formatTime(leaderboard[0]?.time_ms) : '--:--'}
              </span>
              <span className="text-sm text-gray-500">Best Time</span>
            </div>
            <div className="w-px h-8 bg-gborder"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-gdark">14</span>
              <span className="text-sm text-gray-500">Trap Stages</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '40px 32px' }} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-normal text-gdark">Global Leaderboard</h2>
              <p className="text-sm text-gray-500 mt-0.5">Fastest API key generations worldwide</p>
            </div>
          </div>

          {leaderboard.length > 0 ? (
            <div className="border border-gborder rounded-lg overflow-hidden">
              <div className="bg-gsidebar grid grid-cols-[60px_1fr_140px_120px] px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gborder">
                <span>Rank</span>
                <span>Name</span>
                <span>Time</span>
                <span>Date</span>
              </div>
              {leaderboard.slice(0, 10).map((entry, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[60px_1fr_140px_120px] px-4 py-3 items-center text-sm border-b border-gborder last:border-b-0 hover:bg-blue-50/50 transition-colors ${
                    i === 0 ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <span className="text-base">{getMedal(i)}</span>
                  <span className="font-medium text-gdark">{entry.name}</span>
                  <span className="font-mono text-gblue font-semibold text-sm">{formatTime(entry.time_ms)}</span>
                  <span className="text-gray-400 text-xs">{entry.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gborder rounded-lg p-12 text-center bg-gsidebar/50">
              <div className="text-4xl mb-3">🏁</div>
              <p className="text-gray-500">No runs yet. Be the first to complete the speedrun!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-gborder bg-gsidebar">
          <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '16px 32px' }} className="flex items-center justify-between text-xs text-gray-400">
            <span>No affiliation with Google. This is a parody.</span>
            <div className="flex items-center gap-4">
              <span>Built with React + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
