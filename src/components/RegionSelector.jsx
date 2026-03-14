import { useState, useMemo } from 'react'

const allRegions = [
  'us-central1', 'us-east1', 'us-east4', 'us-east5', 'us-south1', 'us-west1', 'us-west2', 'us-west3', 'us-west4',
  'europe-west1', 'europe-west2', 'europe-west3', 'europe-west4', 'europe-west6', 'europe-west8', 'europe-west9',
  'europe-north1', 'europe-central2', 'europe-southwest1',
  'asia-east1', 'asia-east2', 'asia-northeast1', 'asia-northeast2', 'asia-northeast3',
  'asia-south1', 'asia-south2', 'asia-southeast1', 'asia-southeast2',
  'australia-southeast1', 'australia-southeast2',
  'southamerica-east1', 'southamerica-west1',
  'northamerica-northeast1', 'northamerica-northeast2',
  'me-west1', 'me-central1', 'me-central2',
  'africa-south1',
]

// Regions that will fake "unavailable" after selection
const unavailablePool = [
  'europe-central2', 'asia-south2', 'me-central2', 'africa-south1',
  'southamerica-west1', 'us-east5', 'europe-southwest1',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RegionSelector({ onSelect, addToast }) {
  const { regions, correctRegion } = useMemo(() => {
    const shuffled = shuffle(allRegions)
    // Pick a random region that isn't in the unavailable pool as the correct one
    const available = shuffled.filter(r => !unavailablePool.includes(r))
    const correct = available[Math.floor(Math.random() * Math.min(5, available.length))]
    return { regions: shuffled, correctRegion: correct }
  }, [])

  const [selected, setSelected] = useState(null)
  const [checking, setChecking] = useState(false)
  const [search, setSearch] = useState('')
  const [triedUnavailable, setTriedUnavailable] = useState(new Set())

  const filtered = regions.filter(r => r.toLowerCase().includes(search.toLowerCase()))

  const handleConfirm = () => {
    if (!selected) {
      addToast('Please select a region.', 'error')
      return
    }

    setChecking(true)
    const delay = 5000 + Math.random() * 3000 // 5-8s

    setTimeout(() => {
      setChecking(false)
      if (unavailablePool.includes(selected) && !triedUnavailable.has(selected)) {
        setTriedUnavailable(prev => new Set([...prev, selected]))
        addToast(`Region "${selected}" is currently unavailable due to capacity limits. Please select a different region.`, 'error')
        setSelected(null)
      } else if (selected === correctRegion) {
        onSelect(selected)
      } else {
        addToast(`Region "${selected}" does not support the Generative Language API. Try a different region.`, 'error')
        setSelected(null)
      }
    }, delay)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[550px] max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Select API Region</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose the region where your API key will be provisioned. Not all regions support all APIs.
          </p>
        </div>

        <div className="px-6 pt-4">
          <input
            type="text"
            placeholder="Filter regions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          {filtered.map(region => (
            <button
              key={region}
              onClick={() => !checking && setSelected(region)}
              className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                selected === region
                  ? 'bg-blue-50 border border-gblue'
                  : 'hover:bg-gray-50 border border-transparent'
              } ${triedUnavailable.has(region) ? 'opacity-50' : ''}`}
            >
              <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                selected === region ? 'border-gblue' : 'border-gray-300'
              }`}>
                {selected === region && <div className="w-1.5 h-1.5 rounded-full bg-gblue" />}
              </div>
              <span className="text-gdark">{region}</span>
              {triedUnavailable.has(region) && (
                <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Unavailable</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gborder flex items-center justify-between bg-gray-50">
          <span className="text-xs text-gray-400">
            Tip: US and Europe regions have the best API availability.
          </span>
          <button
            onClick={handleConfirm}
            disabled={checking}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              checking ? 'bg-gray-300 text-gray-500' : 'bg-gblue text-white hover:bg-blue-600'
            }`}
          >
            {checking ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Checking availability...
              </span>
            ) : 'Confirm region'}
          </button>
        </div>
      </div>
    </div>
  )
}
