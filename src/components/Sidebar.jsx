import { useState } from 'react'

const sidebarSections = [
  {
    label: 'AI Studio',
    items: [
      { id: 'ai-studio', label: 'Get API Key', icon: '🔑' },
      { id: 'ai-models', label: 'Model Garden', icon: '🌿' },
      { id: 'ai-prompts', label: 'Prompt Gallery', icon: '💬' },
    ]
  },
  {
    label: 'APIs & Services',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'library', label: 'Library', icon: '📚' },
      { id: 'credentials', label: 'Credentials', icon: '🔐' },
      { id: 'oauth', label: 'OAuth consent screen', icon: '🛡️' },
      { id: 'domain-verify', label: 'Domain verification', icon: '🌐' },
      { id: 'page-usage', label: 'Page usage agreements', icon: '📄' },
    ]
  },
  {
    label: 'Security',
    items: [
      { id: 'api-keys-deprecated', label: 'API Keys (Legacy)', icon: '🗝️' },
      { id: 'service-accounts', label: 'Service Accounts', icon: '👤' },
      { id: 'secret-manager', label: 'Secret Manager', icon: '🤫' },
      { id: 'identity', label: 'Identity Platform', icon: '🪪' },
    ]
  },
  {
    label: 'Networking',
    items: [
      { id: 'api-gateway', label: 'API Gateway', icon: '🚪' },
      { id: 'endpoints', label: 'Endpoints', icon: '📡' },
      { id: 'cdn', label: 'Cloud CDN', icon: '☁️' },
    ]
  },
  {
    label: 'Compute',
    items: [
      { id: 'compute-engine', label: 'Compute Engine', icon: '🖥️' },
      { id: 'cloud-run', label: 'Cloud Run', icon: '🏃' },
      { id: 'functions', label: 'Cloud Functions', icon: '⚡' },
      { id: 'kubernetes', label: 'Kubernetes Engine', icon: '☸️' },
    ]
  },
  {
    label: 'Storage',
    items: [
      { id: 'cloud-storage', label: 'Cloud Storage', icon: '🪣' },
      { id: 'firestore', label: 'Firestore', icon: '🔥' },
      { id: 'bigtable', label: 'Bigtable', icon: '📋' },
    ]
  },
  {
    label: 'More Products',
    items: [
      { id: 'bigquery', label: 'BigQuery', icon: '🔍' },
      { id: 'dataflow', label: 'Dataflow', icon: '🌊' },
      { id: 'pub-sub', label: 'Pub/Sub', icon: '📨' },
      { id: 'logging', label: 'Logging', icon: '📝' },
      { id: 'monitoring', label: 'Monitoring', icon: '📈' },
    ]
  },
]

export default function Sidebar({ currentStep, onNavigate }) {
  const [expandedSections, setExpandedSections] = useState(
    sidebarSections.reduce((acc, s) => ({ ...acc, [s.label]: true }), {})
  )
  const [pinned, setPinned] = useState(false)

  const toggle = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className="w-64 bg-gsidebar border-r border-gborder overflow-y-auto shrink-0 flex flex-col">
      {/* Pin button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gborder">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Navigation</span>
        <button
          onClick={() => setPinned(!pinned)}
          className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
        >
          {pinned ? '📌' : '📍'}
        </button>
      </div>

      <div className="flex-1 py-1">
        {sidebarSections.map(section => (
          <div key={section.label}>
            <button
              onClick={() => toggle(section.label)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-ghover cursor-pointer"
            >
              <span>{section.label}</span>
              <svg
                className={`w-3 h-3 transition-transform ${expandedSections[section.label] ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            {expandedSections[section.label] && (
              <div>
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-2.5 px-6 py-1.5 text-sm hover:bg-ghover transition-colors text-left cursor-pointer ${
                      item.id === 'credentials' && currentStep === 'CREDENTIALS_PAGE'
                        ? 'bg-blue-50 text-gblue font-medium border-r-2 border-gblue'
                        : 'text-gray-700'
                    } ${item.id === 'api-keys-deprecated' ? 'text-gray-400' : ''}`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {item.id === 'api-keys-deprecated' && (
                      <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full ml-auto">
                        Legacy
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom fake storage indicator */}
      <div className="border-t border-gborder p-4">
        <div className="text-xs text-gray-500 mb-1">Storage: 0.03 / 5 GB</div>
        <div className="h-1.5 bg-gray-200 rounded-full">
          <div className="h-full bg-gblue rounded-full" style={{ width: '0.6%' }}></div>
        </div>
      </div>
    </div>
  )
}
