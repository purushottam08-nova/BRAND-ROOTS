import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  RefreshCw,
  LoaderCircle,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
} from "lucide-react";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

type ClientPlan = {
  id: number;
  service_name: string;
  plan_name: string;
  business_name: string;
  message: string;
  status: string;
  created_at: string;
};

type ProgressUpdate = {
  id: number;
  enquiry_id: number;
  title: string;
  description: string;
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

export default function ClientDashboard() {
  const { token, role, isAuthenticated } = useAuth();

  const [plans, setPlans] = useState<ClientPlan[]>([]);
  const [progressUpdates, setProgressUpdates] =
    useState<ProgressUpdate[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [plansData, updatesData] = await Promise.all([
        apiRequest<ClientPlan[]>(
          "/api/v1/enquiries/my",
          {},
          token
        ),
        apiRequest<ProgressUpdate[]>(
          "/api/v1/enquiries/my/updates",
          {},
          token
        ),
      ]);

      setPlans(plansData);
      setProgressUpdates(updatesData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void fetchPlans();
  }, [fetchPlans]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <section className="client-dashboard section-padding">
      {/* Dashboard Header */}
      <div className="section-heading">
        <span className="eyebrow">
          YOUR BRAND-ROOTS SPACE
        </span>

        <h1>
          Client <em>Dashboard</em>
        </h1>

        <p>
          Track your selected plans, project status, and
          updates from BRAND-ROOTS.
        </p>
      </div>

      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <h2>Your Projects</h2>

        <button
          type="button"
          className="button button-outline-dark"
          onClick={() => void fetchPlans()}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle size={16} className="spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="dashboard-message">
          <LoaderCircle className="spin" />
          Loading your projects...
        </div>
      ) : error ? (
        <div className="dashboard-message">
          <p>{error}</p>

          <button
            type="button"
            className="button button-gold"
            onClick={() => void fetchPlans()}
          >
            Try Again
          </button>
        </div>
      ) : plans.length === 0 ? (
        /* Empty State */
        <div className="dashboard-empty">
          <BriefcaseBusiness size={36} />

          <h3>No projects yet</h3>

          <p>
            Explore our plans and choose the right growth
            solution for your business.
          </p>

          <a href="/plans" className="button button-gold">
            Explore Plans
          </a>
        </div>
      ) : (
        /* Projects */
        <div className="client-projects-grid">
          {plans.map((plan) => {
            const projectUpdates = progressUpdates
              .filter(
                (update) => update.enquiry_id === plan.id
              )
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              );

            return (
              <article
                className="client-project-card"
                key={plan.id}
              >
                {/* Project Header */}
                <div className="project-card-top">
                  <span className="eyebrow">
                    {plan.service_name}
                  </span>

                  <span
                    className={`project-status status-${plan.status}`}
                  >
                    {STATUS_LABELS[plan.status] ??
                      plan.status.replace("_", " ")}
                  </span>
                </div>

                <h3>{plan.plan_name}</h3>

                <p className="project-business">
                  {plan.business_name}
                </p>

                <p className="project-message">
                  {plan.message}
                </p>

                {/* Project Metadata */}
                <div className="project-card-footer">
                  <span>
                    <CalendarDays size={15} />

                    {new Date(
                      plan.created_at
                    ).toLocaleDateString()}
                  </span>

                  <span>Project #{plan.id}</span>
                </div>

                {/* Progress Timeline */}
                <div className="project-progress-timeline">
                  <div className="project-timeline-heading">
                    <h4>Project Progress</h4>

                    <span>
                      {projectUpdates.length} updates
                    </span>
                  </div>

                  {projectUpdates.length === 0 ? (
                    <p className="project-no-updates">
                      No progress updates yet. Updates from
                      BRAND-ROOTS will appear here.
                    </p>
                  ) : (
                    <div className="project-update-list">
                      {projectUpdates.map((update) => (
                        <article
                          className="project-update-item"
                          key={update.id}
                        >
                          <div className="project-update-heading">
                            <h5>{update.title}</h5>

                            <span
                              className={`project-status status-${update.status}`}
                            >
                              {STATUS_LABELS[update.status] ??
                                update.status.replace("_", " ")}
                            </span>
                          </div>

                          <p>{update.description}</p>

                          <span className="project-update-date">
                            <Clock size={14} />

                            {new Date(
                              update.created_at
                            ).toLocaleDateString()}
                          </span>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}