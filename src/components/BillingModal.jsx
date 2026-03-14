import { useState } from 'react'

const billingAccounts = [
  { id: 'billing-001', name: 'My Billing Account', status: 'Active', linked: false },
  { id: 'billing-002', name: 'My Billing Account (Old)', status: 'Closed', linked: false },
  { id: 'billing-003', name: 'Free Trial Account', status: 'Active', linked: false },
  { id: 'billing-004', name: 'Organization Billing', status: 'Active', linked: true },
  { id: 'billing-005', name: 'Personal Billing', status: 'Suspended', linked: false },
]

export default function BillingModal({ onConfirm, addToast }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (!selected) {
      addToast('Please select a billing account.', 'error')
      return
    }
    const account = billingAccounts.find(a => a.id === selected)
    if (account.status === 'Closed') {
      addToast('This billing account has been closed. Please select an active account.', 'error')
      return
    }
    if (account.status === 'Suspended') {
      addToast('This billing account is suspended. Contact support to reactivate.', 'error')
      return
    }
    if (!account.linked) {
      // Trick: need to "link" it first by checking a box
      if (!confirmed) {
        addToast('You must confirm billing account linkage before proceeding.', 'error')
        return
      }
    }
    onConfirm()
  }

  const selectedAccount = billingAccounts.find(a => a.id === selected)

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[550px]">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Verify Billing Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            API key creation requires a linked billing account, even for free tier usage.
          </p>
        </div>

        <div className="p-6 space-y-3">
          {billingAccounts.map(account => (
            <button
              key={account.id}
              onClick={() => setSelected(account.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left cursor-pointer ${
                selected === account.id
                  ? 'border-gblue bg-blue-50'
                  : 'border-gborder hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === account.id ? 'border-gblue' : 'border-gray-300'
              }`}>
                {selected === account.id && (
                  <div className="w-2 h-2 rounded-full bg-gblue"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gdark">{account.name}</div>
                <div className="text-xs text-gray-400">ID: {account.id}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                account.status === 'Active' ? 'bg-green-100 text-green-700' :
                account.status === 'Closed' ? 'bg-gray-100 text-gray-500' :
                'bg-red-100 text-red-700'
              }`}>
                {account.status}
              </span>
            </button>
          ))}
        </div>

        {/* Confirmation checkbox - only shows for unlinked active accounts */}
        {selectedAccount && selectedAccount.status === 'Active' && !selectedAccount.linked && (
          <div className="px-6 pb-2">
            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="mt-0.5 accent-gblue"
              />
              <span className="text-xs">
                I confirm that I want to link billing account "{selectedAccount.name}" to this project.
                Standard charges may apply for API usage beyond the free tier.
              </span>
            </label>
          </div>
        )}

        <div className="p-4 border-t border-gborder flex items-center justify-end gap-3 bg-gray-50">
          {/* Dark pattern again: primary-styled Cancel */}
          <button
            onClick={() => addToast('Billing verification is required to continue.', 'error')}
            className="bg-gblue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={handleConfirm}
            className="text-gblue hover:underline text-sm cursor-pointer"
          >
            Confirm & continue
          </button>
        </div>
      </div>
    </div>
  )
}
