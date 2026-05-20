// components/Home.jsx
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Hunter Health Care
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-md">
          Get personalized care recommendations and prescriptions
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <button
            onClick={() => navigate('/create-account')}
            className="p-8 bg-white border-2 border-teal-200 rounded-2xl hover:shadow-lg hover:border-teal-400 transition-all text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">New Patient</h2>
            <p className="text-gray-500">
              Create your profile and get personalized recommendations
            </p>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="p-8 bg-white border-2 border-blue-200 rounded-2xl hover:shadow-lg hover:border-blue-400 transition-all text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Returning Patient</h2>
            <p className="text-gray-500">
              Sign in to access your account and health history
            </p>
          </button>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          This service provides general health information and is not a substitute for professional medical advice.
        </p>
      </main>
    </div>
  )
}

export default Home