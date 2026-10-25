
import { useEffect, useState, type FormEvent } from 'react';
import {
  adminLogin,
  getEnquiries,
  getMyProfile,
  updateEnquiryStatus,
  type Enquiry,
} from '../lib/api';

interface AdminDashboardProps {
  onBack: () => void;
}

type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'completed'
  | 'rejected';

type StatusFilter = '' | EnquiryStatus;

const STATUSES: EnquiryStatus[] = [
  'new',
  'contacted',
  'in_progress',
  'completed',
  'rejected',
];

const STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In progress',
  completed: 'Completed',
  rejected: 'Rejected',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Something went wrong. Please try again.';
}

function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<{
    id: number;
    email: string;
    is_active: boolean;
  } | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [items, setItems] = useState<Enquiry[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<StatusFilter>('');

  const [loginBusy, setLoginBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // Load and verify the currently authenticated admin.
  useEffect(() => {
    if (!token) {
      setProfile(null);
      return;
    }

    let cancelled = false;

    async function verifyAdmin() {
      try {
        const result = await getMyProfile(token);

        if (cancelled) return;

        if (!result.is_active) {
          setToken('');
          setProfile(null);
          setItems([]);
          setError('This admin account is inactive.');
          return;
        }

        setProfile(result);
        setError('');
      } catch (err) {
        if (cancelled) return;

        setToken('');
        setProfile(null);
        setItems([]);
        setError(
          `Your session could not be verified. ${getErrorMessage(err)}`,
        );
      }
    }

    void verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Fetch enquiries from the backend with server-side filtering.
  useEffect(() => {
    if (!token || !profile) return;

    let cancelled = false;

    async function loadEnquiries() {
      setBusy(true);
      setError('');

      try {
        const result = await getEnquiries(
          token,
          page,
          pageSize,
          filter || undefined,
        );

        if (cancelled) return;

        setItems(result.items);
        setTotal(result.total);
      } catch (err) {
        if (cancelled) return;

        setError(getErrorMessage(err));
      } finally {
        if (!cancelled) {
          setBusy(false);
        }
      }
    }

    void loadEnquiries();

    return () => {
      cancelled = true;
    };
  }, [token, profile, page, pageSize, filter]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setNotice('');
    setLoginBusy(true);

    try {
      const result = await adminLogin(email.trim(), password);

      setPassword('');
      setPage(1);
      setFilter('');
      setItems([]);
      setToken(result.access_token);
      setNotice('Login successful. Loading your dashboard...');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleStatusChange(
    enquiryId: number,
    nextStatus: EnquiryStatus,
  ) {
    const currentEnquiry = items.find((item) => item.id === enquiryId);

    if (!currentEnquiry || currentEnquiry.status === nextStatus) {
      return;
    }

    setError('');
    setNotice('');
    setUpdatingId(enquiryId);

    try {
      await updateEnquiryStatus(token, enquiryId, nextStatus);

      // If a status filter is active, the updated enquiry may no
      // longer belong on this page. Refetch to keep pagination accurate.
      setNotice('Enquiry status updated successfully.');

      const result = await getEnquiries(
        token,
        page,
        pageSize,
        filter || undefined,
      );

      setItems(result.items);
      setTotal(result.total);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  }

  function handleFilterChange(value: string) {
    setFilter(value as StatusFilter);
    setPage(1);
    setNotice('');
    setError('');
  }

  function handleLogout() {
    setToken('');
    setProfile(null);
    setItems([]);
    setEmail('');
    setPassword('');
    setPage(1);
    setTotal(0);
    setFilter('');
    setError('');
    setNotice('');
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, total);

  // Login screen.
  if (!token || !profile) {
    return (
      <main className="admin-page">
        <header className="admin-header">
          <div>
            <a className="brand-logo" href="#home" onClick={onBack}>
              <span className="brand-name">BRAND-ROOTS</span>
              <span className="brand-tagline">
                FROM ROOTS TO RECOGNITION
              </span>
            </a>
          </div>

          <button
            type="button"
            className="button button-outline"
            onClick={onBack}
          >
            ← Back to website
          </button>
        </header>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <p className="eyebrow">SECURE ADMIN ACCESS</p>
          <h2>Admin login</h2>
          <p>Sign in to manage incoming business enquiries.</p>

          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button button-dark"
            disabled={loginBusy}
          >
            {loginBusy ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>
      </main>
    );
  }

  // Authenticated dashboard.
  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <a className="brand-logo" href="#home" onClick={onBack}>
            <span className="brand-name">BRAND-ROOTS</span>
            <span className="brand-tagline">
              FROM ROOTS TO RECOGNITION
            </span>
          </a>

          <p style={{ marginTop: 18 }}>
            Signed in as <strong>{profile.email}</strong>
          </p>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="button button-outline"
            onClick={onBack}
          >
            View website
          </button>

          <button
            type="button"
            className="button button-dark"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <section className="admin-content">
        <div className="admin-toolbar">
          <div>
            <p className="eyebrow">ENQUIRY MANAGEMENT</p>
            <h1>Enquiries</h1>
            <p>Review incoming enquiries and track their progress.</p>
          </div>

          <div className="admin-filters">
            <label htmlFor="enquiry-status-filter">
              Filter by status
            </label>

            <select
              id="enquiry-status-filter"
              value={filter}
              onChange={(event) => handleFilterChange(event.target.value)}
            >
              <option value="">All statuses</option>

              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {notice && (
          <p className="admin-notice" role="status">
            {notice}
          </p>
        )}

        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}

        <div className="admin-summary">
          <p>
            Total enquiries: <strong>{total}</strong>
          </p>
        </div>

        {busy && (
          <p role="status" aria-live="polite">
            Loading enquiries...
          </p>
        )}

        {!busy && items.length === 0 && !error && (
          <div className="enquiry-card">
            <h2>No enquiries found</h2>
            <p>
              There are no enquiries matching the selected status.
            </p>
          </div>
        )}

        {!busy && items.length > 0 && (
          <div className="enquiry-list">
            {items.map((enquiry) => {
              const currentStatus = STATUSES.includes(
                enquiry.status as EnquiryStatus,
              )
                ? (enquiry.status as EnquiryStatus)
                : 'new';

              return (
                <article className="enquiry-card" key={enquiry.id}>
                  <div className="enquiry-card-heading">
                    <div>
                      <span>Enquiry #{enquiry.id}</span>
                      <h2>{enquiry.full_name}</h2>
                      <p>{formatDate(enquiry.created_at)}</p>
                    </div>

                    <div>
                      <label htmlFor={`status-${enquiry.id}`}>
                        Enquiry status
                      </label>

                      <select
                        id={`status-${enquiry.id}`}
                        value={currentStatus}
                        disabled={updatingId === enquiry.id}
                        onChange={(event) =>
                          void handleStatusChange(
                            enquiry.id,
                            event.target.value as EnquiryStatus,
                          )
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>

                      {updatingId === enquiry.id && (
                        <small>Updating...</small>
                      )}
                    </div>
                  </div>

                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${enquiry.email}`}>
                      {enquiry.email}
                    </a>
                  </p>

                  {enquiry.company_name && (
                    <p>
                      <strong>Company:</strong> {enquiry.company_name}
                    </p>
                  )}

                  {enquiry.service_slug && (
                    <p>
                      <strong>Service:</strong> {enquiry.service_slug}
                    </p>
                  )}

                  <div>
                    <strong>Message</strong>
                    <p className="enquiry-message">{enquiry.message}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="admin-pagination">
          <p>
            Showing {firstItem}–{lastItem} of {total} enquiries
          </p>

          <div>
            <button
              type="button"
              disabled={page <= 1 || busy}
              onClick={() => setPage((current) => current - 1)}
            >
              ← Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages || busy}
              onClick={() => setPage((current) => current + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
