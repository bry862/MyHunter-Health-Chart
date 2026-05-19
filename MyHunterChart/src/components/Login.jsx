import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      navigate('/symptoms')
    } catch (err) {
      setError('Could not connect to server')
    }
  }

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
      </nav>

      {/* Card */}
      <div className="flex items-center justify-center flex-grow px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-teal-600 mb-6"
          >
            Back to home
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-teal-600" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>
              <button
                type="button"
                className="text-xs text-teal-600 hover:text-teal-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            No account?{' '}
            <button
              onClick={() => navigate('/create-account')}
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              Create one
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login