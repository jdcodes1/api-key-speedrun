import { useState, useMemo } from 'react'
import { shuffle } from '../lib/utils'

const accountNames = [
  'My Billing Account', 'My Billing Account (Old)', 'Free Trial Account',
  'Organization Billing', 'Personal Billing', 'Dev Team Billing',
  'Production Billing', 'Test Environment Billing', 'Research Account',
  'Shared Services Billing',
]

const statuses = ['Active', 'Active', 'Active', 'Closed', 'Suspended', 'Payment Required']

export default function BillingModal({ onConfirm, onPaymentRequired, addToast }) {
  const { accounts } = useMemo(() => {
    const shuffledNames = shuffle(accountNames)
    const accts = shuffledNames.map((name, i) => ({
      id: `billing-${String(i + 1).padStart(3, '0')}`,
      name,
      status: statuses[i % statuses.length],
      linked: false,
      needsPayment: statuses[i % statuses.length] === 'Payment Required',
    }))
    const activeAccounts = accts.filter(a => a.status === 'Active')
    const correct = activeAccounts[Math.floor(Math.random() * activeAccounts.length)]
    correct.linked = true
    return { accounts: shuffle(accts) }
  }, [])

  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (!selected) {
      addToast('Please select a billing account.', 'error')
      return
    }
    const account = accounts.find(a => a.id === selected)
    if (account.status === 'Closed') {
      addToast('This billing account has been closed. Please select an active account.', 'error')
      return
    }
    if (account.status === 'Suspended') {
      addToast('This billing account is suspended. Contact support to reactivate.', 'error')
      return
    }
    if (account.needsPayment) {
      addToast('This account requires a payment method. Setting up payment...', 'warning')
      setTimeout(() => onPaymentRequired(), 1500)
      return
    }
    if (!account.linked) {
      if (!confirmed) {
        addToast('You must confirm billing account linkage before proceeding.', 'error')
        return
      }
    }
    onConfirm()
  }

  const selectedAccount = accounts.find(a => a.id === selected)

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[550px]">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Verify Billing Account</h2>
          <p className="text-sm text-gray-500 mt-2">
            API key creation requires a linked billing account, even for free tier usage.
          </p>
        </div>

        <div className="p-5 space-y-2.5 max-h-[400px] overflow-y-auto">
          {accounts.map(account => (
            <button
              key={account.id}
              onClick={() => setSelected(account.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors text-left cursor-pointer ${
                selected === account.id
                  ? 'border-gblue bg-blue-50'
                  : 'border-gborder hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                selected === account.id ? 'border-gblue' : 'border-gray-300'
              }`}>
                {selected === account.id && (
                  <div className="w-2 h-2 rounded-full bg-gblue"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gdark">{account.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">ID: {account.id}</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                account.status === 'Active' ? 'bg-green-100 text-green-700' :
                account.status === 'Closed' ? 'bg-gray-100 text-gray-500' :
                account.status === 'Payment Required' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {account.status}
              </span>
            </button>
          ))}
        </div>

        {selectedAccount && selectedAccount.status === 'Active' && !selectedAccount.linked && (
          <div className="px-5 pb-3">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="mt-0.5 accent-gblue"
              />
              <span className="text-xs leading-relaxed">
                I confirm that I want to link billing account "{selectedAccount.name}" to this project.
                Standard charges may apply for API usage beyond the free tier.
              </span>
            </label>
          </div>
        )}

        <div className="p-5 border-t border-gborder flex items-center justify-end gap-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => addToast('Billing verification is required to continue.', 'error')}
            className="bg-gblue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={handleConfirm}
            className="text-gblue hover:underline text-sm font-medium cursor-pointer px-2 py-2.5"
          >
            Confirm & continue
          </button>
        </div>
      </div>
    </div>
  )
}
