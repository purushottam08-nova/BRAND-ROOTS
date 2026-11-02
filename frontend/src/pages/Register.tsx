
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/brand-roots-logo.png";
import { apiRequest } from "../services/api";

type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
};

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (fullName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (phone.length < 7 || phone.length > 20) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    setLoading(true);

    try {
      await apiRequest<RegisterResponse>(
        "/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: fullName,
            email,
            phone,
            password: form.password,
          }),
        }
      );

      navigate("/login", {
        replace: true,
        state: {
          registered: true,
          email,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-visual">
        <Link to="/" className="auth-back">
          <ArrowLeft size={16} />
          Back to Website
        </Link>

        <div className="auth-visual-content">
          <img src={logo} alt="BRAND-ROOTS" />

          <span className="eyebrow">
            FROM ROOTS TO RECOGNITION
          </span>

          <h1>
            Every great
            <br />
            business begins
            <br />
            <em>with a root.</em>
          </h1>

          <p>
            Let's understand your business,
            uncover its potential, and build
            a stronger future together.
          </p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <span className="eyebrow">
            CLIENT PORTAL
          </span>

          <h2>
            Create your
            <br />
            <em>account.</em>
          </h2>

          <p>
            Start your growth journey with BRAND-ROOTS.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value,
                  })
                }
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="businessName">
                Business Name
              </label>

              <input
                id="businessName"
                name="businessName"
                type="text"
                autoComplete="organization"
                placeholder="Your business name"
                value={form.businessName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessName: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                minLength={7}
                maxLength={20}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">
                Create Password
              </label>

              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  minLength={8}
                  maxLength={128}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="auth-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button button-dark auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Your Account"}

              {!loading && (
                <ArrowUpRight size={18} />
              )}
            </button>
          </form>

          <div className="auth-register">
            Already have an account?{" "}
            <Link to="/login">
              Login here
            </Link>
          </div>

          <div className="auth-footer">
            <Link to="/">
              BRAND-ROOTS
            </Link>

            <span>Client Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
