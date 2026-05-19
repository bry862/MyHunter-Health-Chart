import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CONDITIONS = [
  'Allergies',
  'Arthritis / joint condition',
  'Asthma / respiratory condition',
  'Autoimmune condition',
  'Blood disorder',
  'Cancer',
  'Chronic pain',
  'Diabetes',
  'Digestive condition',
  'Heart condition',
  'High blood pressure',
  'Kidney disease',
  'Liver disease',
  'Mental health condition',
  'Pregnancy',
  'Recent surgery or hospitalization',
  'Seizures / epilepsy',
  'Stroke history',
  'Thyroid condition',
  'Weakened immune system',
]

function MedicalHistory() {
  const navigate = useNavigate()
  const [selectedConditions, setSelectedConditions] = useState([])
  const [otherCondition, setOtherCondition] = useState('')
  const [otherChecked, setOtherChecked] = useState(false)
  const [noneChecked, setNoneChecked] = useState(null)
  const [additionalNotes, setAdditionalNotes] = useState('')

  const toggleCondition = (condition) => {
    setNoneChecked(null)
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    )
  }

  const toggleNone = (val) => {
    setNoneChecked((prev) => (prev === val ? null : val))
    setSelectedConditions([])
    setOtherChecked(false)
    setOtherCondition('')
  }

  const toggleOther = () => {
    setOtherChecked((prev) => !prev)
    if (otherChecked) setOtherCondition('')
    setNoneChecked(null)
  }

  const handleContinue = () => {
    const existing = JSON.parse(localStorage.getItem('userInfo') || '{}')
    localStorage.setItem('userInfo', JSON.stringify({
      ...existing,
      conditions: [
        ...selectedConditions,
        ...(otherCondition ? [`Other: ${otherCondition}`] : []),
        ...(noneChecked ? [noneChecked === 'none' ? 'None' : 'Prefer not to say'] : []),
      ],
      additionalNotes,
    }))
    navigate('/symptoms')
  }

  const CheckRow = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 hover:border-teal-400 cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-teal-600 w-4 h-4 shrink-0"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1
          onClick={() => navigate('/')}
          className="text-xl font-bold text-teal-600 cursor-pointer"
        >
          Hunter Health Care
        </h1>
        <button
          onClick={() => navigate('/patient-info')}
          className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
        >
          Back
        </button>
      </nav>

      {/* Card */}
      <div className="flex items-center justify-center flex-grow px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Medical History</h2>
          <p className="text-sm text-gray-500 mb-6">Select all that apply — this helps us make better recommendations</p>

          {/* Pre-existing Conditions */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-800 mb-1">Do you have any pre-existing medical conditions?</p>
            <p className="text-xs text-gray-400 mb-4">Select all that apply</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {CONDITIONS.map((condition) => (
                <CheckRow
                  key={condition}
                  label={condition}
                  checked={selectedConditions.includes(condition)}
                  onChange={() => toggleCondition(condition)}
                />
              ))}
            </div>

            {/* Other */}
            <div className="mt-2">
              <CheckRow label="Other" checked={otherChecked} onChange={toggleOther} />
              {otherChecked && (
                <input
                  type="text"
                  value={otherCondition}
                  onChange={(e) => setOtherCondition(e.target.value)}
                  placeholder="Please specify..."
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>

            {/* None / Prefer not to say */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
              <CheckRow
                label="None"
                checked={noneChecked === 'none'}
                onChange={() => toggleNone('none')}
              />
              <CheckRow
                label="Prefer not to say"
                checked={noneChecked === 'prefer'}
                onChange={() => toggleNone('prefer')}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-1">Additional Notes</label>
            <p className="text-xs text-gray-400 mb-3">Anything else we should know about your health?</p>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g., recent symptoms, upcoming procedures, concerns..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/symptoms')}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Skip for Now
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 py-3 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MedicalHistory