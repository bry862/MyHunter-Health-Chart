import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('isLoggedIn', 'true')
    navigate('/symptoms')
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to home</button>

      <h1>Welcome back</h1>
      <p>Sign in to your account</p>

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

        <label>
          <input type="checkbox" />
          Remember me
        </label>

        <button type="submit">Sign in</button>
      </form>

      <p>
        No account?{' '}
        <button onClick={() => navigate('/personal-info')}>
          Create one
        </button>
      </p>
    </div>
  )
}