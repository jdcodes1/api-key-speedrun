import { useState, useEffect, useRef } from 'react'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function EmailVerification({ onComplete, addToast }) {
  const [code, setCode] = useState('')
  const [actualCode, setActualCode] = useState(() => generateCode())
  const [codeExpired, setCodeExpired] = useState(true) // First code always "expires"
  const [resent, setResent] = useState(false)
  const [showCodeToast, setShowCodeToast] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const toastTimeout = useRef(null)

  // The first code "expires" immediately, requiring a resend
  useEffect(() => {
    // Show a fake "code sent" toast
    addToast('Verification code sent to u***@gmail.com', 'info')
    // After 5s show expiry
    const t = setTimeout(() => {
      addToast('Verification code expired. Please request a new code.', 'warning')
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  const handleResend = () => {
    if (resent) {
      addToast('Please wait before requesting another code.', 'warning')
      return
    }
    setResent(true)
    setCodeExpired(false)
    const newCode = generateCode()
    setActualCode(newCode)
    addToast('New verification code sent!', 'info')

    // Show the code in a toast after 10s delay — easy to miss!
    toastTimeout.current = setTimeout(() => {
      setShowCodeToast(true)
      // The code appears briefly in a notification
      addToast(`Security code: ${newCode} — expires in 60s`, 'info')
    }, 10000)
  }

  const handleVerify = () => {
    if (!code.trim()) {
      addToast('Please enter the verification code.', 'error')
      return
    }
    if (codeExpired) {
      addToast('This code has expired. Click "Resend code" to get a new one.', 'error')
      return
    }

    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      if (code.trim() === actualCode) {
        addToast('Email verified!', 'success')
        setTimeout(() => onComplete(), 500)
      } else {
        addToast('Invalid verification code. Please check and try again.', 'error')
        setCode('')
      }
    }, 2000)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[450px]">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Verify Your Email</h2>
          <p className="text-sm text-gray-500 mt-1">
            For security, we need to verify your email before generating API keys.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Code sent to <strong>u***@gmail.com</strong>
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Verification code</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              disabled={verifying}
              className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue text-center text-lg font-mono tracking-widest"
            />
          </div>

          {codeExpired && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
              Your verification code has expired. Please request a new one.
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={handleResend}
              disabled={verifying}
              className="text-gblue text-sm hover:underline cursor-pointer"
            >
              Resend code
            </button>
            <span className="text-xs text-gray-400">
              {resent && !showCodeToast && 'Sending new code...'}
              {showCodeToast && 'Check your notifications for the code'}
            </span>
          </div>
        </div>

        <div className="p-4 border-t border-gborder flex items-center justify-end bg-gray-50">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              verifying ? 'bg-gray-300 text-gray-500' : 'bg-gblue text-white hover:bg-blue-600'
            }`}
          >
            {verifying ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying...
              </span>
            ) : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  )
}
