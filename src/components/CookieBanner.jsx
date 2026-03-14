export default function CookieBanner({ onAccept }) {
  return (
    <div className="cookie-banner fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gborder shadow-2xl z-[100] p-6"
      style={{ minHeight: '40vh' }}>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-lg font-medium text-gdark mb-3">Cookie Preferences</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          We use cookies and similar technologies to provide, protect, and improve our products.
          This includes personalizing content, measuring ads, and providing a safer experience.
          We also use cookies to improve and keep our services running efficiently.
          By clicking "Accept All", you consent to our use of all cookies as described in our
          Cookie Policy. You can manage your preferences below.
        </p>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked disabled className="accent-gblue" />
            <span className="text-gray-700">Essential cookies (required)</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gblue" />
            <span className="text-gray-700">Analytics cookies</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gblue" />
            <span className="text-gray-700">Marketing cookies</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gblue" />
            <span className="text-gray-700">Preference cookies</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gblue" />
            <span className="text-gray-700">Third-party integration cookies</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          {/* The "Accept" button is tiny, the "Manage" one is big */}
          <button
            className="bg-gblue text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Manage preferences
          </button>
          <button
            onClick={onAccept}
            className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer underline"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
