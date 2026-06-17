import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Portfolio.css'

const categories = ['All', 'Photography', 'Graphic Design', 'Web Development', 'Photo Editing']

// Demo items shown when Supabase is not yet connected
const demoItems = [
  { id: 1, title: 'Portrait Photography', category: 'Photography', description: 'Professional portrait session showcasing natural lighting techniques.', image_url: null, tags: ['portrait', 'studio'] },
  { id: 2, title: 'PerPic Brand Identity', category: 'Graphic Design', description: 'Complete brand identity design including logo, color palette, and typography.', image_url: null, tags: ['branding', 'logo'] },
  { id: 3, title: 'Event Documentation', category: 'Photography', description: 'Comprehensive event coverage with high-quality candid and posed shots.', image_url: null, tags: ['event', 'documentation'] },
  { id: 4, title: 'Photo Restoration', category: 'Photo Editing', description: 'Meticulous restoration of old damaged photographs.', image_url: null, tags: ['restoration', 'editing'] },
  { id: 5, title: 'Web Portal Development', category: 'Web Development', description: 'PHP-based web portal with MySQL database and responsive UI.', image_url: null, tags: ['php', 'mysql'] },
  { id: 6, title: 'Social Media Graphics', category: 'Graphic Design', description: 'Cohesive social media graphic set designed in Canva.', image_url: null, tags: ['social media', 'canva'] },
]

function PortfolioCard({ item }) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-card__image">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} />
        ) : (
          <div className="portfolio-card__placeholder">
            <span>{item.category.charAt(0)}</span>
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
  const [items, setItems] = useState(demoItems)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) setItems(data)
      } catch {
        // Use demo items if Supabase not connected
      }
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
