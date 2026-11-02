
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

type ClientEnquiry = {
  id: number;
  service_name: string;
  plan_name: string;
  business_name: string;
  message: string;
  status: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Awaiting Review",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
  rejected: "Closed",
};

function getStatusLabel(status: string) {
  return (
    STATUS_LABELS[status] ??
    status.replace(/_/g, " ")
  );
}

function getStatusClass(status: string) {
  switch (status) {
    case "completed":
      return "br-status-completed";

    case "in_progress":
      return "br-status-progress";

    case "contacted":
      return "br-status-contacted";

    case "rejected":
      return "br-status-closed";

    default:
      return "br-status-pending";
  }
}

function formatDate(date: string) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ClientDashboard() {
  const { token, role, isAuthenticated } = useAuth();

  const [enquiries, setEnquiries] =
    useState<ClientEnquiry[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchEnquiries = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest<ClientEnquiry[]>(
        "/api/v1/enquiries/my",
        {},
        token
      );

      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your enquiries."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void fetchEnquiries();
  }, [fetchEnquiries]);

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return enquiries;

    return enquiries.filter((enquiry) => {
      return [
        enquiry.plan_name,
        enquiry.service_name,
        enquiry.business_name,
        enquiry.message,
        enquiry.status,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(query)
        );
    });
  }, [enquiries, search]);

  const pendingCount = enquiries.filter(
    (enquiry) =>
      enquiry.status === "pending" ||
      enquiry.status === "contacted"
  ).length;

  const activeCount = enquiries.filter(
    (enquiry) => enquiry.status === "in_progress"
  ).length;

  const completedCount = enquiries.filter(
    (enquiry) => enquiry.status === "completed"
  ).length;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <section className="br-client-dashboard">

      {/* Dashboard Hero */}
      <div className="br-dashboard-hero">
        <div className="br-dashboard-hero-inner">

          <div className="br-dashboard-welcome">
            <div className="br-dashboard-eyebrow">
              <Sparkles size={14} />

              YOUR BRAND-ROOTS SPACE
            </div>

            <h1>
              Welcome to your
              <br />

              growth <em>journey.</em>
            </h1>

            <p>
              Your business deserves a thoughtful
              approach to growth. Keep track of your
              enquiries and stay connected with
              BRAND-ROOTS.
            </p>

            <a
              href="/contact"
              className="br-dashboard-cta"
            >
              Start a New Enquiry

              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="br-dashboard-hero-art">
            <div className="br-dashboard-art-orbit" />

            <div className="br-dashboard-art-card">
              <span className="br-art-card-label">
                YOUR BUSINESS
              </span>

              <div className="br-art-card-icon">
                <BriefcaseBusiness size={28} />
              </div>

              <h3>
                Rooted in
                <br />

                <em>possibility.</em>
              </h3>

              <div className="br-art-card-line" />

              <span className="br-art-card-footer">
                FROM ROOTS TO RECOGNITION
              </span>
            </div>

            <div className="br-dashboard-art-dot br-dot-one" />
            <div className="br-dashboard-art-dot br-dot-two" />
            <div className="br-dashboard-art-dot br-dot-three" />
          </div>

        </div>
      </div>

      {/* Main Dashboard */}
      <div className="br-dashboard-content">

        {/* Overview */}
        <div className="br-dashboard-section-heading">
          <div>
            <span className="br-dashboard-overline">
              YOUR OVERVIEW
            </span>

            <h2>
              A little progress,
              <br />

              <em>every day.</em>
            </h2>
          </div>

          <button
            type="button"
            className="br-dashboard-refresh"
            onClick={() => void fetchEnquiries()}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle
                size={16}
                className="br-spin"
              />
            ) : (
              <RefreshCw size={16} />
            )}

            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="br-dashboard-stats">

          <article className="br-stat-card br-stat-total">
            <div className="br-stat-top">
              <span>Total Enquiries</span>

              <div className="br-stat-icon">
                <FileText size={19} />
              </div>
            </div>

            <strong>
              {loading ? "—" : enquiries.length}
            </strong>

            <p>
              All your submitted enquiries
            </p>
          </article>

          <article className="br-stat-card">
            <div className="br-stat-top">
              <span>Awaiting Review</span>

              <div className="br-stat-icon">
                <Clock3 size={19} />
              </div>
            </div>

            <strong>
              {loading ? "—" : pendingCount}
            </strong>

            <p>
              Pending or contacted
            </p>
          </article>

          <article className="br-stat-card">
            <div className="br-stat-top">
              <span>In Progress</span>

              <div className="br-stat-icon">
                <BriefcaseBusiness size={19} />
              </div>
            </div>

            <strong>
              {loading ? "—" : activeCount}
            </strong>

            <p>
              Currently being worked on
            </p>
          </article>

          <article className="br-stat-card">
            <div className="br-stat-top">
              <span>Completed</span>

              <div className="br-stat-icon">
                <CheckCircle2 size={19} />
              </div>
            </div>

            <strong>
              {loading ? "—" : completedCount}
            </strong>

            <p>
              Successfully completed
            </p>
          </article>

        </div>

        {/* Enquiry History */}
        <div className="br-enquiries-section">

          <div className="br-enquiries-heading">
            <div>
              <span className="br-dashboard-overline">
                YOUR HISTORY
              </span>

              <h2>
                My <em>Enquiries.</em>
              </h2>

              <p>
                Every conversation is a step towards
                building a stronger business.
              </p>
            </div>

            <div className="br-enquiry-count">
              <MessageSquareText size={17} />

              {enquiries.length}{" "}
              {enquiries.length === 1
                ? "Enquiry"
                : "Enquiries"}
            </div>
          </div>

          {/* Search */}
          {!loading &&
            !error &&
            enquiries.length > 0 && (
              <div className="br-enquiry-search">
                <Search size={18} />

                <input
                  type="search"
                  placeholder="Search by plan, service or business..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  aria-label="Search enquiries"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

          {/* Loading */}
          {loading && (
            <div className="br-dashboard-state">
              <LoaderCircle
                size={30}
                className="br-spin"
              />

              <h3>
                Gathering your enquiries
              </h3>

              <p>
                Just a moment while we bring
                everything together.
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="br-dashboard-state">
              <div className="br-state-icon">
                <RefreshCw size={25} />
              </div>

              <h3>
                Something went wrong
              </h3>

              <p>{error}</p>

              <button
                type="button"
                className="br-dashboard-cta"
                onClick={() => void fetchEnquiries()}
              >
                Try Again

                <RefreshCw size={16} />
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            enquiries.length === 0 && (
              <div className="br-dashboard-empty">
                <div className="br-empty-illustration">
                  <div className="br-empty-circle">
                    <MessageSquareText size={34} />
                  </div>
                </div>

                <span className="br-dashboard-overline">
                  YOUR NEXT CHAPTER STARTS HERE
                </span>

                <h3>
                  No enquiries, <em>just yet.</em>
                </h3>

                <p>
                  Tell us about your business and
                  what you want to achieve. Let's
                  discover the right path forward,
                  together.
                </p>

                <a
                  href="/contact"
                  className="br-dashboard-cta"
                >
                  Let's Talk Growth

                  <ArrowUpRight size={18} />
                </a>
              </div>
            )}

          {/* No Search Results */}
          {!loading &&
            !error &&
            enquiries.length > 0 &&
            filteredEnquiries.length === 0 && (
              <div className="br-dashboard-state">
                <Search size={28} />

                <h3>
                  No matching enquiries
                </h3>

                <p>
                  Try searching with a different
                  service or business name.
                </p>
              </div>
            )}

          {/* Enquiry Cards */}
          {!loading &&
            !error &&
            filteredEnquiries.length > 0 && (
              <div className="br-enquiry-list">
                {filteredEnquiries.map(
                  (enquiry, index) => (
                    <article
                      className="br-enquiry-card"
                      key={enquiry.id}
                      style={{
                        animationDelay: `${index * 70}ms`,
                      }}
                    >
                      <div className="br-enquiry-card-top">

                        <div className="br-enquiry-card-title">
                          <span className="br-enquiry-number">
                            ENQUIRY #{enquiry.id}
                          </span>

                          <h3>
                            {enquiry.plan_name}
                          </h3>

                          <p>
                            {enquiry.business_name}
                          </p>
                        </div>

                        <span
                          className={`br-enquiry-status ${getStatusClass(
                            enquiry.status
                          )}`}
                        >
                          <span className="br-status-dot" />

                          {getStatusLabel(
                            enquiry.status
                          )}
                        </span>

                      </div>

                      <div className="br-enquiry-card-details">

                        <div className="br-enquiry-detail">
                          <span className="br-detail-icon">
                            <BriefcaseBusiness
                              size={16}
                            />
                          </span>

                          <div>
                            <span>
                              SERVICE
                            </span>

                            <strong>
                              {enquiry.service_name}
                            </strong>
                          </div>
                        </div>

                        <div className="br-enquiry-detail">
                          <span className="br-detail-icon">
                            <CalendarDays
                              size={16}
                            />
                          </span>

                          <div>
                            <span>
                              SUBMITTED ON
                            </span>

                            <strong>
                              {formatDate(
                                enquiry.created_at
                              )}
                            </strong>
                          </div>
                        </div>

                      </div>

                      <div className="br-enquiry-message">
                        <span>
                          YOUR MESSAGE
                        </span>

                        <p>
                          {enquiry.message ||
                            "No additional message provided."}
                        </p>
                      </div>

                    </article>
                  )
                )}
              </div>
            )}

        </div>

        {/* Bottom Note */}
        {!loading && !error && (
          <div className="br-dashboard-bottom-note">
            <div className="br-bottom-note-icon">
              <Sparkles size={19} />
            </div>

            <p>
              <strong>
                Every great business has a story.
              </strong>

              <br />

              We're here to help you write the
              next chapter.
            </p>

            <span>
              BRAND-ROOTS
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
