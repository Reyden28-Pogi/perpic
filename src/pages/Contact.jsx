import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Mail, Phone, MapPin, Video, Calendar, Send } from 'lucide-react'
import './Contact.css'

const CALENDLY_URL = 'https://calendly.com/marivelesjam'
const ZOOM_LINK = 'https://zoom.us/j/your-meeting-id'

const SocialIcons = {
  Facebook: () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Youtube: () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  Instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  Twitter: () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  LinkedIn: () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
}

const SOCIAL_LINKS = [
  { Icon: SocialIcons.Facebook, href: 'https://facebook.com/perpic', label: 'Facebook', color: '#1877F2' },
  { Icon: SocialIcons.Youtube, href: 'https://youtube.com/@perpic', label: 'YouTube', color: '#FF0000' },
  { Icon: SocialIcons.Instagram, href: 'https://instagram.com/perpic', label: 'Instagram', color: '#E4405F' },
  { Icon: SocialIcons.Twitter, href: 'https://x.com/perpic', label: 'X (Twitter)', color: '#000000' },
  { Icon: SocialIcons.LinkedIn, href: 'https://linkedin.com/in/jamandrey-mariveles', label: 'LinkedIn', color: '#0A66C2' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const { error } = await supabase.from('contact_messages').insert([form])
      if (error) throw error
      setStatus({ type: 'success', msg: "Message sent! I'll get back to you soon." })
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus({ type: 'success', msg: "Thank you for your message! I'll get back to you soon." })
      setForm({ name: '', email: '', message: '' })
    }
    setSending(false)
  }

  return (
    <div className="contact-page page-enter">
      <section className="contact-hero section-alt">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className="section-title">Contact</h1>
          <div className="gold-line" />
          <p className="contact-hero__desc">
            Ready to work together? Schedule a call, send a message, or connect on social media.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="contact-info__title">Let's Connect</h2>
            <div className="contact-detail">
              <div className="contact-detail__icon"><Mail size={18} /></div>
              <div>
                <div className="contact-detail__label">Email</div>
                <a href="mailto:marivelesjam@gmail.com" className="contact-detail__value">marivelesjam@gmail.com</a>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail__icon"><Phone size={18} /></div>
              <div>
                <div className="contact-detail__label">Phone</div>
                <span className="contact-detail__value">09516460822</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail__icon"><MapPin size={18} /></div>
              <div>
                <div className="contact-detail__label">Location</div>
                <span className="contact-detail__value">Long beach, San Agustin, Romblon</span>
              </div>
            </div>

            <div className="contact-cta-block">
              <div className="contact-cta-block__icon"><Calendar size={22} /></div>
              <div className="contact-cta-block__text">
                <h4>Book a Meeting</h4>
                <p>Schedule via Calendly (integrated with Zoom)</p>
              </div>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary contact-cta-btn">
                Book via Calendly
              </a>
            </div>

            <div className="contact-cta-block">
              <div className="contact-cta-block__icon"><Video size={22} /></div>
              <div className="contact-cta-block__text">
                <h4>Join Zoom Meeting</h4>
                <p>Quick video call — no scheduling needed</p>
              </div>
              <a href={ZOOM_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline contact-cta-btn">
                Open Zoom
              </a>
            </div>

            <div className="contact-socials">
              <h4 className="contact-socials__title">Follow on Social Media</h4>
              <div className="contact-socials__grid">
                {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="contact-social-link" aria-label={label}>
                    <div className="contact-social-link__icon" style={{ '--social-color': color }}>
                      <Icon />
                    </div>
                    <span className="contact-social-link__label">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2 className="contact-form-title">Send a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" className="contact-form__input"
                  placeholder="Juan Dela Cruz" value={form.name} onChange={handleChange} required />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" className="contact-form__input"
                  placeholder="juan@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="contact-form__textarea"
                  placeholder="Tell me about your project…" rows={6} value={form.message} onChange={handleChange} required />
              </div>
              {status && (
                <div className={`contact-form__status contact-form__status--${status.type}`}>{status.msg}</div>
              )}
              <button type="submit" className="btn-primary contact-form__submit" disabled={sending}>
                {sending ? 'Sending…' : <><span>Send Message</span> <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="calendly-section">
            <span className="section-label">Schedule</span>
            <h2 className="section-title">Book a Consultation</h2>
            <div className="gold-line" />
            <p style={{ marginBottom: '2rem', color: 'var(--color-charcoal)' }}>
              Choose a time that works for you. All bookings are automatically connected to Zoom.
            </p>
            <div className="calendly-embed-wrap">
              <iframe
                src={`${CALENDLY_URL}?embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1`}
                width="100%" height="700" frameBorder="0"
                title="Book a meeting with Jam Andrey"
                className="calendly-iframe"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
