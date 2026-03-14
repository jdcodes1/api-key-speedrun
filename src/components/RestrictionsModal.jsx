import { useState, useMemo } from 'react'
import { shuffle } from '../lib/utils'

const baseApis = [
  'Abusive Experience Report API', 'Accelerated Mobile Pages (AMP) URL API',
  'Access Approval API', 'Access Context Manager API',
  'Ad Exchange Buyer API', 'Ad Experience Report API',
  'Admin SDK API', 'AdMob API', 'AdSense Management API',
  'AI Platform (Unified) API', 'AI Platform Data Labeling API',
  'Alerts API', 'AlloyDB API', 'Analytics Data API',
  'Analytics Hub API', 'Analytics Reporting API',
  'Android Device Provisioning API', 'Android Management API',
  'Anthropic Claude API', 'API Gateway API',
  'API Keys API', 'Apigee API', 'App Engine Admin API',
  'Artifact Registry API', 'AutoML API',
  'Bare Metal Solution API', 'Batch API',
  'BigQuery API', 'BigQuery Connection API',
  'BigQuery Data Transfer API', 'BigQuery Reservation API',
  'Binary Authorization API', 'Blockchain Node Engine API',
  'Certificate Authority API', 'Certificate Manager API',
  'Cloud Asset API', 'Cloud Billing API',
  'Cloud Build API', 'Cloud Composer API',
  'Cloud DNS API', 'Cloud Datastore API',
  'Cloud Functions API', 'Cloud Healthcare API',
  'Cloud Life Sciences API', 'Cloud Logging API',
  'Cloud Monitoring API', 'Cloud Natural Language API',
  'Cloud Resource Manager API', 'Cloud Run Admin API',
  'Cloud SQL Admin API', 'Cloud Scheduler API',
  'Cloud Search API', 'Cloud Shell API',
  'Cloud Source Repositories API', 'Cloud Spanner API',
  'Cloud Speech-to-Text API', 'Cloud Storage API',
  'Cloud Tasks API', 'Cloud Text-to-Speech API',
  'Cloud Trace API', 'Cloud Translation API',
  'Cloud Vision API', 'Compute Engine API',
  'Container Analysis API', 'Contact Center AI API',
  'Data Catalog API', 'Dataflow API',
  'Dataproc API', 'Dialogflow API',
  'Document AI API', 'Domains API',
  'Essential Contacts API', 'Eventarc API',
  'Firebase Cloud Messaging API', 'Firebase Rules API',
  'Firestore API', 'Genomics API',
  'Google Chat API', 'Google Classroom API',
  'Google Drive API', 'Google Maps API',
  'Google Sheets API', 'IAM API',
  'Identity Toolkit API', 'Kubernetes Engine API',
  'Maps JavaScript API', 'Memorystore API',
  'Network Services API', 'Notebooks API',
  'OS Config API', 'Pub/Sub API',
  'Recommendations AI API', 'Redis API',
  'Secret Manager API', 'Security Command Center API',
  'Service Networking API', 'Service Usage API',
  'Storage Transfer API', 'Vertex AI API',
  'Video Intelligence API', 'Vision AI API',
  'Web Security Scanner API', 'Workflows API',
]

const correctApiPool = [
  'Generative Language API',
  'Generative Language API v2',
  'GenAI Language Service',
  'Generative AI Language API',
  'PaLM Language API',
]

const geminiDecoys = [
  'Gemini API', 'Gemini API (Legacy)', 'Gemini Pro API',
  'Gemini Ultra API', 'Gemini Nano API', 'Gemini 1.5 API',
  'Gemini 2.0 API (Preview)',
]

export default function RestrictionsModal({ onSubmit, addToast }) {
  const { apis, correctApi } = useMemo(() => {
    const correct = correctApiPool[Math.floor(Math.random() * correctApiPool.length)]
    const allApis = shuffle([...baseApis, correct, ...geminiDecoys])
    return { apis: allApis, correctApi: correct }
  }, [])

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())

  const filtered = apis.filter(api =>
    api.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (api) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(api)) next.delete(api)
      else next.add(api)
      return next
    })
  }

  const handleSubmit = () => {
    if (selected.size === 0) {
      addToast('You must select at least one API restriction.', 'error')
      return
    }
    if (!selected.has(correctApi)) {
      addToast('Error: The selected API restrictions do not include the required API for Gemini access.', 'error')
      return
    }
    if (selected.size > 3) {
      addToast('Warning: Too many APIs selected. Please narrow your selection to 3 or fewer.', 'warning')
      return
    }
    if (geminiDecoys.some(d => selected.has(d))) {
      addToast('Error: One or more selected APIs are deprecated. Remove deprecated APIs and try again.', 'error')
      return
    }
    onSubmit()
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[600px] max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Select API Restrictions</h2>
          <p className="text-sm text-gray-500 mt-2">
            Choose which APIs this key can access. For Gemini, select the appropriate language API.
          </p>
        </div>

        <div className="px-6 pt-4">
          <input
            type="text"
            placeholder="Filter APIs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
          />
          <div className="text-xs text-gray-400 mt-2">
            {selected.size} selected (max 3) · {filtered.length} shown
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          {filtered.map(api => (
            <label
              key={api}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer text-sm ${
                selected.has(api) ? 'bg-blue-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(api)}
                onChange={() => toggle(api)}
                className="accent-gblue"
              />
              <span className="text-gray-700">{api}</span>
              {geminiDecoys.includes(api) && (
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-auto font-medium">
                  Deprecated
                </span>
              )}
            </label>
          ))}
        </div>

        <div className="p-5 border-t border-gborder flex items-center justify-between bg-gray-50 rounded-b-xl">
          <span className="text-xs text-gray-400">
            Tip: "Gemini API" variants are deprecated. Look for the language API.
          </span>
          <button
            onClick={handleSubmit}
            className="bg-gblue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Apply restrictions
          </button>
        </div>
      </div>
    </div>
  )
}
