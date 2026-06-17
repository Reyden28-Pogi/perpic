import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      setChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontSize: '1rem', letterSpacing: '0.2em' }}>
          LOADING…
        </div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />
  }

  return <AdminDashboard user={user} onLogout={() => setUser(null)} />
}
