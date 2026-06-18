import { Link } from 'react-router-dom'
import { ArrowRight, Camera, Palette, Code, Headphones } from 'lucide-react'
import './Home.css'

const services = [
  {
    icon: Camera,
    title: 'Photography',
    desc: 'Professional on-location and studio sessions capturing stunning portraits and landscapes.',
  },
  {
    icon: Palette,
    title: 'Photo Editing',
    desc: 'Advanced retouching, colorization, restoration, and large-format upscaling.',
  },
  {
    icon: Code,
    title: 'Web Development',
    desc: 'Backend management and PHP development with seamless UI improvements.',
  },
  {
    icon: Headphones,
    title: 'Virtual Assistance',
    desc: 'Email management, data entry, scheduling, and bilingual transcription services.',
  },
]

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <div className="hero__text">
            <span className="section-label">GVA Scholar · PerPic</span>
            <h1 className="hero__title">
              Make Your<br />
              <em className="hero__title-em">Pics</em> Perfect
            </h1>
            <p className="hero__subtitle">
              Jam Andrey C. Mariveles — Web Developer, Photographer,
              and Virtual Assistant. Observant detail, perfect results.
            </p>
            <div className="hero__actions">
              <Link to="/portfolio" className="btn-primary">
                View Portfolio <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Book a Session
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__cam-wrap">
              {/* Camera body - black solid */}
              <div className="hero__cam-body">
                {/* Top bump/viewfinder */}
                <div className="hero__cam-bump" />
                {/* Left dot */}
                <div className="hero__cam-dot hero__cam-dot--left" />
                {/* Right dot */}
                <div className="hero__cam-dot hero__cam-dot--right" />
                {/* Lens - gold outer ring, dark inner, sky+ground scene */}
                <div className="hero__cam-lens-outer">
                  <div className="hero__cam-lens-mid">
                    <div className="hero__cam-lens-inner">
                      <div className="hero__cam-sky" />
                      <div className="hero__cam-ground" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Brand name below camera */}
              <div className="hero__cam-brand">
                <span className="hero__brand-per">Per</span><span className="hero__brand-pic">Pic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Brand Advantage */}
      <section className="section section-alt">
        <div className="container">
          <div className="brand-advantage">
            <div className="brand-advantage__left">
              <span className="section-label">Fascination Advantage</span>
              <h2 className="section-title">The Mystique<br />Brand</h2>
              <div className="gold-line" />
              <p>
                PerPic's brand advantage is <strong>Mystique</strong> — the fascination
                archetype of curiosity, depth, and selective disclosure.
                Every project is approached with observant, calculated precision.
              </p>
            </div>
            <div className="brand-advantage__pillars">
              {['Observant', 'Calculated', 'Private', 'Curiosity', 'Provoking', 'Substantive'].map(p => (
                <div key={p} className="brand-advantage__pill">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <div className="services-preview">
            <div className="services-preview__header">
              <span className="section-label">What I Offer</span>
              <h2 className="section-title">Services</h2>
            </div>
            <div className="services-preview__grid">
              {services.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="service-card">
                  <div className="service-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card__title">{title}</h3>
                  <p className="service-card__desc">{desc}</p>
                </div>
              ))}
            </div>
            <div className="services-preview__cta">
              <Link to="/services" className="btn-primary">
                View All Services & Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__content">
          <div className="cta-banner__tagline">
            <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
              Tagline
            </span>
            <h2 className="cta-banner__quote">
              "Observant Detail,<br />Perfect Results"
            </h2>
          </div>
          <Link to="/contact" className="btn-outline" style={{ borderColor: 'var(--color-gold)', color: 'var(--color-cream)' }}>
            Let's Work Together <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}