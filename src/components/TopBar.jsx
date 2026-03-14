export default function TopBar({ timer, onHamburger }) {
  return (
    <div className="h-12 bg-gdark flex items-center px-2 shrink-0 z-50">
      {/* Hamburger */}
      <button onClick={onHamburger} className="w-10 h-10 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 ml-1 mr-4">
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path fill="#34A853" d="M2 17l10 5 10-5"/>
          <path fill="#FBBC04" d="M2 12l10 5 10-5"/>
        </svg>
        <span className="text-white text-[15px] tracking-wide">Google Cloud</span>
      </div>

      {/* Project selector chip */}
      <div className="flex items-center gap-1.5 bg-[#303134] hover:bg-[#3c4043] rounded px-3 py-1.5 transition-colors cursor-pointer mr-4">
        <span className="text-gray-300 text-sm">my-project-1-prod-v2</span>
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="bg-[#303134] hover:bg-[#3c4043] rounded-lg flex items-center px-3 py-1.5 transition-colors group">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <span className="text-gray-400 text-sm">Search products and resources</span>
          <span className="ml-auto text-gray-500 text-xs bg-[#202124] rounded px-1.5 py-0.5">/</span>
        </div>
      </div>

      {/* Timer */}
      <div className="ml-4 bg-gred/20 text-gred px-3 py-1 rounded-full text-sm font-mono font-bold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gred animate-pulse"></span>
        {timer}
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-1 ml-3">
        {/* Cloud Shell */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 transition-colors cursor-pointer" title="Activate Cloud Shell">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59z"/>
          </svg>
        </button>

        {/* Notification bell with badge */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span className="absolute top-1 right-1 bg-gred text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold leading-none">
            7
          </span>
        </button>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-600 mx-1"></div>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-full bg-[#8e6abf] text-white flex items-center justify-center text-sm font-medium cursor-pointer hover:shadow-md transition-shadow">
          U
        </button>
      </div>
    </div>
  )
}
