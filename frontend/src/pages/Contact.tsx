import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  LoaderCircle,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

type EnquiryResponse = {
  id: number;
  service_name: string;
  plan_name: string;
  business_name: string;
  message: string;
  status: string;
  created_at: string;
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, isAuthenticated } = useAuth();

  const selectedPlan = searchParams.get("plan") || "";
  const selectedService = searchParams.get("service") || "";

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "",
    interest: selectedPlan || selectedService,
    message: "",
  });

  const [submitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Front‑end validation of required fields
    if (!form.fullName.trim() || !form.businessName.trim() || !form.email.trim() || !form.phone.trim() || !form.businessType.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    const phonePattern = /^[+]?\d{7,15}$/;
    if (!phonePattern.test(form.phone.trim())) {
      setError("Please enter a valid phone number (digits only, optional leading +).");
      return;
    }

    if (!isAuthenticated || !token) {
      navigate("/login", {
        state: { from: `${location.pathname}${location.search}` },
      });
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest<EnquiryResponse>(
        "/api/v1/enquiries/",
        {
          method: "POST",
          body: JSON.stringify({
            service_name: selectedService || (form.interest && ["ROOTFIND", "ROOTBUILD", "ROOTGROW"].includes(form.interest) ? form.interest : "General Consultation"),
            plan_name: selectedPlan || "General Consultation",
            business_name: form.businessName.trim(),
            message: [
              `Contact name: ${form.fullName.trim()}`,
              `Email: ${form.email.trim()}`,
              `Phone: ${form.phone.trim()}`,
              `Business type: ${form.businessType}`,
              `Interested in: ${form.interest || "General Consultation"}`,
              "",
              form.message.trim(),
            ].join("\n"),
          }),
        },
        token
      );

      // Navigate to success page with enquiry ID returned from backend
      navigate(`/enquiry-success/${response.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="inner-hero">
        <span className="eyebrow">LET'S START A CONVERSATION</span>

        <h1>
          Tell us about
          <br />
          <em>your business.</em>
        </h1>

        <p>
          Every business has a story. Tell us yours, and let's explore how
          BRAND-ROOTS can help you grow.
        </p>
      </section>

      <section className="contact-section section-padding">
        <div className="contact-info">
          <span className="eyebrow">GET IN TOUCH</span>

          <h2>
            Let's talk
            <br />
            <em>growth.</em>
          </h2>

          <p>
            Share your business requirements with us. Our team will connect
            with you personally to understand your needs.
          </p>

          <div className="contact-detail">
            <Mail size={20} />
            <span>Connect with BRAND-ROOTS</span>
          </div>

          <div className="contact-detail">
            <Phone size={20} />
            <span>Personal consultation after enquiry</span>
          </div>

          <div className="contact-detail">
            <MapPin size={20} />
            <span>Working with businesses across locations</span>
          </div>

          <div className="contact-login-note">
            {isAuthenticated ? (
              <span>You are logged in to your account.</span>
            ) : (
              <>
                Already registered?{" "}
                <Link
                  to="/login"
                  state={{
                    from: `${location.pathname}${location.search}`,
                  }}
                >
                  Login to your account
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div className="form-success">
              <span className="eyebrow">ENQUIRY SUBMITTED</span>

              <h2>
                Thank you.
                <br />
                <em>We'll be in touch.</em>
              </h2>

              <p>
                Your enquiry has been received by BRAND-ROOTS. Our team will
                review your requirements and connect with you personally.
              </p>

              <Link to="/" className="button button-dark">
                Back to Home
                <ArrowUpRight size={18} />
              </Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Business Enquiry</h3>

              <p>Fields marked with * are required.</p>

              {error && (
                <div className="form-error" role="alert">
                  {error}
                </div>
              )}

              {!isAuthenticated && (
                <div className="contact-login-note">
                  Please{" "}
                  <Link
                    to="/login"
                    state={{
                      from: `${location.pathname}${location.search}`,
                    }}
                  >
                    login
                  </Link>{" "}
                  before submitting your enquiry.
                </div>
              )}

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="businessName">Business Name *</label>
                  <input
                    id="businessName"
                    name="businessName"
                    value={form.businessName}
                    onChange={updateField}
                    placeholder="Your business name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="form-field form-full">
                  <label htmlFor="businessType">Business Type *</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={form.businessType}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select your business type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Cloud Kitchen">Cloud Kitchen</option>
                    <option value="Food Truck">Food Truck</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-field form-full">
                  <label htmlFor="interest">
                    Interested In *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={updateField}
                    required
                  >
                    <option value="">
                      Select a service or consultation
                    </option>
                    <option value="ROOTFIND">ROOTFIND</option>
                    <option value="ROOTBUILD">ROOTBUILD</option>
                    <option value="ROOTGROW">ROOTGROW</option>
                    <option value="General Consultation">
                      General Consultation
                    </option>
                  </select>
                </div>

                <div className="form-field form-full">
                  <label htmlFor="message">
                    What are your growth goals? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder="Tell us about your business, challenges, and goals..."
                    rows={5}
                    minLength={10}
                    maxLength={3000}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="button button-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>

              <p className="contact-disclaimer">
                Submitting an enquiry does not confirm a purchase or service
                engagement.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}