
import './index.css';
import logo from './assets/brand-roots-logo.jpeg';

const services = [
  {
    number: '01',
    title: 'Brand Strategy',
    description:
      'Build a distinctive restaurant brand, clarify your positioning, and create an identity guests remember.',
    detail: 'Build your identity',
  },
  {
    number: '02',
    title: 'Restaurant Growth',
    description:
      'Discover growth opportunities, attract the right customers, and build a stronger path to revenue.',
    detail: 'Unlock your potential',
  },
  {
    number: '03',
    title: 'Operations & Experience',
    description:
      'Improve everyday operations and create thoughtful dining experiences that bring guests back.',
    detail: 'Improve your systems',
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
              <p className="eyebrow">What we do</p>
              <h2>Strong roots. <span>Lasting impact.</span></h2>
            </div>
            <p className="section-description">
              Practical expertise for the challenges that matter most to
              your restaurant business.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div className="service-mark" aria-hidden="true">✳</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="service-link" href="#contact">
                  {service.detail} <span aria-hidden="true">→</span>
                </a>
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
