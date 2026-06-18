import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ExternalLink, Award } from 'lucide-react'
import './Certificates.css'

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCerts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setCerts(data)
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
          ) : certs.length === 0 ? (
            <div className="portfolio-empty">
              <div className="portfolio-empty__icon">🏆</div>
              <h3>No certificates yet</h3>
              <p>Certificates added from the admin panel will appear here.</p>
            </div>
          ) : (
            <div className="certs-grid">
              {certs.map(cert => (
                <div key={cert.id} className="cert-card">
                  <div className="cert-card__image">
                    {cert.image_url && cert.image_url.trim() !== '' ? (
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div className="cert-card__placeholder" style={{ display: cert.image_url && cert.image_url.trim() !== '' ? 'none' : 'flex' }}>
                      <Award size={40} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="cert-card__body">
                    <div className="cert-card__date">{cert.date}</div>
                    <h3 className="cert-card__title">{cert.title}</h3>
                    <p className="cert-card__issuer">{cert.issuer}</p>
                    {cert.credential_url && (
                      <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                        className="cert-card__link">
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