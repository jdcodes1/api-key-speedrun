import { useState } from 'react'

export default function QuotaRequest({ onComplete, addToast }) {
  const [justification, setJustification] = useState('')
  const [processing, setProcessing] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [projectName] = useState(() => {
    const names = ['Internal tool', 'Production app', 'Research project', 'Hackathon demo', 'Customer-facing service']
    return names[Math.floor(Math.random() * names.length)]
  })

  const handleSubmit = () => {
    if (justification.trim().length < 50) {
      addToast('Business justification must be at least 50 characters.', 'error')
      return
    }

    setProcessing(true)
    const delay = 15000 + Math.random() * 5000 // 15-20s

    setTimeout(() => {
      setProcessing(false)
      const attempt = attempts + 1
      setAttempts(attempt)

      if (attempt === 1) {
        addToast('Request denied: Insufficient justification. Please provide more detail about your use case and expected traffic volume.', 'error')
        setJustification('')
      } else {
        addToast('Quota increase approved!', 'success')
        setTimeout(() => onComplete(), 1000)
      }
    }, delay)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[600px]">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Request Quota Increase</h2>
          <p className="text-sm text-gray-500 mt-1">
            Your project requires additional quota for the Generative Language API. Please submit a request.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Project</label>
            <input
              type="text"
              value={projectName}
              disabled
              className="w-full border border-gborder rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Current quota</label>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              0 requests/min (API key creation requires at least 1 request/min quota)
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Requested quota</label>
            <input
              type="text"
              value="60 requests/min"
              disabled
              className="w-full border border-gborder rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">
              Business justification <span className="text-red-500">*</span>
            </label>
            <textarea
              value={justification}
              onChange={e => setJustification(e.target.value)}
              placeholder="Describe your use case, expected traffic volume, and why you need this quota increase..."
              rows={4}
              disabled={processing}
              className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gblue resize-none"
            />
            <div className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>{justification.length < 50 ? `Minimum 50 characters (${50 - justification.length} more needed)` : '✓ Meets minimum length'}</span>
              <span>{justification.length} chars</span>
            </div>
          </div>

          {attempts > 0 && attempts < 2 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
              Previous request was denied. Please provide more specific details about traffic patterns and business impact.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gborder flex items-center justify-end gap-3 bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={processing}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              processing ? 'bg-gray-300 text-gray-500' : 'bg-gblue text-white hover:bg-blue-600'
            }`}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing request...
              </span>
            ) : 'Submit request'}
          </button>
        </div>
      </div>
    </div>
  )
}
