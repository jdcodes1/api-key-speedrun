import { useState, useMemo } from 'react'
import { shuffle } from '../lib/utils'
import { Spinner } from '../lib/utils'

const allRegions = [
  'us-central1', 'us-east1', 'europe-west1', 'asia-east1', 'asia-northeast1', 'australia-southeast1',
]

export default function RegionSelector({ onSelect, addToast }) {
  const { regions, correctRegion } = useMemo(() => {
    const shuffled = shuffle(allRegions)
    const correct = shuffled[Math.floor(Math.random() * shuffled.length)]
    return { regions: shuffled, correctRegion: correct }
  }, [])

  const [selected, setSelected] = useState(null)
  const [checking, setChecking] = useState(false)
  const [triedWrong, setTriedWrong] = useState(new Set())

  const handleConfirm = () => {
    if (!selected) {
      addToast('Please select a region.', 'error')
      return
    }

    setChecking(true)
    const delay = 5000 + Math.random() * 3000

    setTimeout(() => {
      setChecking(false)
      if (selected === correctRegion) {
        onSelect(selected)
      } else {
        setTriedWrong(prev => new Set([...prev, selected]))
        addToast(`Region "${selected}" does not support the Generative Language API. Try a different region.`, 'error')
        setSelected(null)
      }
    }, delay)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[480px] flex flex-col">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Select API Region</h2>
          <p className="text-sm text-gray-500 mt-2">
            Choose the region where your API key will be provisioned. Not all regions support all APIs.
          </p>
        </div>

        <div className="p-5 space-y-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => !checking && setSelected(region)}
              className={`w-full flex items-center gap-4 py-3.5 px-4 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                selected === region
                  ? 'bg-blue-50 border-2 border-gblue'
                  : 'hover:bg-gray-50 border-2 border-transparent'
              } ${triedWrong.has(region) ? 'opacity-40' : ''}`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                selected === region ? 'border-gblue' : 'border-gray-300'
              }`}>
                {selected === region && <div className="w-2 h-2 rounded-full bg-gblue" />}
              </div>
              <span className="text-gdark font-medium">{region}</span>
              {triedWrong.has(region) && (
                <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Unavailable</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5 border-t border-gborder flex items-center justify-between bg-gray-50 rounded-b-xl">
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
                <Spinner />
                Checking availability...
              </span>
            ) : 'Confirm region'}
          </button>
        </div>
      </div>
    </div>
  )
}
