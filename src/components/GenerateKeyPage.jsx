import { useState, useEffect, useRef, useMemo } from 'react'

const failureModes = [
  { message: 'Error: Required field missing. Check all required fields.', recovery: 'checkbox' },
  { message: 'Error: Quota exceeded for this project. Please wait and retry.', recovery: 'wait' },
  { message: 'Error: Region unavailable. Retrying with fallback region...', recovery: 'wait' },
  { message: 'Error: Permission denied. Re-authenticating...', recovery: 'wait' },
  { message: 'Session expired. Please re-authenticate.', recovery: 'restart' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const MAX_ATTEMPTS = 5

export default function GenerateKeyPage({ attempts, onGenerate, onRestart, addToast }) {
  const [hiddenCheckbox, setHiddenCheckbox] = useState(false)
  const btnRef = useRef(null)

  // Randomize which paragraph the checkbox appears in
  const checkboxPosition = useMemo(() => Math.floor(Math.random() * 3), []) // 0, 1, or 2

  // Randomize failure order
  const failures = useMemo(() => shuffle(failureModes), [])

  const handleMouseMove = (e) => {
    if (attempts === 0 && !hiddenCheckbox && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.05
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.05
      btnRef.current.style.transform = `translate(${-dx}px, ${-dy}px)`
    }
  }

  const handleGenerate = () => {
    if (attempts === 0 && !hiddenCheckbox) {
      addToast('Error: You must acknowledge the terms below the form. Scroll down and check the box.', 'error')
      return
    }
    onGenerate()
  }

  const finePrintParagraphs = [
    'By generating this API key, you confirm that you have reviewed the API restrictions and application restrictions configured above. You understand that this key provides access to the selected APIs and that you are responsible for any usage charges incurred.',
    'API keys should be stored securely and not exposed in client-side code or public repositories. Google recommends rotating API keys periodically and using the principle of least privilege when configuring API restrictions.',
    'By proceeding, you acknowledge that API key generation is subject to regional availability, quota limits, and service-specific terms. Key generation may take several attempts during high-traffic periods.',
  ]

  return (
    <div className="flex-1 bg-glight p-8" onMouseMove={handleMouseMove}>
      <div className="max-w-2xl mx-auto">
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-1">
          <span>APIs & Services</span>
          <span>/</span>
          <span>Credentials</span>
          <span>/</span>
          <span className="text-gray-600">Create API Key</span>
        </div>

        <div className="bg-white rounded-xl border border-gborder shadow-sm p-8">
          <h1 className="text-2xl font-normal text-gdark mb-2">Create API Key</h1>
          <p className="text-sm text-gray-500 mb-8">
            Generate a new API key for the Generative Language API.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gdark mb-1">Key name (optional)</label>
              <input
                type="text"
                defaultValue="Untitled API Key"
                className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gdark mb-1">Application restrictions</label>
              <select className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gblue bg-white">
                <option>None</option>
                <option>HTTP referrers (web sites)</option>
                <option>IP addresses (web servers, cron jobs)</option>
                <option>Android apps</option>
                <option>iOS apps</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gdark mb-1">API restrictions</label>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                ✓ Generative Language API (configured)
              </div>
            </div>
          </div>

          {/* Fine print with hidden checkbox at randomized position */}
          <div className="mb-6 max-h-32 overflow-y-auto border border-gborder rounded-lg p-4 text-xs text-gray-400 leading-relaxed">
            {finePrintParagraphs.map((text, i) => (
              <div key={i}>
                <p className={i > 0 ? 'mt-3' : ''}>{text}</p>
                {i === checkboxPosition && (
                  <label className="flex items-start gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hiddenCheckbox}
                      onChange={e => setHiddenCheckbox(e.target.checked)}
                      className="mt-0.5 accent-gblue"
                    />
                    <span>I acknowledge the above and wish to proceed with key generation.</span>
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Attempt counter */}
          {attempts > 0 && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
              Attempt {attempts + 1} of {MAX_ATTEMPTS}. {attempts >= MAX_ATTEMPTS - 1 ? 'Final attempt!' : 'Previous attempts failed.'}
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <button
              className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
              onClick={() => addToast('You must complete this step to generate the key.', 'warning')}
            >
              Cancel
            </button>
            <button
              ref={btnRef}
              onClick={handleGenerate}
              disabled={attempts === 0 && !hiddenCheckbox}
              className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                attempts === 0 && !hiddenCheckbox
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gblue text-white hover:bg-blue-600'
              }`}
            >
              Generate key
            </button>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Having trouble? Make sure you've completed all previous steps.
          Session tokens expire after 5 minutes of inactivity.
        </div>
      </div>
    </div>
  )
}
