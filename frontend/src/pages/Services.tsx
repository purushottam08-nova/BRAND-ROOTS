
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const domains = [
  {
    number: "01",
    name: "ROOTFIND",
    tagline: "Understand · Analyse · Uncover",
    description: "Discover the real problem.",
    intro:
      "Before building a strategy, we uncover what's actually happening inside your business.",
    services: [
      {
        name: "SME Growth Diagnosis",
        description:
          "A structured diagnosis of your business to uncover growth opportunities, challenges, and priorities.",
      },
      {
        name: "Business Position Gap",
        description:
          "Understand the gap between your current market position and the position your business wants to own.",
      },
      {
        name: "Customer Research Gap",
        description:
          "Discover what your customers need, expect, value, and experience.",
      },
      {
        name: "Customer Intelligence",
        description:
          "Turn customer understanding into meaningful business and marketing decisions.",
      },
    ],
  },
  {
    number: "02",
    name: "ROOTBUILD",
    tagline: "Strategic · Create · Transform",
    description: "Build a stronger business & brand.",
    intro:
      "We transform business insights into a stronger foundation, sharper positioning, and better customer experiences.",
    services: [
      {
        name: "Traditional Business → Modern Business",
        description:
          "Modernise your business approach, customer experience, and growth practices.",
      },
      {
        name: "Founder → Brand",
        description:
          "Build a recognisable brand around your business vision, values, and unique strengths.",
      },
      {
        name: "Brand Experience Design",
        description:
          "Create consistent and memorable experiences across customer touchpoints.",
      },
      {
        name: "Revenue Leak / Conversion Counselling",
        description:
          "Identify conversion barriers and revenue leaks across your customer journey.",
      },
    ],
  },
  {
    number: "03",
    name: "ROOTGROW",
    tagline: "Optimise · Automate · Scale",
    description: "Create a system for continuous growth.",
    intro:
      "We help businesses optimise their marketing, customer relationships, and growth systems.",
    services: [
      {
        name: "Customer Lifetime Value",
        description:
          "Improve customer retention, repeat purchases, and long-term customer value.",
      },
      {
        name: "Marketing OS",
        description:
          "Create a structured marketing operating system that brings consistency to growth.",
      },
      {
        name: "Fractional Growth Department",
        description:
          "Access strategic growth expertise without building an entire in-house department.",
      },
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="inner-hero">
        <span className="eyebrow">OUR EXPERTISE</span>

        <h1>
          Growth solutions
          <br />
          <em>from the roots up.</em>
        </h1>

        <p>
          11 strategic services designed to help businesses
          understand their challenges, build stronger
          foundations, and grow sustainably.
        </p>
      </section>

      <section className="all-services section-padding">
        {domains.map((domain, domainIndex) => (
          <section
            className={`service-domain service-domain-${domainIndex + 1}`}
            key={domain.name}
          >
            <div className="service-domain-header">
              <div>
                <span className="eyebrow">
                  DOMAIN {domain.number}
                </span>

                <h2>{domain.name}</h2>

                <span className="domain-tagline">
                  {domain.tagline}
                </span>
              </div>

              <div className="service-domain-intro">
                <h3>{domain.description}</h3>
                <p>{domain.intro}</p>
              </div>
            </div>

            <div className="all-services-grid">
              {domain.services.map((service, index) => (
                <motion.article
                  className="all-service-card"
                  key={service.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <span className="service-card-number">
                    {domain.number}.{String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{service.name}</h3>

                  <p>{service.description}</p>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="service-enquire"
                  >
                    Enquire About This Service
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="about-cta">
        <span className="eyebrow">NOT SURE WHERE TO START?</span>

        <h2>
          Let's find the
          <br />
          <em>right solution.</em>
        </h2>

        <p>
          Tell us about your business. We'll help you
          understand which growth approach fits your needs.
        </p>

        <Link to="/contact" className="button button-gold">
          Discuss Your Business
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
