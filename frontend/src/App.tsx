
import { useState } from "react";
import "./App.css";

const services = [
  {
    id: "01",
    name: "ROOTFIND",
    category: "UNDERSTAND · ANALYSE · UNCOVER",
    title: "Discover the real problem.",
    description:
      "Understand your business, uncover growth barriers, and find the opportunities that matter.",
    items: [
      "SME Growth Diagnosis",
      "Business Position Gap",
      "Customer Research Gap",
      "Customer Intelligence",
    ],
    tone: "green",
  },
  {
    id: "02",
    name: "ROOTBUILD",
    category: "STRATEGIC · CREATE · TRANSFORM",
    title: "Build a stronger business & brand.",
    description:
      "Turn business insights into a meaningful brand, better experiences, and a stronger foundation.",
    items: [
      "Traditional Business → Modern Business",
      "Founder → Brand",
      "Brand Experience Design",
      "Revenue Leak / Conversion Counselling",
    ],
    tone: "gold",
  },
  {
    id: "03",
    name: "ROOTGROW",
    category: "OPTIMISE · AUTOMATE · SCALE",
    title: "Create a system for continuous growth.",
    description:
      "Optimise your business, build repeatable systems, and scale with clarity.",
    items: [
      "Customer Lifetime Value",
      "Marketing OS",
      "Fractional Growth Department",
    ],
    tone: "grey",
  },
];

