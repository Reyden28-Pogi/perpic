import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Trash2, Edit2, Save, X, Upload } from 'lucide-react'

const empty = { title: '', issuer: '', date: '', credential_url: '', image_url: '' }

export default function AdminCertificates() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `certificates/${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('portfolio-assets').upload(fileName, file)
    if (!error) {
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName)
      setForm(f => ({ ...f, image_url: data.publicUrl }))
    }
    setUploading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (editing) {
      const { error } = await supabase.from('certificates').update(form).eq('id', editing)
      if (!error) { setMessage({ type: 'success', text: 'Certificate updated!' }); resetForm() }
      else setMessage({ type: 'error', text: error.message })
    } else {
      const { error } = await supabase.from('certificates').insert([form])
      if (!error) { setMessage({ type: 'success', text: 'Certificate added!' }); resetForm() }
      else setMessage({ type: 'error', text: error.message })
    }
    fetchItems()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this certificate?')) return
    await supabase.from('certificates').delete().eq('id', id)
    fetchItems()
  }

  function startEdit(item) { setForm(item); setEditing(item.id); setShowForm(true) }
  function resetForm() { setForm(empty); setEditing(null); setShowForm(false) }

  return (
    <div className="admin-content">
      <div className="admin-content__toolbar">
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(empty) }}>
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {message && <div className={`admin-msg admin-msg--${message.type}`}>{message.text}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-form__header">
            <h3>{editing ? 'Edit Certificate' : 'New Certificate'}</h3>
            <button type="button" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="admin-form__grid">
            <div className="admin-form__group admin-form__group--full">
              <label>Certificate Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Virtual Assistant Freelancing Training" />
            </div>
            <div className="admin-form__group">
              <label>Issuer / Organization</label>
              <input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} placeholder="e.g. DICT" />
            </div>
            <div className="admin-form__group">
              <label>Date</label>
              <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. June 2026" />
            </div>
            <div className="admin-form__group admin-form__group--full">
              <label>Credential URL (optional)</label>
              <input type="url" value={form.credential_url} onChange={e => setForm(f => ({ ...f, credential_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form__group">
              <label>Certificate Image</label>
              <div className="admin-upload">
                <label className="admin-upload__btn">
                  <Upload size={14} />
                  {uploading ? 'Uploading…' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                {form.image_url && <span className="admin-upload__name">✓ Image set</span>}
              </div>
            </div>
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="btn-primary"><Save size={15} /> {editing ? 'Update' : 'Save'}</button>
            <button type="button" className="btn-outline" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-loading">Loading…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Issuer</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No certificates yet.</td></tr>
              ) : items.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.issuer}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-action admin-action--edit" onClick={() => startEdit(item)}><Edit2 size={14} /></button>
                      <button className="admin-action admin-action--delete" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
