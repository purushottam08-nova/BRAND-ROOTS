
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  RefreshCw,
  LoaderCircle,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  Send,
} from "lucide-react";

import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

type Enquiry = {
  id: number;
  user_id: number;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  service_name: string;
  plan_name: string;
  business_name: string;
  message: string;
  status: string;
  created_at: string;
};

type ProgressUpdatePayload = {
  title: string;
  description: string;
  status: string;
};

type ProgressUpdateDraft = {
  title: string;
  description: string;
  status: string;
};

const STATUSES = [
  "pending",
  "contacted",
  "in_progress",
  "completed",
  "rejected",
];

const UPDATE_STATUSES = [
  "pending",
  "in_progress",
  "completed",
];

export default function AdminDashboard() {
  const { token, role, isAuthenticated, user } = useAuth();

  // Personalized admin name
  const adminName = user?.name?.trim() || "Admin";

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [updateDrafts, setUpdateDrafts] = useState<
    Record<number, ProgressUpdateDraft>
  >({});

  const [postingUpdateId, setPostingUpdateId] =
    useState<number | null>(null);

  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchEnquiries = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest<Enquiry[]>(
        "/api/v1/admin/enquiries/",
        {},
        token
      );

      setEnquiries(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void fetchEnquiries();

    const interval = setInterval(
      () => void fetchEnquiries(),
      30000
    );

    return () => clearInterval(interval);
  }, [fetchEnquiries]);

  async function updateStatus(
    enquiryId: number,
    newStatus: string
  ) {
    if (!token) return;

    setUpdatingId(enquiryId);
    setError("");

    try {
      await apiRequest(
        `/api/v1/admin/enquiries/${enquiryId}/status?new_status=${encodeURIComponent(
          newStatus
        )}`,
        {
          method: "PATCH",
        },
        token
      );

      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry.id === enquiryId
            ? { ...enquiry, status: newStatus }
            : enquiry
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update enquiry status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function postProgressUpdate(
    enquiryId: number
  ) {
    if (!token) return;

    const draft = updateDrafts[enquiryId];

    if (
      !draft?.title.trim() ||
      !draft?.description.trim()
    ) {
      setUpdateError(
        "Please enter both update title and description."
      );

      setUpdateMessage("");
      return;
    }

    setPostingUpdateId(enquiryId);
    setUpdateError("");
    setUpdateMessage("");

    try {
      const payload: ProgressUpdatePayload = {
        title: draft.title.trim(),
        description: draft.description.trim(),
        status: draft.status,
      };

      await apiRequest(
        `/api/v1/admin/enquiries/${enquiryId}/updates`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        token
      );

      setUpdateDrafts((previous) => ({
        ...previous,
        [enquiryId]: {
          title: "",
          description: "",
          status: "in_progress",
        },
      }));

      setUpdateMessage(
        `Progress update posted for enquiry #${enquiryId}.`
      );
    } catch (err) {
      setUpdateError(
        err instanceof Error
          ? err.message
          : "Unable to post progress update."
      );
    } finally {
      setPostingUpdateId(null);
    }
  }

  function updateDraftField(
    enquiryId: number,
    field: keyof ProgressUpdateDraft,
    value: string
  ) {
    setUpdateDrafts((previous) => ({
      ...previous,
      [enquiryId]: {
        title: previous[enquiryId]?.title ?? "",
        description:
          previous[enquiryId]?.description ?? "",
        status:
          previous[enquiryId]?.status ?? "in_progress",
        [field]: value,
      },
    }));
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const pendingCount = enquiries.filter(
    (enquiry) => enquiry.status === "pending"
  ).length;

  const completedCount = enquiries.filter(
    (enquiry) => enquiry.status === "completed"
  ).length;

  return (
    <section className="admin-dashboard section-padding">
      {/* Dashboard Header */}
      <div className="admin-header">
        <div>
          <span className="eyebrow">
            OWNER CONTROL PANEL
          </span>

          <h1>
            Welcome,
            <br />
            <em>{adminName}!</em>
          </h1>

          <p>
            Manage your clients, track progress,
            and grow BRAND-ROOTS.
          </p>
        </div>

        <button
          type="button"
          className="button button-dark"
          onClick={() => void fetchEnquiries()}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <RefreshCw size={18} />
          )}

          Refresh
        </button>
      </div>

      {/* Enquiry Error */}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Enquiries</span>
          <strong>{enquiries.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </div>

      {/* Enquiries Section */}
      <div className="admin-enquiries">
        <div className="admin-section-heading">
          <div>
            <ShieldCheck size={20} />
            <h2>All Enquiries</h2>
          </div>

          <span>
            {enquiries.length} records
          </span>
        </div>

        {loading ? (
          <div className="admin-loading">
            <LoaderCircle
              size={28}
              className="animate-spin"
            />

            <p>Loading enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="admin-empty">
            <h3>No enquiries yet</h3>

            <p>
              New business enquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="admin-enquiry-list">
            {enquiries.map((enquiry) => {
              const draft = updateDrafts[enquiry.id];

              return (
                <article
                  className="admin-enquiry-card"
                  key={enquiry.id}
                >
                  {/* Enquiry Header */}
                  <div className="admin-enquiry-top">
                    <div>
                      <span className="eyebrow">
                        ENQUIRY #{enquiry.id}
                      </span>

                      <h3>
                        {enquiry.business_name}
                      </h3>
                    </div>

                    <select
                      aria-label={`Status for enquiry ${enquiry.id}`}
                      value={enquiry.status}
                      onChange={(event) =>
                        void updateStatus(
                          enquiry.id,
                          event.target.value
                        )
                      }
                      disabled={
                        updatingId === enquiry.id
                      }
                    >
                      {STATUSES.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status
                            .replace("_", " ")
                            .toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Enquiry Metadata */}
                  <div className="admin-enquiry-meta">
                    <span>
                      <Building2 size={16} />
                      {enquiry.service_name}
                    </span>

                    <span>
                      <ShieldCheck size={16} />
                      {enquiry.plan_name}
                    </span>

                    <span>
                      <CalendarDays size={16} />
                      {new Date(
                        enquiry.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Client Details */}
                  <div className="admin-client-details">
                    <p>
                      <strong>
                        {enquiry.user_name || "Client"}
                      </strong>
                    </p>

                    {enquiry.user_email && (
                      <p>
                        <Mail size={15} />
                        {enquiry.user_email}
                      </p>
                    )}

                    {enquiry.user_phone && (
                      <p>
                        <Phone size={15} />
                        {enquiry.user_phone}
                      </p>
                    )}
                  </div>

                  {/* Client Message */}
                  <div className="admin-enquiry-message">
                    <p>{enquiry.message}</p>
                  </div>

                  {/* Progress Update Form */}
                  <div className="admin-progress-update">
                    <h4>
                      Post Project Update
                    </h4>

                    <input
                      type="text"
                      placeholder="Update title"
                      aria-label={`Update title for enquiry ${enquiry.id}`}
                      value={draft?.title ?? ""}
                      onChange={(event) =>
                        updateDraftField(
                          enquiry.id,
                          "title",
                          event.target.value
                        )
                      }
                    />

                    <textarea
                      placeholder="Describe the work completed or next steps..."
                      aria-label={`Update description for enquiry ${enquiry.id}`}
                      rows={3}
                      value={
                        draft?.description ?? ""
                      }
                      onChange={(event) =>
                        updateDraftField(
                          enquiry.id,
                          "description",
                          event.target.value
                        )
                      }
                    />

                    <select
                      aria-label={`Progress status for enquiry ${enquiry.id}`}
                      value={
                        draft?.status ?? "in_progress"
                      }
                      onChange={(event) =>
                        updateDraftField(
                          enquiry.id,
                          "status",
                          event.target.value
                        )
                      }
                    >
                      {UPDATE_STATUSES.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status
                              .replace("_", " ")
                              .toUpperCase()}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      type="button"
                      className="button button-dark"
                      onClick={() =>
                        void postProgressUpdate(
                          enquiry.id
                        )
                      }
                      disabled={
                        postingUpdateId === enquiry.id
                      }
                    >
                      {postingUpdateId ===
                      enquiry.id ? (
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Send size={16} />
                      )}

                      Post Update
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress Update Feedback */}
      {updateError && (
        <div className="form-error" role="alert">
          {updateError}
        </div>
      )}

      {updateMessage && (
        <div className="form-success" role="status">
          {updateMessage}
        </div>
      )}
    </section>
  );
}
