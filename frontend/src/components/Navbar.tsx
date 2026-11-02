import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, LogOut } from "lucide-react";

import logo from "../assets/brand-roots-logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Investment Plans", path: "/plans" },
  ];

  function closeMenu() {
    setOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <img src={logo} alt="BRAND-ROOTS" />
        <span>BRAND ROOTS</span>
      </Link>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated ? (
          <button
            type="button"
            className="nav-login"
            onClick={handleLogout}
          >
            Logout
            <LogOut size={16} />
          </button>
        ) : (
          <Link
            to="/login"
            className="nav-login"
            onClick={closeMenu}
          >
            Login
          </Link>
        )}

        <Link
          to="/contact"
          className="nav-cta"
          onClick={closeMenu}
        >
          Let's Talk Growth
          <ArrowUpRight size={16} />
        </Link>
      </nav>

      <button
        type="button"
        className="mobile-menu"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}