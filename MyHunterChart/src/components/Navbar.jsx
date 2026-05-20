// components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ showBack = false, backPath = '/', backLabel = 'Back' }) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [username, setUsername] = useState(null)
  const dropdownRef = useRef(null)

  // Read username from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('username')
    if (stored) setUsername(stored)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Clear localStorage and redirect to home
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userInfo')
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <h1
        onClick={() => navigate('/')}
        className="text-xl font-bold text-teal-600 cursor-pointer select-none"
      >
        Hunter Health Care
      </h1>

      <div className="flex items-center gap-3">
        {/* Optional back button */}
        {showBack && (
          <button
            onClick={() => navigate(backPath)}
            className="text-sm text-gray-500 hover:text-teal-600 transition-colors mr-2"
          >
            {backLabel}
          </button>
        )}

        {/* Cart button */}
        <button
          onClick={() => navigate('/cart')}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-teal-400 hover:text-teal-600 transition-colors"
        >
          Cart
        </button>

        {/* Show user dropdown if logged in, otherwise show Sign in button */}
        {username ? (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar + username button */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-teal-400 hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-700 font-medium max-w-[120px] truncate">
                {username}
              </span>
              <span className="text-xs text-gray-400">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-700 truncate">{username}</p>
                </div>

                {/* Settings button */}
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/settings') }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                >
                  Settings
                </button>

                {/* Log out button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Not logged in
          <button
            onClick={() => navigate('/login')}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar