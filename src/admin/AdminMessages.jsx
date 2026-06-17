import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Trash2, Mail, MailOpen } from 'lucide-react'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => { fetchMessages() }, [])

  async function fetchMessages() {
    setLoading(true)
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }

  async function markRead(id) {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id)
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, read: true } : msg))
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages(m => m.filter(msg => msg.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function openMessage(msg) {
    setSelected(msg)
    if (!msg.read) markRead(msg.id)
  }

  return (
    <div className="admin-content">
      <div className="admin-messages">
        <div className="admin-messages__list">
          {loading ? (
            <div className="admin-loading">Loading messages…</div>
          ) : messages.length === 0 ? (
            <div className="admin-empty">No messages yet.</div>
          ) : messages.map(msg => (
            <div
              key={msg.id}
              className={`admin-msg-item${!msg.read ? ' admin-msg-item--unread' : ''}${selected?.id === msg.id ? ' admin-msg-item--active' : ''}`}
              onClick={() => openMessage(msg)}
            >
              <div className="admin-msg-item__icon">
                {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
              </div>
              <div className="admin-msg-item__info">
                <div className="admin-msg-item__name">{msg.name}</div>
                <div className="admin-msg-item__email">{msg.email}</div>
                <div className="admin-msg-item__preview">{msg.message?.slice(0, 60)}…</div>
              </div>
              <div className="admin-msg-item__meta">
                <span className="admin-msg-item__date">
                  {new Date(msg.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                </span>
                <button
                  className="admin-action admin-action--delete"
                  onClick={e => { e.stopPropagation(); handleDelete(msg.id) }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-messages__detail">
          {selected ? (
            <>
              <div className="admin-msg-detail__header">
                <div>
                  <h3 className="admin-msg-detail__name">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="admin-msg-detail__email">
                    {selected.email}
                  </a>
                </div>
                <div className="admin-msg-detail__date">
                  {new Date(selected.created_at).toLocaleString('en-PH', {
                    dateStyle: 'medium', timeStyle: 'short'
                  })}
                </div>
              </div>
              <div className="admin-msg-detail__body">
                {selected.message}
              </div>
              <div className="admin-msg-detail__actions">
                <a href={`mailto:${selected.email}`} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.65rem 1.5rem' }}>
                  Reply via Email
                </a>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 1.5rem', color: '#dc2626', borderColor: '#dc2626' }}
                  onClick={() => handleDelete(selected.id)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="admin-messages__placeholder">
              <Mail size={40} strokeWidth={1} />
              <p>Select a message to read it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
