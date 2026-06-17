import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { LayoutDashboard, Image, Award, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react'
import AdminPortfolio from './AdminPortfolio'
import AdminCertificates from './AdminCertificates'
import AdminMessages from './AdminMessages'
import AdminSettings from './AdminSettings'
import './AdminDashboard.css'

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'portfolio', icon: Image, label: 'Portfolio' },
  { id: 'certificates', icon: Award, label: 'Certificates' },
  { id: 'messages', icon: MessageSquare, label: 'Messages' },
  { id: 'settings', icon: Settings, label: 'Settings' },
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

      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <main className="admin-main">
        <div className="admin-main__header">
          <h1 className="admin-main__title">
            {navItems.find(n => n.id === activeTab)?.label || 'Admin'}
          </h1>
          <a href="/" target="_blank" className="admin-main__view-site">View Site →</a>
        </div>
        <div className="admin-main__content">
          {activeTab === 'overview'      && <AdminOverview setActiveTab={setActiveTab} />}
          {activeTab === 'portfolio'     && <AdminPortfolio />}
          {activeTab === 'certificates'  && <AdminCertificates />}
          {activeTab === 'messages'      && <AdminMessages />}
          {activeTab === 'settings'      && <AdminSettings />}
        </div>
      </main>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

function AdminOverview({ setActiveTab }) {
  const cards = [
    { id: 'portfolio',    icon: '🖼️', label: 'Portfolio',     desc: 'Add or edit portfolio items' },
    { id: 'certificates', icon: '🏆', label: 'Certificates',  desc: 'Manage credentials & awards' },
    { id: 'messages',     icon: '✉️', label: 'Messages',      desc: 'Read contact form submissions' },
    { id: 'settings',     icon: '⚙️', label: 'Settings',      desc: 'Update links, socials & info' },
  ]
  return (
    <div className="admin-overview">
      <p className="admin-overview__welcome">Welcome back! What would you like to manage today?</p>
      <div className="admin-overview__cards">
        {cards.map(c => (
          <button key={c.id} className="admin-overview__card" onClick={() => setActiveTab(c.id)}>
            <span className="admin-overview__card-icon">{c.icon}</span>
            <span className="admin-overview__card-label">{c.label}</span>
            <span className="admin-overview__card-desc">{c.desc}</span>
          </button>
        ))}
      </div>
      <div className="admin-overview__tip">
        <strong>💡 Tip:</strong> Go to <strong>Settings</strong> to update your social media links, Calendly URL, Zoom link, and contact info. Changes appear on the website immediately after saving.
      </div>
    </div>
  )
}