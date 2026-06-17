import './Services.css'

const services = [
  {
    category: 'Photography Packages',
    icon: '📷',
    items: [
      {
        name: 'Versatile Photoshoots',
        desc: 'Professional on-location or studio sessions, expertly capturing both stunning portrait and sweeping landscape scenes.',
        price: '₱2,500 – ₱5,000',
        unit: 'per session',
      },
    ],
  },
  {
    category: 'Advanced Photo Editing & Enhancements',
    icon: '🎨',
    items: [
      {
        name: 'Authentic Retouching',
        desc: 'High-quality skin clearing and photo polishing that strictly maintains the subject\'s natural facial features and true identity.',
        price: '₱300 – ₱500',
        unit: 'per image',
      },
      {
        name: 'Large-Format Upscaling',
        desc: 'Enhancing standard images to ultra-high definition (2K quality) so they remain crystal clear when printed on large materials like tarpaulins.',
        price: '₱500 – ₱800',
        unit: 'per image',
      },
      {
        name: 'Professional ID Creation',
        desc: 'Expert capturing and editing for polished, standard-compliant professional ID photos.',
        price: '₱150 – ₱250',
        unit: 'per set',
      },
    ],
  },
  {
    category: 'Photo Restoration & Colorization',
    icon: '🖼️',
    items: [
      {
        name: 'Memory Recovery',
        desc: 'Meticulous restoration of old or damaged photographs to clear up scratches, fading, and environmental wear.',
        price: '₱800 – ₱1,500',
        unit: 'per image (depending on damage extent)',
      },
      {
        name: 'Historical Colorization',
        desc: 'Breathing vibrant life into black-and-white images, perfect for preserving treasured moments like vintage wedding photographs.',
        price: '₱1,000 – ₱2,000',
        unit: 'per image',
      },
    ],
  },
  {
    category: 'Virtual Assistant Services',
    icon: '💼',
    items: [
      {
        name: 'General Administrative Support',
        desc: 'Email management, data entry, scheduling, and standard administrative tasks to keep daily operations running smoothly.',
        price: '₱200 – ₱300',
        unit: 'per hour',
      },
      {
        name: 'Bilingual Transcription',
        desc: 'Fast, accurate audio and video transcription services specializing in both Tagalog and Bisaya dialects.',
        price: '₱50 – ₱80',
        unit: 'per audio minute',
      },
      {
        name: 'Web Portal & Technical Support',
        desc: 'Backend management and troubleshooting for web projects, including PHP development, UI improvements, and seamless feature integration.',
        price: '₱350 – ₱500',
        unit: 'per hour',
      },
    ],
  },
]

export default function Services() {
  return (
    <div className="services-page page-enter">
      <section className="services-hero section-alt">
        <div className="container">
          <span className="section-label">What I Offer</span>
          <h1 className="section-title">Pricing & Services</h1>
          <div className="gold-line" />
          <p className="services-hero__desc">
            Transparent, competitive pricing for photography, editing, restoration, and virtual assistance services.
            All rates are negotiable based on project scope.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {services.map(category => (
            <div key={category.category} className="services-category">
              <div className="services-category__header">
                <span className="services-category__icon">{category.icon}</span>
                <h2 className="services-category__title">{category.category}</h2>
              </div>
              <div className="services-items">
                {category.items.map(item => (
                  <div key={item.name} className="service-item">
                    <div className="service-item__info">
                      <h3 className="service-item__name">{item.name}</h3>
                      <p className="service-item__desc">{item.desc}</p>
                    </div>
                    <div className="service-item__pricing">
                      <div className="service-item__price">{item.price}</div>
                      <div className="service-item__unit">{item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="section section-alt">
        <div className="container">
          <div className="services-note">
            <h3 className="services-note__title">Custom Quote?</h3>
            <p className="services-note__text">
              All rates listed are starting prices and may vary depending on project complexity, turnaround time,
              and specific requirements. Contact me for a personalized quote.
            </p>
            <a href="/contact" className="btn-primary">Request a Custom Quote</a>
          </div>
        </div>
      </section>
    </div>
  )
}
