import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

function Symptoms() {
  const navigate = useNavigate()
  const symptoms = [
    'Request for Routine Bloodwork',
    'Request for STD Panel',
    'Dermatitis',
    'Request for Medication Refill',
    'Fever',
    'Headache',
    'Nose Complaint',
    'Eye Complaint',
    'Knee Complaint',
    'Back Complaint',
    'Shoulder Complaint',
    'Nasal Congestion',
    'Sinus Congestion',
    'Urinary Symptoms',
    'Cough',
    'Sore Throat',
    'Chest Pain',
    'Shortness of Breath',
    'Fatigue',
    'Nausea',
    'Dizziness',
    'Other',
  ]

  const handleSubmit = () => {
    navigate('/waitingroom')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-12 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 border border-teal-100">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-teal-700 mb-2">
              Present Illness Symptoms
            </h1>

            <p className="text-black-600">
              Select ALL symptoms patient is experiencing.
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <label
                key={index}
                className="flex items-center gap-3 bg-teal-50 hover:bg-teal-100 transition p-4 rounded-2xl cursor-pointer border border-teal-100"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-teal-600"
                />

                <span className="text-gray-800 font-medium">
                  {symptom}
                </span>
              </label>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-md transition"
            >
              Submit Symptoms
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Symptoms