import './About.css'

const skills = [
  { name: 'Web Development', items: 'PHP, HTML, CSS, JavaScript, MySQL' },
  { name: 'Database Management', items: 'MySQL, Data Encoding, Data Validation' },
  { name: 'Virtual Assistance', items: 'Email Management, Calendar Scheduling, Online Research' },
  { name: 'Graphic Design', items: 'Canva, Social Media Graphics, Basic Layout Design' },
  { name: 'Photography', items: 'Event Photography, Photo Documentation, Image Organization' },
  { name: 'Languages', items: 'Tagalog, English, Bisaya' },
]

const experience = [
  {
    org: 'Research Extension and Development Institute (REDi)',
    role: 'On-the-Job Trainee',
    period: 'Feb 2026 – May 2026',
    highlights: [
      'Provided technical assistance, software installation, and troubleshooting support.',
      'Applied web development technologies including PHP, HTML, CSS, JavaScript, and MySQL.',
      'Conducted data encoding, validation, and organization to ensure data accuracy.',
      'Captured high-quality photographs for reports, publications, social media content.',
    ],
  },
  {
    org: 'Department of Information and Communications Technology (DICT)',
    role: 'Virtual Assistant Freelancing Training Program Trainee',
    period: 'June 2026',
    highlights: [
      'Completed comprehensive training in Virtual Assistance and Freelancing Fundamentals.',
      'Developed proficiency in administrative support, email management, and calendar scheduling.',
      'Gained knowledge in lead generation, internet research, data entry, and business support services.',
      'Applied social media management, content creation, and basic graphic design using Canva.',
    ],
  },
]

const awards = [
  'Technical Excellence Award',
  'Director Choice Award',
  'Initiative Award',
  'Creative Thinker Award',
  'Outstanding System Developer Award',
  'Most Resourceful Award',
]

export default function About() {
  return (
    <div className="about page-enter">
      {/* Header */}
      <section className="about-hero section-alt">
        <div className="container about-hero__content">
          <div className="about-hero__text">
            <span className="section-label">Who Is Behind PerPic?</span>
            <h1 className="section-title">Jam Andrey C.<br />Mariveles</h1>
            <div className="gold-line" />
            <p className="about-hero__roles">Web Developer · Photographer · Database / Data Management</p>
            <p className="about-hero__bio">
              I am a detail-oriented and adaptable professional with experience in
              Virtual Assistance Training, Web Development, Database Management,
              Photography, and Graphic Design. I specialize in providing administrative
              support, managing digital content, and developing efficient web-based
              solutions. With strong technical and communication skills, I am dedicated
              to delivering high-quality results, exceeding expectations, and contributing
              to the success of clients and organizations.
            </p>
            <p className="about-hero__bio">
              As a creative and results-driven Social Media Manager, my goal is to help
              businesses grow their online presence, connect with their target audience,
              and achieve measurable results through strategic digital marketing. I develop
              visually appealing and audience-focused content designed to inspire, inform,
              and captivate viewers while maintaining the highest level of confidentiality
              and professionalism.
            </p>
          </div>
          <div className="about-hero__avatar">
            <div className="about-avatar">
              <div className="about-avatar__ring" />
              <div className="about-avatar__initials">JAM</div>
              <div className="about-avatar__brand">
                <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: '#000' }}>Per</span>
                <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--color-gold)' }}>Pic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <div className="container">
          <span className="section-label">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <div className="gold-line" />
          <div className="edu-timeline">
            {[
              { period: '2022 – 2026', level: 'Bachelor of Science in Information Technology', school: 'Romblon State University' },
              { period: '2020 – 2022', level: 'Senior High School', school: 'Carmen National High School' },
              { period: '2016 – 2020', level: 'Junior High School', school: 'San Agustin National Trade School' },
              { period: '2015 – 2016', level: 'Elementary School', school: 'Long Beach Elementary School' },
            ].map((ed, i) => (
              <div key={i} className="edu-item">
                <div className="edu-item__dot" />
                <div className="edu-item__period">{ed.period}</div>
                <div className="edu-item__level">{ed.level}</div>
                <div className="edu-item__school">{ed.school}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section section-alt">
        <div className="container">
          <span className="section-label">Professional Journey</span>
          <h2 className="section-title">Work Experience</h2>
          <div className="gold-line" />
          <div className="exp-list">
            {experience.map((exp, i) => (
              <div key={i} className="exp-card">
                <div className="exp-card__header">
                  <div>
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <p className="exp-card__org">{exp.org}</p>
                  </div>
                  <span className="exp-card__period">{exp.period}</span>
                </div>
                <ul className="exp-card__list">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container">
          <span className="section-label">Technical Expertise</span>
          <h2 className="section-title">Skills</h2>
          <div className="gold-line" />
          <div className="skills-grid">
            {skills.map(sk => (
              <div key={sk.name} className="skill-card">
                <h4 className="skill-card__name">{sk.name}</h4>
                <p className="skill-card__items">{sk.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section section-alt">
        <div className="container">
          <span className="section-label">Recognition</span>
          <h2 className="section-title">Awards</h2>
          <div className="gold-line" />
          <div className="awards-grid">
            {awards.map(a => (
              <div key={a} className="award-badge">
                <span className="award-badge__star">★</span>
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
