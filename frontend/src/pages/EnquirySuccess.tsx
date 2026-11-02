// EnquirySuccess.tsx – dedicated success page for enquiry submission
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function EnquirySuccess() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  return (
    <section className="enquiry-success section-padding">
      <div className="success-container">
        <CheckCircle size={80} className="success-icon" />
        <h2>Thank you.</h2>
        <h3>We’ve received your enquiry.</h3>
        <p>
          Your enquiry reference number is <strong>{id}</strong>. Our team will review your
          requirements and get back to you soon.
        </p>
        <div className="cta-buttons">
          <Link to="/" className="button button-dark">
            Back to Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="button button-outline">
              Go to Your Dashboard
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