const approach = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by listening, asking the right questions, and understanding your business from its roots.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We turn insight into strategy, create a clear direction, and strengthen your business foundation.",
  },
  {
    number: "03",
    title: "Grow",
    description:
      "We help you establish systems and practices that support sustainable, meaningful growth.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" id="home">
      <div className="chassis">
        <div className="chassis-topline">
          <span className="machine-label">BR / 001</span>
          <span className="machine-label">BUSINESS GROWTH INSTRUMENT</span>
          <span className="machine-indicator">
            <span className="indicator-light" />
            BRAND-ROOTS
          </span>
        </div>

        <header className="navbar">
          <a className="brand" href="#home" aria-label="BRAND-ROOTS home">
            <span className="brand-mark" aria-hidden="true">
              B<span>R</span>
            </span>

            <span className="brand-copy">
              <strong>BRAND-ROOTS</strong>
              <small>FROM ROOTS TO RECOGNITION.</small>
            </span>
          </a>

          <button
            className="menu-toggle raised-key"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>

          <nav
            className={`nav-links ${menuOpen ? "open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#approach" onClick={closeMenu}>
              Approach
            </a>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <a className="nav-action raised-key" href="#contact">
            <span>LET&apos;S TALK</span>
            <span className="key-arrow">↗</span>
          </a>
        </header>

        <section className="hero">
          <div className="hero-content">
            <div className="section-label">
              <span className="label-number">01</span>
              <span>BUSINESS CONSULTING · GROWTH MANAGEMENT</span>
            </div>

            <h1>
              Every great
              <br />
              business has
              <br />
              <span>strong roots.</span>
            </h1>

            <p className="hero-description">
              We help businesses uncover what&apos;s holding them back, build
              stronger brands, and create systems for sustainable growth.
            </p>

            <div className="hero-actions">
              <a className="primary-key" href="#services">
                <span>EXPLORE OUR SERVICES</span>
                <span className="key-arrow">↗</span>
              </a>

              <a className="secondary-key" href="#approach">
                OUR APPROACH
              </a>
            </div>

            <div className="hero-footnote">
              <span className="gold-indicator" />
              <span>
                CLARITY IN STRATEGY.
                <br />
                PURPOSE IN GROWTH.
              </span>
            </div>
          </div>

          <div className="hero-instrument" aria-label="Brand Roots identity">
            <div className="instrument-heading">
              <span>BR / IDENTITY</span>
              <span>EST. IN PURPOSE</span>
            </div>

            <div className="logo-well">
              <div className="logo-emblem">
                <span className="emblem-b">B</span>
                <span className="emblem-r">R</span>
                <span className="emblem-tree">♧</span>
                <span className="emblem-roots">╱╲</span>
              </div>

              <div className="emblem-name">BRAND ROOTS</div>
              <div className="emblem-divider">
                <span />
                <span className="divider-leaf">✦</span>
                <span />
              </div>
              <div className="emblem-tagline">
                FROM ROOTS TO RECOGNITION.
              </div>
            </div>

            <div className="instrument-footer">
              <span>STRATEGY</span>
              <span className="footer-dot" />
              <span>IDENTITY</span>
              <span className="footer-dot" />
              <span>GROWTH</span>
            </div>
          </div>
        </section>

        <section className="facts-panel" aria-label="Our philosophy">
          <div className="fact-cell">
            <span className="fact-label">OUR BELIEF</span>
            <strong>Growth begins at the roots.</strong>
          </div>

          <div className="fact-cell">
            <span className="fact-label">OUR METHOD</span>
            <strong>Understand. Build. Grow.</strong>
          </div>

          <div className="fact-cell">
            <span className="fact-label">OUR PURPOSE</span>
            <strong>From roots to recognition.</strong>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-heading">
            <div className="section-label">
              <span className="label-number">02</span>
              <span>OUR PHILOSOPHY</span>
            </div>

            <h2>
              Growth isn&apos;t
              <br />
              a shortcut.
              <br />
              <span>It&apos;s a foundation.</span>
            </h2>
          </div>

          <div className="editorial-well">
            <div className="editorial-topline">
              <span>BR / PRINCIPLE</span>
              <span>NO. 001</span>
            </div>

            <div className="editorial-mark">“</div>

            <p>
              Every business has a story, a purpose, and untapped potential.
              We bring clarity to the challenges, strategy to the decisions,
              and structure to the growth.
            </p>

            <div className="editorial-signature">
              <span className="signature-line" />
              <span>THE BRAND-ROOTS APPROACH</span>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-top">
            <div>
              <div className="section-label">
                <span className="label-number">03</span>
                <span>OUR SERVICES</span>
              </div>

              <h2>
                Three roots.
                <br />
                <span>One stronger business.</span>
              </h2>
            </div>

            <p className="section-description">
              From understanding your business to building its future and
              growing it sustainably.
            </p>
          </div>

          <div className="services-deck">
            <div className="deck-topline">
              <span>SERVICE MODULES</span>
              <span>BR / 03</span>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article
                  className={`service-card ${service.tone}`}
                  key={service.id}
                >
                  <div className="service-topline">
                    <span className="service-number">{service.id}</span>
                    <span className="service-lamp" aria-hidden="true" />
                  </div>

                  <span className="service-category">{service.category}</span>

                  <h3>{service.name}</h3>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>

                  <div className="service-divider" />

                  <span className="list-label">SERVICE SCOPE</span>

                  <ul className="service-list">
                    {service.items.map((item) => (
                      <li key={item}>
                        <span className="list-marker">↗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className="service-key"
                    href="#contact"
                    aria-label={`Enquire about ${service.name}`}
                  >
                    <span>EXPLORE {service.name}</span>
                    <span className="key-arrow">↗</span>
                  </a>
                </article>
              ))}
            </div>

            <div className="deck-bottomline">
              <span>STRATEGY / DESIGN / GROWTH</span>
              <span className="deck-screw" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="section-label">
            <span className="label-number">04</span>
            <span>HOW WE WORK</span>
          </div>

          <div className="approach-heading">
            <h2>
              A thoughtful process.
              <br />
              <span>Built around your business.</span>
            </h2>

            <p>
              We believe meaningful growth comes from understanding the
              foundations before changing the structure.
            </p>
          </div>

          <div className="process-deck">
            {approach.map((step, index) => (
              <article className="process-step" key={step.number}>
                <div className="process-number">{step.number}</div>

                <div className="process-connector" aria-hidden="true">
                  <span />
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {index < approach.length - 1 && (
                  <span className="process-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="closing-bay" id="contact">
          <div className="closing-copy">
            <div className="section-label">
              <span className="label-number">05</span>
              <span>START A CONVERSATION</span>
            </div>

            <h2>
              Let&apos;s build
              <br />
              something that
              <br />
              <span>grows with purpose.</span>
            </h2>

            <p>
              Tell us a little about your business and what you&apos;re
              looking to achieve.
            </p>
          </div>

          <div className="contact-instrument">
            <div className="contact-screen">
              <span className="screen-label">BR / CONTACT</span>

              <div className="contact-symbol">✦</div>

              <h3>Ready to grow?</h3>

              <p>
                Let&apos;s understand your business and explore how we can
                help.
              </p>

              <a
                className="primary-key contact-key"
                href="mailto:hello@brand-roots.in"
              >
                <span>GET IN TOUCH</span>
                <span className="key-arrow">↗</span>
              </a>
            </div>

            <div className="contact-hardware">
              <span className="hardware-slot" />
              <span className="hardware-slot" />
              <span className="hardware-slot" />
            </div>
          </div>
        </section>

        <footer className="footer">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true">
              B<span>R</span>
            </span>

            <span className="brand-copy">
              <strong>BRAND-ROOTS</strong>
              <small>FROM ROOTS TO RECOGNITION.</small>
            </span>
          </a>

          <p>Building stronger businesses, from the ground up.</p>

          <span className="footer-copy">
            © {new Date().getFullYear()} BRAND-ROOTS
          </span>
        </footer>

        <div className="chassis-bottomline">
          <span>BRAND-ROOTS / GROWTH MANAGEMENT</span>
          <span>DESIGNED WITH PURPOSE</span>
        </div>
      </div>
    </main>
  );
}

export default App;
