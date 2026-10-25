
import './index.css';
import logo from './assets/brand-roots-logo.jpeg';


const domains = [
  {
    name: 'ROOTFIND',
    subtitle: 'Discover the real problem.',
    words: 'UNDERSTAND · ANALYSE · UNCOVER',
    description:
      "We go beyond assumptions to find what's truly holding your business back.",
    services: [
      {
        name: 'SME Growth Diagnosis',
        description: 'Find where your business is losing growth.',
      },
      {
        name: 'Business Position Gap',
        description: 'Identify your differentiation and market position.',
      },
      {
        name: 'Customer Research Gap',
        description: 'Reveal what your customers really think and want.',
      },
      {
        name: 'Customer Intelligence',
        description: 'Turn insights into actionable customer strategy.',
      },
    ],
    price: '₹4,999',
    duration: '2–4 weeks',
  },
  {
    name: 'ROOTBUILD',
    subtitle: 'Build a stronger business & brand.',
    words: 'STRATEGIC · CREATE · TRANSFORM',
    description:
      'We build the foundations that make your business stronger, smarter and more relevant.',
    services: [
      {
        name: 'Traditional Business → Modern Business',
        description: 'Modernise your systems, branding and go-to-market.',
      },
      {
        name: 'Founder → Brand',
        description: 'Turn your business into a powerful brand.',
      },
      {
        name: 'Brand Experience Design',
        description: 'Create consistent, memorable customer experiences.',
      },
      {
        name: 'Revenue Leak / Conversion Counselling',
        description: "Find what's blocking your revenue.",
      },
    ],
    price: '₹14,999',
    duration: '4–8 weeks',
  },
  {
    name: 'ROOTGROW',
    subtitle: 'Create a system for continuous growth.',
    words: 'OPTIMISE · AUTOMATE · SCALE',
    description:
      'We turn your foundation into a repeatable growth engine.',
    services: [
      {
        name: 'Customer Lifetime Value',
        description: 'Build retention, repeat purchases and referrals.',
      },
      {
        name: 'Marketing OS',
        description: 'Create a structured, measurable marketing system.',
      },
      {
        name: 'Fractional Growth Department',
        description: 'Get ongoing growth leadership and execution support.',
      },
    ],
    price: '₹24,999',
    duration: '2–8 weeks',
    recurring: 'per month',
  },
];

function App() {
  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Brand Roots home">
          <img src={logo} alt="Brand Roots logo" className="brand-logo" />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#approach">Our approach</a>
          <a href="#about">About</a>
        </nav>

        <a className="button button-gold nav-cta" href="#contact">
          Let's talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-decoration" aria-hidden="true">✳</div>

          <div className="hero-content">
            <p className="eyebrow">
              Restaurant consulting & growth management
            </p>

            <h1>
              Grow with purpose.
              <span>Lead with confidence.</span>
            </h1>

            <p className="hero-description">
              Strategic thinking. Stronger systems. Sustainable growth.
              We help restaurants build their next chapter from the roots up.
            </p>

            <div className="hero-actions">
              <a className="button button-gold" href="#contact">
                Let's talk growth <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#services">
                Explore our services <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-line" />
              Thoughtfully built. Intentionally grown.
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-side-content">
              <span className="side-label">THE BRAND ROOTS APPROACH</span>
              <p>Rooted in strategy.</p>
              <p className="gold-text">Designed for growth.</p>
            </div>
          </div>
        </section>

        <section className="intro" id="about">
          <p className="eyebrow">More than advice. A growth partner.</p>
          <h2>
            Great restaurants deserve
            <span> a foundation built to last.</span>
          </h2>
          <p className="intro-description">
            Every restaurant has a story and a vision. We help turn that
            vision into a clear strategy, stronger operations, and meaningful
            long-term progress.
          </p>
        </section>

        
        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our 11 services · Three domains</p>
              <h2>
                Three paths.
                <span> One goal — your growth.</span>
              </h2>
            </div>
            <p className="section-description">
              Tailored solutions for every stage of your business journey.
            </p>
          </div>

          <div className="domain-grid">
            {domains.map((domain, index) => (
              <article className="domain-card" key={domain.name}>
                <div className="domain-topline">
                  <span className="domain-index">0{index + 1}</span>
                  <span className="domain-words">{domain.words}</span>
                </div>

                <p className="domain-name">{domain.name}</p>
                <h3>{domain.subtitle}</h3>
                <p className="domain-description">{domain.description}</p>

                <div className="domain-services">
                  {domain.services.map((service, serviceIndex) => (
                    <div className="domain-service" key={service.name}>
                      <span className="service-count">
                        {String(
                          domains
                            .slice(0, index)
                            .reduce((total, item) => total + item.services.length, 0)
                          + serviceIndex + 1
                        ).padStart(2, '0')}
                      </span>
                      <div>
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="domain-investment">
                  <div>
                    <span className="investment-label">Starting from</span>
                    <p className="investment-price">{domain.price}</p>
                    <span className="investment-duration">
                      {domain.duration}
                      {domain.recurring ? ` · ${domain.recurring}` : ''}
                    </span>
                  </div>
                  <a
                    className="button button-gold"
                    href={`mailto:hello@brandroots.com?subject=${encodeURIComponent(
                      `${domain.name} consultation`
                    )}`}
                  >
                    Consult now <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="approach" id="approach">
          <div className="approach-mark" aria-hidden="true">BR</div>
          <div>
            <p className="eyebrow">From roots to recognition</p>
            <h2>Build with intention.<br />Grow with clarity.</h2>
          </div>
          <p className="approach-copy">
            Sustainable growth starts with understanding where you are,
            defining where you want to go, and creating a plan to get there.
          </p>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">Your next chapter starts here</p>
          <h2>Ready to grow <span>with purpose?</span></h2>
          <p>
            Let's start a conversation about your restaurant and its potential.
          </p>
          <a
            className="button button-gold"
            href="mailto:hello@brandroots.com?subject=Restaurant%20Consultation"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
          <small>
            Replace this sample email with your official business email before launch.
          </small>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-brand">
          <img src={logo} alt="Brand Roots" />
        </a>
        <p>From roots to recognition.</p>
        <span>© {new Date().getFullYear()} BRAND ROOTS. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
