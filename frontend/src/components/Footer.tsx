
import { Link } from "react-router-dom";
import logo from "../assets/brand-roots-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="BRAND-ROOTS" />

          <h2>From Roots to Recognition.</h2>

          <p>
            Strategic thinking. Stronger brands.
            Sustainable business growth.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/plans">Investment Plans</Link>
        </div>

        <div className="footer-links">
          <h4>Get in Touch</h4>
          <Link to="/contact">Enquire Now</Link>
          <Link to="/login">Client Login</Link>
          <Link to="/register">Create Account</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BRAND-ROOTS</span>
        <span>Strategy | Brand | Growth</span>
      </div>
    </footer>
  );
}
