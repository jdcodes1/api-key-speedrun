export default function DeprecatedPage({ onBack }) {
  return (
    <div className="flex-1 bg-glight p-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumbs that don't match */}
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-1">
          <span>Home</span>
          <span>/</span>
          <span>IAM & Admin</span>
          <span>/</span>
          <span className="text-gray-600">Security Keys</span>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">This page has been deprecated</h3>
              <p className="text-sm text-yellow-700">
                API Keys management has moved to <strong>APIs & Services → Credentials</strong>.
                This legacy interface is no longer supported and will be removed in a future update.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gborder p-8 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          <h2 className="text-lg font-medium text-gdark mb-2">No API Keys (Legacy)</h2>
          <p className="text-sm text-gray-500 mb-6">
            This page is deprecated. You can't create or manage API keys here anymore.
          </p>
          <button
            onClick={onBack}
            className="bg-gblue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Go to Credentials page →
          </button>
        </div>
      </div>
    </div>
  )
}
