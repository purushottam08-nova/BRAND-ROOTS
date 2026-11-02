
import { motion } from "framer-motion";
import { ArrowUpRight, Sprout, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Sprout,
    title: "Rooted in Understanding",
    description:
      "We believe sustainable growth starts with understanding the business, its customers, and its challenges.",
  },
  {
    icon: Target,
    title: "Built on Strategy",
    description:
      "Every recommendation has a purpose. We connect business goals with practical strategies and execution.",
  },
  {
    icon: TrendingUp,
    title: "Focused on Growth",
    description:
      "Our focus is on building stronger businesses, meaningful customer relationships, and long-term growth.",
  },
];

export default function About() {
  return (
    <>
      <section className="inner-hero">
        <span className="eyebrow">WHO WE ARE</span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We help businesses
          <br />
          <em>find their roots.</em>
        </motion.h1>

        <p>
          BRAND-ROOTS is a business consulting and growth
          agency helping restaurants, cafés, bars, and
          ambitious businesses build stronger brands
          and grow sustainably.
        </p>
      </section>

      <section className="about-story section-padding">
        <div>
          <span className="eyebrow">OUR STORY</span>

          <h2>
            Growth is not
            <br />
            <em>just marketing.</em>
          </h2>
        </div>

        <div className="about-story-content">
          <p>
            A business can have a great product and still
            struggle to grow. Sometimes the problem is
            positioning. Sometimes it is customer
            understanding. Sometimes it is the way
            the business attracts and retains customers.
          </p>

          <p>
            BRAND-ROOTS approaches growth from the ground
            up. We understand the business, identify
            opportunities, build a stronger foundation,
            and create systems that support continuous
            growth.
          </p>

          <p>
            From independent cafés to growing restaurant
            groups, our goal is to help businesses move
            from potential to recognition.
          </p>

          <Link to="/services" className="text-link">
            Explore Our Approach
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="about-values section-padding">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE BELIEVE</span>

          <h2>
            The roots of
            <br />
            <em>our approach.</em>
          </h2>
        </div>

        <div className="values-grid">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                className="value-card"
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <Icon size={30} />

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="about-cta">
        <span className="eyebrow">YOUR BUSINESS. YOUR NEXT CHAPTER.</span>

        <h2>
          Let's build
          <br />
          <em>something meaningful.</em>
        </h2>

        <Link to="/contact" className="button button-gold">
          Start a Conversation
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
