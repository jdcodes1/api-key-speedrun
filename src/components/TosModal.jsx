import { useState } from 'react'

export default function TosModal({ onAccept, onCancel }) {
  const [checked, setChecked] = useState(false)

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
          <p className="mb-4">
            <strong>1. Scope of Service.</strong> The Service provides programmatic access to Google Cloud
            APIs through unique authentication credentials. These credentials are subject to usage quotas,
            rate limitations, and the applicable service-specific terms available at the Google Cloud
            documentation portal.
          </p>
          <p className="mb-4">
            <strong>2. Data Processing.</strong> Your use of API keys may involve the processing of data
            in accordance with the Google Cloud Data Processing Terms. You represent and warrant that you
            have obtained all necessary consents and authorizations for any personal data processed through
            the APIs.
          </p>
          <p className="mb-4">
            <strong>3. Security Obligations.</strong> You are solely responsible for maintaining the
            confidentiality and security of your API keys. You shall not share, publish, or embed API keys
            in publicly accessible code repositories, client-side applications, or any other medium where
            unauthorized parties may obtain access.
          </p>
          <p className="mb-4">
            <strong>4. Acceptable Use.</strong> You agree that your use of the API keys and associated
            services shall comply with all applicable laws, regulations, and Google's Acceptable Use Policy.
            {/* THE CHECKBOX IS HIDDEN HERE IN PARAGRAPH 4 */}
          </p>
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
          <p className="mb-4">
            <strong>5. Limitation of Liability.</strong> To the maximum extent permitted by applicable law,
            Google shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages arising out of or related to your use of the API keys or the Service.
          </p>
          <p className="mb-4">
            <strong>6. Indemnification.</strong> You agree to indemnify and hold harmless Google, its
            officers, directors, employees, and agents from and against any claims, liabilities, damages,
            losses, and expenses arising out of or in any way connected with your use of the API keys.
          </p>
          <p className="mb-4">
            <strong>7. Modifications.</strong> Google reserves the right to modify these terms at any time.
            Continued use of the Service after such modifications constitutes your acceptance of the
            updated terms.
          </p>
          <p className="mb-4">
            <strong>8. Governing Law.</strong> These terms shall be governed by and construed in accordance
            with the laws of the State of California, without regard to its conflict of law provisions.
          </p>
        </div>

        <div className="p-4 border-t border-gborder flex items-center justify-end gap-3 bg-gray-50">
          {/* Dark pattern: "Cancel" looks like the primary action */}
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
