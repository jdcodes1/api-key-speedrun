import { useState, useEffect } from 'react'

// Welcome tutorial steps
const tutorialSteps = [
  {
    title: 'Welcome to Google Cloud Console!',
    body: 'Let us show you around. This quick tutorial will help you get started with creating API keys.',
  },
  {
    title: 'Step 1: Navigation',
    body: 'Use the sidebar on the left to navigate between different services. You\'ll find APIs & Services under the main menu.',
  },
  {
    title: 'Step 2: Projects',
    body: 'Make sure you have the right project selected. Each project has its own set of credentials and API keys.',
  },
  {
    title: 'Step 3: Credentials',
    body: 'API keys, OAuth clients, and service accounts are all managed from the Credentials page.',
  },
  {
    title: 'You\'re all set!',
    body: 'You can always access this tutorial again from Help > Getting Started. Good luck!',
  },
]

function WelcomeTutorial({ onDismiss }) {
  const [step, setStep] = useState(0)
  const [canProgress, setCanProgress] = useState(false)

  useEffect(() => {
    // Force 4s wait per step
    setCanProgress(false)
    const t = setTimeout(() => setCanProgress(true), 4000)
    return () => clearTimeout(t)
  }, [step])

  const current = tutorialSteps[step]
  const isLast = step === tutorialSteps.length - 1

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden">
        <div className="bg-gblue p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">{current.title}</h2>
            <span className="text-sm text-blue-200">
              {step + 1} of {tutorialSteps.length}
            </span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 leading-relaxed">{current.body}</p>

          {/* Progress bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gblue h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="px-6 pb-5 flex items-center justify-between">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            className={`text-sm cursor-pointer ${step > 0 ? 'text-gblue hover:underline' : 'text-gray-300 cursor-default'}`}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (!canProgress) return
              if (isLast) onDismiss()
              else setStep(step + 1)
            }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              canProgress
                ? 'bg-gblue text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Get started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

function SurveyPopup({ onDismiss }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-[90] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[400px] border border-gborder">
        <div className="p-5 border-b border-gborder">
          <h3 className="font-medium text-gdark">Rate your experience</h3>
          <p className="text-xs text-gray-500 mt-1">Help us improve Google Cloud Console</p>
        </div>
        <div className="p-5">
          <div className="flex gap-2 justify-center mb-4">
            {['😡', '😕', '😐', '🙂', '😍'].map((emoji, i) => (
              <button key={i} className="w-12 h-12 text-2xl rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gborder">
                {emoji}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Additional feedback (optional)..."
            rows={2}
            className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
          />
        </div>
        <div className="px-5 pb-4 flex items-center justify-between">
          {/* Tiny dismiss button */}
          <button onClick={onDismiss} className="text-[10px] text-gray-300 hover:text-gray-500 cursor-pointer">
            dismiss
          </button>
          <button onClick={onDismiss} className="bg-gblue text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function SessionWarning({ onDismiss }) {
  const [countdown, setCountdown] = useState(300)

  useEffect(() => {
    const i = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-[85] w-[350px] bg-white rounded-lg shadow-2xl border border-yellow-300 overflow-hidden">
      <div className="bg-yellow-50 px-4 py-3 border-b border-yellow-200 flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
        <span className="text-sm font-medium text-yellow-800">Session Expiring</span>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          Your session will expire in <strong>{Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</strong>.
          Save your work to avoid losing progress.
        </p>
      </div>
      <div className="px-4 pb-3 flex justify-end">
        <button onClick={onDismiss} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  )
}

function UpgradePrompt({ onDismiss }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-[88] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] relative">
        {/* Tiny close button */}
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 text-xs cursor-pointer w-5 h-5 flex items-center justify-center"
          title="Close"
        >
          ✕
        </button>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-xl text-white text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h2 className="text-xl font-medium">Upgrade to Cloud Premium</h2>
          <p className="text-sm text-blue-100 mt-1">Unlock faster API key generation and priority support</p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {['10x faster key provisioning', 'Priority API quota', '24/7 premium support', 'Advanced security features'].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {f}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">
              Start free trial
            </button>
            <button onClick={onDismiss} className="text-xs text-gray-400 hover:text-gray-500 cursor-pointer px-2">
              no thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CookieConsentV2({ onDismiss }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[86] bg-white border-t border-gborder shadow-lg">
      <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            <strong>We've updated our privacy policy.</strong> We use cookies and similar technologies
            to provide, improve, and personalize our services. By continuing, you agree to our updated
            <span className="text-gblue cursor-pointer"> Privacy Policy</span> and
            <span className="text-gblue cursor-pointer"> Cookie Policy</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="bg-gblue text-white px-4 py-2 rounded text-sm cursor-pointer">
            Customize
          </button>
          <button onClick={onDismiss} className="text-[10px] text-gray-300 hover:text-gray-500 cursor-pointer">
            accept all
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureSpotlight({ onDismiss }) {
  const tips = [
    'Did you know? You can use Cloud Shell to manage resources directly from your browser!',
    'Pro tip: Use gcloud CLI to automate API key management.',
    'New feature: Try Gemini in Cloud Console for AI-assisted troubleshooting!',
    'Did you know? You can set up billing alerts to avoid unexpected charges.',
  ]
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)])

  return (
    <div className="fixed bottom-20 right-4 z-[84] w-[300px] bg-white rounded-lg shadow-xl border border-gblue/30 overflow-hidden">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center justify-between">
        <span className="text-xs font-medium text-gblue">💡 Feature Spotlight</span>
        <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer">✕</button>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-600">{tip}</p>
      </div>
    </div>
  )
}

function ChatWidget({ onDismiss }) {
  return (
    <div className="fixed bottom-4 right-4 z-[87] w-[300px] bg-white rounded-xl shadow-2xl border border-gborder overflow-hidden">
      <div className="bg-gblue px-4 py-3 flex items-center justify-between text-white">
        <span className="text-sm font-medium">Cloud Support</span>
        <button onClick={onDismiss} className="text-blue-200 hover:text-white text-xs cursor-pointer">✕</button>
      </div>
      <div className="p-4 h-[200px] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-xs text-gray-500">Connecting to support agent...</p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full border border-gborder rounded-lg px-3 py-2 text-xs focus:outline-none"
        />
      </div>
    </div>
  )
}

// Popup scheduler
export default function PopupSystem({ active }) {
  const [showTutorial, setShowTutorial] = useState(true)
  const [popups, setPopups] = useState({
    survey: false,
    session: false,
    upgrade: false,
    cookieV2: false,
    spotlight: false,
    chat: false,
  })

  useEffect(() => {
    if (!active || showTutorial) return

    const localTimers = []
    const schedule = [
      { key: 'spotlight', delay: 30000 + Math.random() * 15000 },
      { key: 'session', delay: 45000 + Math.random() * 15000 },
      { key: 'survey', delay: 60000 + Math.random() * 30000 },
      { key: 'cookieV2', delay: 75000 + Math.random() * 15000 },
      { key: 'upgrade', delay: 90000 + Math.random() * 30000 },
      { key: 'chat', delay: 40000 + Math.random() * 20000 },
    ]

    schedule.forEach(({ key, delay }) => {
      const t = setTimeout(() => {
        setPopups(p => ({ ...p, [key]: true }))
      }, delay)
      localTimers.push(t)
    })

    return () => localTimers.forEach(clearTimeout)
  }, [active, showTutorial])

  if (!active) return null

  const dismiss = (key) => setPopups(p => ({ ...p, [key]: false }))

  return (
    <>
      {showTutorial && (
        <WelcomeTutorial onDismiss={() => setShowTutorial(false)} />
      )}
      {popups.survey && <SurveyPopup onDismiss={() => dismiss('survey')} />}
      {popups.session && <SessionWarning onDismiss={() => dismiss('session')} />}
      {popups.upgrade && <UpgradePrompt onDismiss={() => dismiss('upgrade')} />}
      {popups.cookieV2 && <CookieConsentV2 onDismiss={() => dismiss('cookieV2')} />}
      {popups.spotlight && <FeatureSpotlight onDismiss={() => dismiss('spotlight')} />}
      {popups.chat && <ChatWidget onDismiss={() => dismiss('chat')} />}
    </>
  )
}
