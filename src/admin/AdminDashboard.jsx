import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { LayoutDashboard, Image, Award, MessageSquare, LogOut, Menu, X, Upload } from 'lucide-react'
import AdminPortfolio from './AdminPortfolio'
import AdminCertificates from './AdminCertificates'
import AdminMessages from './AdminMessages'
import './AdminDashboard.css'

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'portfolio', icon: Image, label: 'Portfolio' },
  { id: 'certificates', icon: Award, label: 'Certificates' },
  { id: 'messages', icon: MessageSquare, label: 'Messages' },
]

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  return (
    <div className="admin-dash">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__logo">
          <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: '#fff', fontSize: '1.4rem' }}>Per</span>
          <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--color-gold)', fontSize: '1.4rem' }}>Pic</span>
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`admin-sidebar__item${activeTab === id ? ' admin-sidebar__item--active' : ''}`}
              onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">{user?.email?.[0]?.toUpperCase() || 'A'}</div>
            <div className="admin-sidebar__user-info">
              <div className="admin-sidebar__user-name">Admin</div>
              <div className="admin-sidebar__user-email">{user?.email || 'admin'}</div>
            </div>
          </div>
          <button className="admin-sidebar__logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(o => !o)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-main__header">
          <h1 className="admin-main__title">
            {navItems.find(n => n.id === activeTab)?.label || 'Admin'}
          </h1>
          <a href="/" target="_blank" className="admin-main__view-site">
            View Site →
          </a>
        </div>

        <div className="admin-main__content">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'portfolio' && <AdminPortfolio />}
          {activeTab === 'certificates' && <AdminCertificates />}
          {activeTab === 'messages' && <AdminMessages />}
        </div>
      </main>

      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

function AdminOverview() {
  return (
    <div className="admin-overview">
      <div className="admin-stats">
        {[
          { label: 'Portfolio Items', value: '—', hint: 'Manage in Portfolio tab' },
          { label: 'Certificates', value: '—', hint: 'Manage in Certificates tab' },
          { label: 'Messages', value: '—', hint: 'View in Messages tab' },
        ].map(s => (
          <div key={s.label} className="admin-stat">
            <div className="admin-stat__value">{s.value}</div>
            <div className="admin-stat__label">{s.label}</div>
            <div className="admin-stat__hint">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="admin-overview__intro">
        <h2>Welcome to PerPic Admin</h2>
        <p>Use the sidebar to manage your portfolio content:</p>
        <ul>
          <li><strong>Portfolio</strong> — Add, edit, and delete portfolio items with images uploaded to Supabase Storage</li>
          <li><strong>Certificates</strong> — Manage certifications and awards displayed on your portfolio</li>
          <li><strong>Messages</strong> — View contact form submissions from visitors</li>
        </ul>
        <div className="admin-overview__setup">
          <h3>⚙️ Setup Required</h3>
          <p>Make sure to:</p>
          <ol>
            <li>Add your Supabase credentials to <code>.env</code></li>
            <li>Run the SQL migrations in your Supabase SQL Editor (see <code>src/lib/supabase.js</code>)</li>
            <li>Create a Storage bucket named <code>portfolio-assets</code> (set to public)</li>
            <li>Enable Email authentication and create an admin user in Supabase Auth</li>
            <li>Update Calendly URL and Zoom link in <code>src/pages/Contact.jsx</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
