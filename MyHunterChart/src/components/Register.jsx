import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError('Could not connect to server')
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to home</button>

      <h1>New Patient</h1>
      <p>Create your account</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Sign in</button>
      </p>
    </div>
  )
}