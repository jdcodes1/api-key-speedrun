import { useState, useMemo } from 'react'

const paragraphs = [
  {
    title: '1. Scope of Service',
    text: 'The Service provides programmatic access to Google Cloud APIs through unique authentication credentials. These credentials are subject to usage quotas, rate limitations, and the applicable service-specific terms available at the Google Cloud documentation portal.',
  },
  {
    title: '2. Data Processing',
    text: 'Your use of API keys may involve the processing of data in accordance with the Google Cloud Data Processing Terms. You represent and warrant that you have obtained all necessary consents and authorizations for any personal data processed through the APIs.',
  },
  {
    title: '3. Security Obligations',
    text: 'You are solely responsible for maintaining the confidentiality and security of your API keys. You shall not share, publish, or embed API keys in publicly accessible code repositories, client-side applications, or any other medium where unauthorized parties may obtain access.',
  },
  {
    title: '4. Acceptable Use',
    text: 'You agree that your use of the API keys and associated services shall comply with all applicable laws, regulations, and Google\'s Acceptable Use Policy. Any violation may result in immediate suspension of your API access.',
  },
  {
    title: '5. Limitation of Liability',
    text: 'To the maximum extent permitted by applicable law, Google shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the API keys or the Service.',
  },
  {
    title: '6. Indemnification',
    text: 'You agree to indemnify and hold harmless Google, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of the API keys.',
  },
  {
    title: '7. Export Compliance',
    text: 'You acknowledge that the Service and API keys are subject to U.S. export control laws and regulations. You agree to comply with all applicable export and re-export laws and not to transfer API credentials to any prohibited party.',
  },
  {
    title: '8. Service Level Agreement',
    text: 'Google provides the API with a target uptime of 99.9% but does not guarantee uninterrupted access. Scheduled maintenance windows will be communicated in advance through the Cloud Status Dashboard.',
  },
  {
    title: '9. Modifications',
    text: 'Google reserves the right to modify these terms at any time. Continued use of the Service after such modifications constitutes your acceptance of the updated terms.',
  },
  {
    title: '10. Governing Law',
    text: 'These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.',
  },
]

export default function TosModal({ onAccept, onCancel }) {
  // Randomize which paragraph gets the real checkbox (between index 2 and 7)
  const checkboxParagraphIdx = useMemo(() => 2 + Math.floor(Math.random() * 6), [])
  const [checked, setChecked] = useState(false)
  const [decoyChecked, setDecoyChecked] = useState({})
  const [showDecoyWarning, setShowDecoyWarning] = useState(false)

  // Decoy checkbox positions (2 random ones, not at the real position)
  const decoyPositions = useMemo(() => {
    const positions = []
    while (positions.length < 2) {
      const p = Math.floor(Math.random() * paragraphs.length)
      if (p !== checkboxParagraphIdx && !positions.includes(p)) positions.push(p)
    }
    return positions
  }, [checkboxParagraphIdx])

  const handleDecoyCheck = (idx) => {
    setDecoyChecked(prev => ({ ...prev, [idx]: !prev[idx] }))
    if (!decoyChecked[idx]) {
      setShowDecoyWarning(true)
      setTimeout(() => setShowDecoyWarning(false), 3000)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[600px] max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gborder">
          <h2 className="text-lg font-medium text-gdark">Terms of Service Agreement</h2>
          <p className="text-sm text-gray-500 mt-1">Please review and accept the terms below</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-600 leading-relaxed">
          <p className="mb-4">
            By creating an API key through Google Cloud Platform ("Service"), you acknowledge and agree
            to the following terms and conditions as set forth by Google LLC and its affiliated entities
            ("Google", "we", "us", "our").
          </p>

          {paragraphs.map((para, i) => (
            <div key={i}>
              <p className="mb-4">
                <strong>{para.title}.</strong> {para.text}
              </p>

              {/* Real checkbox */}
              {i === checkboxParagraphIdx && (
                <div className="my-4 p-3 bg-gray-50 rounded-lg border border-gborder">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={e => setChecked(e.target.checked)}
                      className="mt-1 accent-gblue"
                    />
                    <span className="text-xs text-gray-500">
                      I have read and agree to the Google Cloud Platform Terms of Service, the API-specific
                      Terms of Service, and the Data Processing Agreement.
                    </span>
                  </label>
                </div>
              )}

              {/* Decoy checkboxes */}
              {decoyPositions.includes(i) && (
                <div className="my-4 p-3 bg-gray-50 rounded-lg border border-gborder">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={decoyChecked[i] || false}
                      onChange={() => handleDecoyCheck(i)}
                      className="mt-1 accent-gblue"
                    />
                    <span className="text-xs text-gray-500">
                      {i === decoyPositions[0]
                        ? 'I agree to receive marketing communications about Google Cloud products and services.'
                        : 'I consent to automated processing and profiling of my API usage patterns for service improvement.'}
                    </span>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        {showDecoyWarning && (
          <div className="px-6 pb-2">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-700">
              ⚠ Optional consent checkboxes do not replace the required Terms of Service agreement.
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gborder flex items-center justify-end gap-3 bg-gray-50">
          <button
            onClick={onCancel}
            className="bg-gblue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (checked) {
                onAccept()
              } else {
                onCancel()
              }
            }}
            className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer underline"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
