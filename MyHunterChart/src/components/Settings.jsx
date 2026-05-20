import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Settings() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Pre-fill from localStorage on load
  useEffect(() => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      setFormData(JSON.parse(stored))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSuccess('')
    setError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const username = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/patient/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, username })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      localStorage.setItem('userInfo', JSON.stringify(formData))
      setSuccess('Your information has been updated.')
    } catch (err) {
      setError('Could not connect to server')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar showBack backPath="/" backLabel="Back to home" />

      <div className="flex items-center justify-center flex-grow px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Settings</h2>
          <p className="text-sm text-gray-500 mb-6">Update your personal information</p>

          <form onSubmit={handleSave}>

            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* DOB + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-xs text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* City / State / ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code <span className="text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Success / Error messages */}
            {success && (
              <p className="text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 mb-4">
                {success}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors"
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Settings