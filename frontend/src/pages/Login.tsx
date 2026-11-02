
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

import {
  useAuth,
  type UserRole,
} from "../context/AuthContext";

type LoginResponse = {
  access_token: string;
  token_type: string;
  role: UserRole;
  name: string;
};

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response =
        await apiRequest<LoginResponse>(
          "/api/v1/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: form.email.trim().toLowerCase(),
              password: form.password,
            }),
          }
        );

      if (!response.access_token) {
        throw new Error(
          "Login response did not contain an access token."
        );
      }

      if (
        response.role !== "admin" &&
        response.role !== "client"
      ) {
        throw new Error(
          "Invalid user role received."
        );
      }

      if (!response.name?.trim()) {
        throw new Error(
          "Login response did not contain a user name."
        );
      }

      // Save authentication details and user name.
      login(
        response.access_token,
        response.role,
        response.name
      );

      // Redirect according to the user's role.
      if (response.role === "admin") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        navigate("/client-dashboard", {
          replace: true,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      {/* Left Visual Section */}
      <div className="auth-visual">
        <Link
          to="/"
          className="auth-back"
        >
          <ArrowLeft size={16} />
          Back to Website
        </Link>

        <div className="auth-visual-content">
          <img
            src={logo}
            alt="BRAND-ROOTS"
          />

          <span className="eyebrow">
            FROM ROOTS TO RECOGNITION
          </span>

          <h1>
            Your growth
            <br />
            journey,
            <br />
            <em>
              continues here.
            </em>
          </h1>

          <p>
            A stronger business begins with
            the right partnership.
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          <span className="eyebrow">
            CLIENT / ADMIN PORTAL
          </span>

          <h2>
            Welcome
            <br />
            <em>
              back.
            </em>
          </h2>

          <p>
            Login to your BRAND-ROOTS account.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">
                Registered Email Address
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

            {/* Password */}
            <div className="form-field">
              <label htmlFor="password">
                Password
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
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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

            {/* Error Message */}
            {error && (
              <p
                className="auth-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="button button-dark auth-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login to Your Account"}

              {!loading && (
                <ArrowUpRight size={18} />
              )}
            </button>
          </form>

          {/* Registration */}
          <div className="auth-register">
            If not registered then{" "}

            <Link to="/register">
              register here
            </Link>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <Link to="/">
              BRAND-ROOTS
            </Link>

            <span>
              Secure Portal Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
