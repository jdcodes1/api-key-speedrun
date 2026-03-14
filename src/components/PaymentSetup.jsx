import { useState } from 'react'

export default function PaymentSetup({ onComplete, addToast }) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleSubmit = () => {
    if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 16) {
      addToast('Please enter a valid card number.', 'error')
      return
    }
    if (!expiry || expiry.length < 5) {
      addToast('Please enter a valid expiration date.', 'error')
      return
    }
    if (!cvc || cvc.length < 3) {
      addToast('Please enter a valid CVC.', 'error')
      return
    }
    if (!name.trim()) {
      addToast('Please enter the cardholder name.', 'error')
      return
    }

    setProcessing(true)
    const delay = 10000 + Math.random() * 5000 // 10-15s

    setTimeout(() => {
      setProcessing(false)
      const attempt = attempts + 1
      setAttempts(attempt)

      if (attempt === 1) {
        addToast('Card declined. Please try a different card or check your details.', 'error')
        setCvc('')
      } else {
        addToast('Payment method verified!', 'success')
        setTimeout(() => onComplete(), 1000)
      }
    }, delay)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[480px]">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Set Up Payment Method</h2>
          <p className="text-sm text-gray-500 mt-1">
            A payment method is required to create API keys, even for free tier usage. You won't be charged.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            🔒 Your payment information is encrypted and secure. This is for verification only.
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Card number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              disabled={processing}
              className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gdark mb-1">Expiration</label>
              <input
                type="text"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                disabled={processing}
                className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gdark mb-1">CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                disabled={processing}
                className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gdark mb-1">Cardholder name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name on card"
              disabled={processing}
              className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
            />
          </div>

          {attempts > 0 && attempts < 2 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              Your card was declined. Please verify your details or try a different card.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gborder flex items-center justify-end bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={processing}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              processing ? 'bg-gray-300 text-gray-500' : 'bg-gblue text-white hover:bg-blue-600'
            }`}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying payment...
              </span>
            ) : 'Add payment method'}
          </button>
        </div>
      </div>
    </div>
  )
}
