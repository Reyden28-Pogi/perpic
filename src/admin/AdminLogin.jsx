import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './AdminLogin.css'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) onLogin(data.user)
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '2rem', color: '#000' }}>Per</span>
          <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--color-gold)' }}>Pic</span>
        </div>
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="admin-login__sub">Sign in to manage your portfolio</p>

        <form onSubmit={handleLogin} className="admin-login__form">
          <div className="admin-login__group">
            <label className="admin-login__label">Email</label>
            <input
              type="email"
              className="admin-login__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@perpic.com"
              required
            />
          </div>
          <div className="admin-login__group">
            <label className="admin-login__label">Password</label>
            <input
              type="password"
              className="admin-login__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="admin-login__error">{error}</div>}
          <button type="submit" className="btn-primary admin-login__btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__note">
          Set up authentication in your Supabase dashboard under Authentication → Users.
          Enable Email auth and create an admin user.
        </p>
      </div>
    </div>
  )
}
