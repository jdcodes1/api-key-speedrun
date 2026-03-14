import { useState } from 'react'

export default function CredentialsPage({ onCreateCredential }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="flex-1 bg-glight p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-1">
          <span>APIs & Services</span>
          <span>/</span>
          <span className="text-gray-600">Credentials</span>
        </div>

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-normal text-gdark">Credentials</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gblue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg">+</span> Create credentials
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gborder py-1 z-10">
                <button
                  onClick={() => { setShowDropdown(false); onCreateCredential() }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-gdark cursor-pointer"
                >
                  <div className="font-medium">API key</div>
                  <div className="text-xs text-gray-400">Creates a simple API key</div>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-gdark cursor-pointer">
                  <div className="font-medium">OAuth client ID</div>
                  <div className="text-xs text-gray-400">For user authorization</div>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-gdark cursor-pointer">
                  <div className="font-medium">Service account</div>
                  <div className="text-xs text-gray-400">For server-to-server</div>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-gdark cursor-pointer">
                  <div className="font-medium">Help me choose</div>
                  <div className="text-xs text-gray-400">Not sure which to use?</div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 text-gblue shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <div>
            <p className="text-sm text-blue-800">
              To create an API key, click <strong>"+ Create credentials"</strong> above and select <strong>"API key"</strong>.
              You will need to agree to the Terms of Service and verify your billing account.
            </p>
          </div>
        </div>

        {/* Existing credentials table (fake) */}
        <div className="bg-white rounded-lg border border-gborder">
          <div className="px-6 py-4 border-b border-gborder">
            <h3 className="text-sm font-medium text-gdark">API Keys</h3>
          </div>
          <div className="p-8 text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <p className="text-sm text-gray-500">No API keys yet. Create one to get started.</p>
          </div>
        </div>

        {/* OAuth section */}
        <div className="bg-white rounded-lg border border-gborder mt-4">
          <div className="px-6 py-4 border-b border-gborder">
            <h3 className="text-sm font-medium text-gdark">OAuth 2.0 Client IDs</h3>
          </div>
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">No OAuth 2.0 client IDs configured.</p>
          </div>
        </div>

        {/* Service accounts section */}
        <div className="bg-white rounded-lg border border-gborder mt-4">
          <div className="px-6 py-4 border-b border-gborder">
            <h3 className="text-sm font-medium text-gdark">Service Accounts</h3>
          </div>
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">No service accounts found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
