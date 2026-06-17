import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ExternalLink, Award } from 'lucide-react'
import './Certificates.css'

const demoCerts = [
  { id: 1, title: 'Virtual Assistant Freelancing Training', issuer: 'DICT – Department of Information and Communications Technology', date: 'June 2026', image_url: null, credential_url: '#' },
  { id: 2, title: 'On-the-Job Training Certificate', issuer: 'Research Extension and Development Institute (REDi)', date: 'May 2026', image_url: null, credential_url: '#' },
  { id: 3, title: 'Technical Excellence Award', issuer: 'REDi – Romblon State University', date: '2026', image_url: null, credential_url: null },
  { id: 4, title: 'Outstanding System Developer Award', issuer: 'REDi – Romblon State University', date: '2026', image_url: null, credential_url: null },
]

export default function Certificates() {
  const [certs, setCerts] = useState(demoCerts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCerts() {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) setCerts(data)
      } catch { }
      setLoading(false)
    }
    fetchCerts()
  }, [])

  return (
    <div className="certs-page page-enter">
      <section className="certs-hero section-alt">
        <div className="container">
          <span className="section-label">Credentials & Recognition</span>
          <h1 className="section-title">Certificates</h1>
          <div className="gold-line" />
          <p className="certs-hero__desc">
            A collection of certifications, training completions, and awards that reflect
            continuous learning and professional growth.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="certs-loading">Loading certificates…</div>
          ) : (
            <div className="certs-grid">
              {certs.map(cert => (
                <div key={cert.id} className="cert-card">
                  <div className="cert-card__image">
                    {cert.image_url ? (
                      <img src={cert.image_url} alt={cert.title} />
                    ) : (
                      <div className="cert-card__placeholder">
                        <Award size={40} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="cert-card__body">
                    <div className="cert-card__date">{cert.date}</div>
                    <h3 className="cert-card__title">{cert.title}</h3>
                    <p className="cert-card__issuer">{cert.issuer}</p>
                    {cert.credential_url && cert.credential_url !== '#' && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card__link"
                      >
                        View Credential <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
