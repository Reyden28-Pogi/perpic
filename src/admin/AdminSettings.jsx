import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Save, Globe, Phone, Mail, MapPin, Calendar, Video } from 'lucide-react'
import './AdminContent.css'
import './AdminSettings.css'

const FIELDS = [
  {
    section: 'Personal Info',
    fields: [
      { key: 'name', label: 'Full Name', placeholder: 'Jam Andrey Mariveles', icon: null, type: 'text' },
      { key: 'email', label: 'Email Address', placeholder: 'marivelesjam@gmail.com', icon: Mail, type: 'email' },
      { key: 'phone', label: 'Phone Number', placeholder: '09516460822', icon: Phone, type: 'text' },
      { key: 'address', label: 'Address', placeholder: 'Long Beach, San Agustin, Romblon', icon: MapPin, type: 'text' },
    ]
  },
  {
    section: 'Booking & Meetings',
    fields: [
      { key: 'calendly_url', label: 'Calendly URL', placeholder: 'https://calendly.com/your-username', icon: Calendar, type: 'url' },
      { key: 'zoom_link', label: 'Zoom Meeting Link', placeholder: 'https://zoom.us/j/your-meeting-id', icon: Video, type: 'url' },
    ]
  },
  {
    section: 'Social Media Links',
    fields: [
      { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/your-page', icon: Globe, type: 'url' },
      { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@your-channel', icon: Globe, type: 'url' },
      { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/your-handle', icon: Globe, type: 'url' },
      { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/your-handle', icon: Globe, type: 'url' },
      { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/your-profile', icon: Globe, type: 'url' },
    ]
  }
]

const DEFAULTS = {
  name: 'Jam Andrey Mariveles',
  email: 'marivelesjam@gmail.com',
  phone: '09516460822',
  address: 'Long Beach, San Agustin, Romblon',
  calendly_url: '',
  zoom_link: '',
  facebook: '',
  youtube: '',
  instagram: '',
  twitter: '',
  linkedin: '',
}

export default function AdminSettings() {
  const [values, setValues] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => { fetchSettings() }, [])

  async function fetchSettings() {
    setLoading(true)
    try {
      const { data } = await supabase.from('site_settings').select('key, value')
      if (data && data.length > 0) {
        const map = {}
        data.forEach(({ key, value }) => { map[key] = value })
        setValues(v => ({ ...v, ...map }))
      }
    } catch {}
    setLoading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      // Upsert each key-value pair
      const upserts = Object.entries(values).map(([key, value]) => ({ key, value }))
      const { error } = await supabase
        .from('site_settings')
        .upsert(upserts, { onConflict: 'key' })
      if (error) throw error
      setMessage({ type: 'success', text: '✓ Settings saved successfully! Changes are now live on the website.' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save: ' + err.message })
    }
    setSaving(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <div className="admin-loading">Loading settings…</div>

  return (
    <div className="admin-content">
      {message && (
        <div className={`admin-msg admin-msg--${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSave}>
        {FIELDS.map(group => (
          <div key={group.section} className="settings-group">
            <h3 className="settings-group__title">{group.section}</h3>
            <div className="settings-group__fields">
              {group.fields.map(({ key, label, placeholder, icon: Icon, type }) => (
                <div key={key} className="settings-field">
                  <label className="settings-field__label">
                    {Icon && <Icon size={13} />}
                    {label}
                  </label>
                  <input
                    type={type}
                    className="settings-field__input"
                    placeholder={placeholder}
                    value={values[key] || ''}
                    onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="settings-save-bar">
          <div className="settings-save-bar__note">
            Changes will appear on the website immediately after saving.
          </div>
          <button type="submit" className="btn-primary settings-save-btn" disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving…' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}