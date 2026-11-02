
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const plans = [
  {
    name: "ROOTFIND",
    subtitle: "Understand Your Business",
    price: "₹4,999",
    duration: "2–4 Weeks",
    description:
      "For businesses that need clarity before making their next growth move.",
    services: [
      "SME Growth Diagnosis",
      "Business Position Gap",
      "Customer Research Gap",
      "Customer Intelligence",
    ],
  },
  {
    name: "ROOTBUILD",
    subtitle: "Build Your Foundation",
    price: "₹14,999",
    duration: "4–8 Weeks",
    description:
      "For businesses ready to strengthen their brand and business foundation.",
    services: [
      "Traditional Business → Modern Business",
      "Founder → Brand",
      "Brand Experience Design",
      "Revenue Leak / Conversion Counselling",
    ],
    featured: true,
  },
  {
    name: "ROOTGROW",
    subtitle: "Scale Your Business",
    price: "₹24,999",
    duration: "Per Month",
    description:
      "For businesses looking for an ongoing strategic growth partner.",
    services: [
      "Customer Lifetime Value",
      "Marketing OS",
      "Fractional Growth Department",
    ],
  },
];

export default function Plans() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handlePlanSelection(planName: string) {
    const target = `/contact?plan=${encodeURIComponent(planName)}`;

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          next: target,
        },
      });

      return;
    }

    navigate(target);
  }

  return (
    <>
      <section className="inner-hero">
        <span className="eyebrow">
          INVESTMENT & PARTNERSHIPS
        </span>

        <h1>
          Invest in your
          <br />
          <em>next stage of growth.</em>
        </h1>

        <p>
          Explore our growth plans and discover the right
          starting point for your business.
        </p>
      </section>

      <section className="all-plans section-padding">
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`plan-card ${
                plan.featured ? "featured" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              {plan.featured && (
                <span className="plan-badge">
                  RECOMMENDED
                </span>
              )}

              <span className="plan-name">
                {plan.name}
              </span>

              <h3 className="plan-subtitle">
                {plan.subtitle}
              </h3>

              <div className="plan-price">
                <h3>{plan.price}</h3>
                <span>{plan.duration}</span>
              </div>

              <p>{plan.description}</p>

              <div className="plan-includes">
                <span>WHAT'S INCLUDED</span>

                {plan.services.map((service) => (
                  <div
                    className="plan-feature"
                    key={service}
                  >
                    <Check size={16} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePlanSelection(plan.name)
                }
                className={`button ${
                  plan.featured
                    ? "button-gold"
                    : "button-outline-dark"
                }`}
              >
                Choose This Plan
                <ArrowUpRight size={18} />
              </button>
            </motion.article>
          ))}
        </div>

        <p className="plans-note">
          These plans are indicative offerings. Final
          scope, deliverables, timelines, and commercial
          terms will be discussed personally with BRAND-ROOTS.
        </p>
      </section>

      <section className="about-cta">
        <span className="eyebrow">
          LET'S FIND YOUR FIT
        </span>

        <h2>
          Your business
          <br />
          <em>deserves a strategy.</em>
        </h2>

        <Link
          to="/contact"
          className="button button-gold"
        >
          Discuss Your Requirements
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
