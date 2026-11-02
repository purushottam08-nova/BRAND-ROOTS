
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const domains = [
  {
    number: "01",
    name: "ROOTFIND",
    subtitle: "Understand · Analyse · Uncover",
    description: "Discover the real problem.",
    text: "We go beyond assumptions to find what's truly holding your business back.",
    services: [
      "SME Growth Diagnosis",
      "Business Position Gap",
      "Customer Research Gap",
      "Customer Intelligence",
    ],
  },
  {
    number: "02",
    name: "ROOTBUILD",
    subtitle: "Strategic · Create · Transform",
    description: "Build a stronger business & brand.",
    text: "We build the foundations that make your business stronger, smarter and more relevant.",
    services: [
      "Traditional Business → Modern Business",
      "Founder → Brand",
      "Brand Experience Design",
      "Revenue Leak / Conversion Counselling",
    ],
  },
  {
    number: "03",
    name: "ROOTGROW",
    subtitle: "Optimise · Automate · Scale",
    description: "Create a system for continuous growth.",
    text: "We turn your foundation into a repeatable growth engine.",
    services: [
      "Customer Lifetime Value",
      "Marketing OS",
      "Fractional Growth Department",
    ],
  },
];

const plans = [
  {
    name: "ROOTFIND",
    price: "₹4,999",
    period: "Starting from",
    duration: "2–4 Weeks",
    description: "Understand your business before making your next move.",
    count: "04 Services",
  },
  {
    name: "ROOTBUILD",
    price: "₹14,999",
    period: "Starting from",
    duration: "4–8 Weeks",
    description: "Build a stronger brand and a better business foundation.",
    count: "04 Services",
    featured: true,
  },
  {
    name: "ROOTGROW",
    price: "₹24,999",
    period: "Per Month",
    duration: "Growth Partnership",
    description: "Create a system for continuous and sustainable growth.",
    count: "03 Services",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Home() {
  return (
    <>
      {/* HERO */}

      <section className="hero">
        <div className="hero-grain" />

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
        >
          <motion.span variants={reveal} className="eyebrow">
            STRATEGY · BRAND · GROWTH
          </motion.span>

          <motion.h1 variants={reveal}>
            Build a Stronger
            <br />
            <span>Brand.</span>
            <br />
            Grow a Bigger
            <br />
            <span>Tomorrow.</span>
          </motion.h1>

          <motion.p variants={reveal}>
            BRAND-ROOTS is a strategic growth partner
            for businesses that want more than just
            marketing — they want real, measurable growth.
          </motion.p>

          <motion.div variants={reveal} className="hero-actions">
            <Link to="/services" className="button button-gold">
              Explore Our Services
              <ArrowUpRight size={18} />
            </Link>

            <Link to="/contact" className="button button-outline">
              Let's Talk Growth
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-bottom">
          <span>FROM ROOTS TO RECOGNITION.</span>

          <a href="#domains">
            SCROLL TO EXPLORE
            <ArrowDown size={16} />
          </a>
        </div>

        <div className="hero-decoration">
          <span>BR</span>
          <div className="decoration-line" />
        </div>
      </section>

      {/* INTRO */}

      <section className="intro section-padding">
        <motion.div
          className="intro-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <span className="eyebrow">OUR PHILOSOPHY</span>

          <h2>
            Growth begins
            <br />
            <em>at the roots.</em>
          </h2>
        </motion.div>

        <motion.div
          className="intro-description"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <p>
            Every business has potential.
            But potential alone doesn't create growth.
          </p>

          <p>
            We help businesses understand their challenges,
            build stronger brands, and create systems
            that turn ambition into sustainable growth.
          </p>

          <Link to="/about" className="text-link">
            Discover BRAND-ROOTS
            <MoveRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* DOMAINS */}

      <section className="domains section-padding" id="domains">
        <div className="section-heading">
          <span className="eyebrow">OUR THREE DOMAINS</span>

          <h2>
            Three paths.
            <br />
            <em>One goal — your growth.</em>
          </h2>
        </div>

        <div className="domain-grid">
          {domains.map((domain, index) => (
            <motion.article
              key={domain.name}
              className={`domain-card domain-${index + 1}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ delay: index * 0.12 }}
            >
              <div className="domain-number">
                {domain.number}
              </div>

              <div className="domain-card-content">
                <span className="domain-subtitle">
                  {domain.subtitle}
                </span>

                <h3>{domain.name}</h3>

                <h4>{domain.description}</h4>

                <p>{domain.text}</p>

                <ul>
                  {domain.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>

                <Link to="/services" className="domain-link">
                  Explore Domain
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section className="services-preview section-padding">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE DO</span>

          <h2>
            Solutions built
            <br />
            <em>around your business.</em>
          </h2>

          <p>
            11 strategic services. Three growth domains.
            One partner for your business.
          </p>
        </div>

        <div className="service-list">
          {domains.map((domain) => (
            <div className="service-group" key={domain.name}>
              <div className="service-group-title">
                <span>{domain.number}</span>
                <h3>{domain.name}</h3>
              </div>

              <div className="service-group-items">
                {domain.services.map((service, index) => (
                  <Link
                    to="/services"
                    className="service-item"
                    key={service}
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h4>{service}</h4>

                    <ArrowUpRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="center-action">
          <Link to="/services" className="button button-dark">
            Explore All Services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* PROCESS */}

      <section className="process section-padding">
        <div className="section-heading">
          <span className="eyebrow">OUR APPROACH</span>

          <h2>
            From insight
            <br />
            <em>to impact.</em>
          </h2>
        </div>

        <div className="process-grid">
          {[
            ["01", "Discover", "Understand your business and its challenges."],
            ["02", "Diagnose", "Identify the gaps and opportunities."],
            ["03", "Strategise", "Create a tailored growth roadmap."],
            ["04", "Build", "Develop stronger brands and systems."],
            ["05", "Grow", "Optimise and scale sustainably."],
          ].map(([number, title, description]) => (
            <motion.div
              className="process-card"
              key={number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INVESTMENT */}

      <section className="plans-preview section-padding">
        <div className="section-heading">
          <span className="eyebrow">INVESTMENT PLANS</span>

          <h2>
            Flexible plans.
            <br />
            <em>Meaningful growth.</em>
          </h2>

          <p>
            Explore our growth solutions and find
            the right starting point for your business.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              className={`plan-card ${
                plan.featured ? "featured" : ""
              }`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {plan.featured && (
                <span className="plan-badge">
                  POPULAR
                </span>
              )}

              <span className="plan-name">
                {plan.name}
              </span>

              <div className="plan-price">
                <h3>{plan.price}</h3>
                <span>{plan.period}</span>
              </div>

              <span className="plan-duration">
                {plan.duration}
              </span>

              <p>{plan.description}</p>

              <span className="plan-count">
                {plan.count}
              </span>

              <Link
                to={`/contact?plan=${plan.name}`}
                className="button button-outline-dark"
              >
                Enquire About This Plan
                <ArrowUpRight size={18} />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="center-action">
          <Link to="/plans" className="text-link">
            View All Investment Plans
            <MoveRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}

      <section className="final-cta">
        <div className="cta-content">
          <span className="eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h2>
            Let's grow
            <br />
            <em>together.</em>
          </h2>

          <p>
            Every great business starts with
            the right conversation.
          </p>

          <Link to="/contact" className="button button-gold">
            Tell Us About Your Business
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
