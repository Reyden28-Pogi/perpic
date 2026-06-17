import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Trash2, Edit2, Save, X, Upload } from 'lucide-react'
import './AdminContent.css'

const empty = { title: '', category: 'Photography', description: '', tags: '', featured: false }
const categories = ['Photography', 'Graphic Design', 'Web Development', 'Photo Editing']

export default function AdminPortfolio() {
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
    const { data } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `portfolio/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('portfolio-assets').upload(fileName, file)
    if (!error) {
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName)
      setForm(f => ({ ...f, image_url: data.publicUrl }))
    } else {
      setMessage({ type: 'error', text: 'Upload failed: ' + error.message })
    }
    setUploading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] }
    if (editing) {
      const { error } = await supabase.from('portfolio_items').update(payload).eq('id', editing)
      if (!error) { setMessage({ type: 'success', text: 'Item updated!' }); resetForm() }
      else setMessage({ type: 'error', text: error.message })
    } else {
      const { error } = await supabase.from('portfolio_items').insert([payload])
      if (!error) { setMessage({ type: 'success', text: 'Item added!' }); resetForm() }
      else setMessage({ type: 'error', text: error.message })
    }
    fetchItems()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return
    await supabase.from('portfolio_items').delete().eq('id', id)
    fetchItems()
  }

  function startEdit(item) {
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : '' })
    setEditing(item.id)
    setShowForm(true)
  }

  function resetForm() {
    setForm(empty)
    setEditing(null)
    setShowForm(false)
  }

  return (
    <div className="admin-content">
      <div className="admin-content__toolbar">
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(empty) }}>
          <Plus size={16} /> Add Item
        </button>
      </div>

      {message && (
        <div className={`admin-msg admin-msg--${message.type}`}>{message.text}</div>
      )}

      {showForm && (
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-form__header">
            <h3>{editing ? 'Edit Item' : 'New Portfolio Item'}</h3>
            <button type="button" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="admin-form__grid">
            <div className="admin-form__group">
              <label>Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
            </div>
            <div className="admin-form__group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-form__group admin-form__group--full">
              <label>Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description…" />
            </div>
            <div className="admin-form__group">
              <label>Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="portrait, studio, editing" />
            </div>
            <div className="admin-form__group">
              <label>Image</label>
              <div className="admin-upload">
                <label className="admin-upload__btn">
                  <Upload size={14} />
                  {uploading ? 'Uploading…' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                {form.image_url && <span className="admin-upload__name">✓ Image set</span>}
              </div>
            </div>
            <div className="admin-form__group">
              <label className="admin-checkbox">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                Feature this item
              </label>
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
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No items yet. Add your first portfolio item.</td></tr>
              ) : items.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td><span className="admin-badge">{item.category}</span></td>
                  <td>{item.featured ? '★ Yes' : '—'}</td>
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
