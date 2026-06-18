import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Portfolio.css'

const categories = ['All', 'Photography', 'Graphic Design', 'Web Development', 'Photo Editing']

function PortfolioCard({ item }) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-card__image">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} />
        ) : (
          <div className="portfolio-card__placeholder">
            <span>{item.category?.charAt(0) || 'P'}</span>
          </div>
        )}
        <div className="portfolio-card__overlay">
          <span className="portfolio-card__cat">{item.category}</span>
        </div>
      </div>
      <div className="portfolio-card__body">
        <h3 className="portfolio-card__title">{item.title}</h3>
        <p className="portfolio-card__desc">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="portfolio-card__tags">
            {item.tags.map(t => <span key={t} className="portfolio-card__tag">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setItems(data)
      setLoading(false)
    }
    fetchItems()
  }, [])

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  return (
    <div className="portfolio-page page-enter">
      <section className="portfolio-hero section-alt">
        <div className="container">
          <span className="section-label">Creative Work</span>
          <h1 className="section-title">Portfolio</h1>
          <div className="gold-line" />
          <p className="portfolio-hero__desc">
            A curated collection of photography, graphic design, web development, and photo editing projects.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`portfolio-filter${activeCategory === cat ? ' portfolio-filter--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="portfolio-loading">Loading portfolio…</div>
          ) : filtered.length === 0 ? (
            <div className="portfolio-empty">
              <div className="portfolio-empty__icon">🖼️</div>
              <h3>No items yet</h3>
              <p>Portfolio items added from the admin panel will appear here.</p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filtered.map(item => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}