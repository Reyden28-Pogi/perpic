import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'
import logo from '../assets/perpic-logo.jpg'
import './Footer.css'

const SocialIcons = {
  Facebook: () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  YouTube: () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  Instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  Twitter: () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  LinkedIn: () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
}

const SOCIAL_KEYS = ['Facebook', 'YouTube', 'Instagram', 'Twitter', 'LinkedIn']

const defaultSettings = {
  name: 'Jam Andrey Mariveles',
  email: 'marivelesjam@gmail.com',
  phone: '09516460822',
  address: 'Long Beach, San Agustin, Romblon',
  facebook: '',
  youtube: '',
  instagram: '',
  twitter: '',
  linkedin: '',
}

export default function Footer() {
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase.from('site_settings').select('key, value')
        if (data && data.length > 0) {
          const map = {}
          data.forEach(({ key, value }) => { map[key] = value })
          setSettings(s => ({ ...s, ...map }))
        }
      } catch {}
    }
    fetchSettings()
  }, [])

  const socials = SOCIAL_KEYS
    .map(key => ({ key, Icon: SocialIcons[key], href: settings[key.toLowerCase()] }))
    .filter(s => s.href)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={logo} alt="PerPic" className="footer__logo-img" />
            <p className="footer__desc">
              A creative and results-driven professional specializing in photography,
              graphic design, web development, and virtual assistance.
            </p>
            {socials.length > 0 && (
              <div className="footer__socials">
                {socials.map(({ key, Icon, href }) => (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                    className="footer__social" aria-label={key}>
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="footer__nav">
            <h4 className="footer__nav-title">Navigate</h4>
            <Link to="/" className="footer__nav-link">Home</Link>
            <Link to="/about" className="footer__nav-link">About</Link>
            <Link to="/portfolio" className="footer__nav-link">Portfolio</Link>
            <Link to="/certificates" className="footer__nav-link">Certificates</Link>
            <Link to="/services" className="footer__nav-link">Services</Link>
            <Link to="/contact" className="footer__nav-link">Contact</Link>
          </div>

          <div className="footer__contact">
            <h4 className="footer__nav-title">Get in Touch</h4>
            <div className="footer__contact-item">
              <Mail size={15} />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
            <div className="footer__contact-item">
              <Phone size={15} />
              <span>{settings.phone}</span>
            </div>
            <div className="footer__contact-item">
              <MapPin size={15} />
              <span>{settings.address}</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} PerPic by {settings.name}. All rights reserved.</p>
          <Link to="/admin" className="footer__admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  )
}