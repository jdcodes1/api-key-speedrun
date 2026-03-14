import { useState, useEffect, useRef, useCallback } from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import ProjectSelector from './ProjectSelector'
import DeprecatedPage from './DeprecatedPage'
import CredentialsPage from './CredentialsPage'
import TosModal from './TosModal'
import BillingModal from './BillingModal'
import RestrictionsModal from './RestrictionsModal'
import CaptchaModal from './CaptchaModal'
import GenerateKeyPage from './GenerateKeyPage'
import CookieBanner from './CookieBanner'
import FakeLoading from './FakeLoading'

/*
  Game state machine:
  PROJECT_SELECT → SIDEBAR_NAV → (wrong path: DEPRECATED_PAGE) → CREDENTIALS_PAGE
  → TOS_MODAL → BILLING_MODAL → RESTRICTIONS_MODAL → CAPTCHA
  → GENERATE_KEY (3 attempts) → VICTORY
*/

function formatTimer(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const centis = Math.floor((ms % 1000) / 10)
  return `${minutes}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`
}

export default function GameScreen({ elapsed, onVictory, addToast }) {
  const [step, setStep] = useState('PROJECT_SELECT')
  const [showProjectSelector, setShowProjectSelector] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [generateAttempts, setGenerateAttempts] = useState(0)
  const toastInterval = useRef(null)

  // Spam random toasts during gameplay
  useEffect(() => {
    const messages = [
      { msg: 'Your free trial expires in 3 days!', type: 'warning' },
      { msg: 'New region available: antarctica-south1', type: 'info' },
      { msg: 'Billing alert: $0.003 charge detected', type: 'warning' },
      { msg: 'Gemini 2.5 Pro is now available!', type: 'info' },
      { msg: 'Security alert: New sign-in from your device', type: 'error' },
      { msg: 'Tip: Try Cloud Shell for faster access', type: 'info' },
      { msg: 'Quota exceeded for free tier (just kidding)', type: 'warning' },
      { msg: 'Survey: How would you rate your experience?', type: 'info' },
      { msg: 'Reminder: Enable 2FA for your account', type: 'warning' },
      { msg: 'Cloud Functions v3 is in preview!', type: 'info' },
    ]
    const fire = () => {
      const pick = messages[Math.floor(Math.random() * messages.length)]
      addToast(pick.msg, pick.type)
    }
    // First one after 8s, then random intervals
    const firstTimeout = setTimeout(fire, 8000)
    toastInterval.current = setInterval(fire, 12000 + Math.random() * 10000)
    return () => {
      clearTimeout(firstTimeout)
      clearInterval(toastInterval.current)
    }
  }, [addToast])

  const doFakeLoad = useCallback((msg, duration, then) => {
    setLoading(true)
    setLoadingMsg(msg)
    setTimeout(() => {
      setLoading(false)
      setLoadingMsg('')
      then()
    }, duration)
  }, [])

  // Random auto-scroll annoyance
  useEffect(() => {
    if (step === 'CREDENTIALS_PAGE' || step === 'DEPRECATED_PAGE') {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 15000)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleProjectSelect = (projectId) => {
    if (projectId === 'my-project-1-prod-v2') {
      doFakeLoad('Switching project...', 2000, () => {
        setShowProjectSelector(false)
        setStep('SIDEBAR_NAV')
        addToast('Project selected: my-project-1-prod-v2', 'success')
      })
    } else {
      addToast('APIs not enabled for this project. Select a different project.', 'error')
    }
  }

  const handleSidebarNav = (item) => {
    if (item === 'api-keys-deprecated') {
      doFakeLoad('Loading API Keys...', 1500, () => {
        setStep('DEPRECATED_PAGE')
      })
    } else if (item === 'credentials') {
      doFakeLoad('Loading Credentials...', 2500, () => {
        setStep('CREDENTIALS_PAGE')
      })
    } else if (item === 'ai-studio') {
      addToast('Redirecting to AI Studio...', 'info')
      setTimeout(() => {
        addToast('AI Studio requires separate credentials. Use Cloud Console instead.', 'error')
      }, 2000)
    } else {
      addToast('This service is not available for the current project.', 'error')
    }
  }

  const handleCreateCredential = () => {
    doFakeLoad('Preparing credential creation...', 2000, () => {
      setStep('TOS_MODAL')
    })
  }

  const handleTosAccept = () => {
    doFakeLoad('Verifying agreement...', 1500, () => {
      setStep('BILLING_MODAL')
    })
  }

  const handleBillingConfirm = () => {
    doFakeLoad('Validating billing account...', 2000, () => {
      setStep('RESTRICTIONS_MODAL')
    })
  }

  const handleRestrictionsSubmit = () => {
    doFakeLoad('Applying API restrictions...', 1800, () => {
      setStep('CAPTCHA')
    })
  }

  const handleCaptchaComplete = () => {
    doFakeLoad('Verifying humanity...', 2500, () => {
      setStep('GENERATE_KEY')
    })
  }

  const handleGenerateAttempt = () => {
    const attempt = generateAttempts + 1
    setGenerateAttempts(attempt)

    if (attempt === 1) {
      addToast('Error: Required field missing. Check all required fields.', 'error')
    } else if (attempt === 2) {
      doFakeLoad('Generating API key...', 5000, () => {
        addToast('Session expired. Please re-authenticate.', 'error')
        setStep('RESTRICTIONS_MODAL')
      })
    } else {
      doFakeLoad('Generating API key...', 3000, () => {
        onVictory()
      })
    }
  }

  const handleBackFromDeprecated = () => {
    setStep('SIDEBAR_NAV')
  }

  const mainContent = () => {
    if (loading) return <FakeLoading message={loadingMsg} />

    switch (step) {
      case 'PROJECT_SELECT':
        return (
          <div className="flex-1 flex items-center justify-center bg-glight">
            <ProjectSelector
              open={showProjectSelector}
              onSelect={handleProjectSelect}
            />
          </div>
        )
      case 'SIDEBAR_NAV':
        return (
          <div className="flex-1 flex items-center justify-center bg-glight p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gborder p-8 max-w-lg text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
              <h2 className="text-xl font-medium text-gdark mb-2">Welcome to your project</h2>
              <p className="text-gray-500 text-sm">
                Use the navigation sidebar to find the credentials page and create your API key.
              </p>
            </div>
          </div>
        )
      case 'DEPRECATED_PAGE':
        return <DeprecatedPage onBack={handleBackFromDeprecated} />
      case 'CREDENTIALS_PAGE':
        return <CredentialsPage onCreateCredential={handleCreateCredential} />
      case 'TOS_MODAL':
        return (
          <div className="flex-1 bg-glight">
            <TosModal onAccept={handleTosAccept} onCancel={() => {
              addToast('You must accept the Terms of Service to continue.', 'error')
            }} />
          </div>
        )
      case 'BILLING_MODAL':
        return (
          <div className="flex-1 bg-glight">
            <BillingModal onConfirm={handleBillingConfirm} addToast={addToast} />
          </div>
        )
      case 'RESTRICTIONS_MODAL':
        return (
          <div className="flex-1 bg-glight">
            <RestrictionsModal
              onSubmit={handleRestrictionsSubmit}
              addToast={addToast}
            />
          </div>
        )
      case 'CAPTCHA':
        return (
          <div className="flex-1 bg-glight">
            <CaptchaModal onComplete={handleCaptchaComplete} addToast={addToast} />
          </div>
        )
      case 'GENERATE_KEY':
        return (
          <GenerateKeyPage
            attempts={generateAttempts}
            onGenerate={handleGenerateAttempt}
            addToast={addToast}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar
        timer={formatTimer(elapsed)}
        onHamburger={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 overflow-hidden">
        {!sidebarCollapsed && step !== 'PROJECT_SELECT' && (
          <Sidebar
            currentStep={step}
            onNavigate={handleSidebarNav}
          />
        )}
        <div className="flex-1 overflow-auto flex flex-col">
          {mainContent()}
        </div>
      </div>
      {showCookieBanner && (
        <CookieBanner onAccept={() => setShowCookieBanner(false)} />
      )}
    </div>
  )
}
