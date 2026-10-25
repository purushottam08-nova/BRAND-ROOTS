
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export interface EnquiryPayload {
  full_name: string;
  email: string;
  company_name?: string;
  service_slug?: string;
  message: string;
}

export interface Enquiry {
  id: number;
  full_name: string;
  email: string;
  company_name: string | null;
  service_slug: string | null;
  message: string;
  status: string;
  created_at: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = body?.detail;
    const message =
      typeof detail === "string" ? detail : `Request failed (${response.status})`;

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function submitEnquiry(payload: EnquiryPayload) {
  return request<Enquiry>(
    "/api/v1/enquiries",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export function adminLogin(email: string, password: string) {
  return request<{ access_token: string; token_type: string }>(
    "/api/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
  );
}

export function getMyProfile(token: string) {
  return request<{
    id: number;
    email: string;
    is_active: boolean;
  }>("/api/v1/auth/me", {}, token);
}


export function getEnquiries(
  token: string,
  page = 1,
  pageSize = 10,
  status?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  if (status) {
    params.set('status', status);
  }

  return request<{
    items: Enquiry[];
    total: number;
    page: number;
    page_size: number;
  }>(
    `/api/v1/admin/enquiries?${params.toString()}`,
    {},
    token,
  );
}


export function updateEnquiryStatus(
  token: string,
  enquiryId: number,
  status: "new" | "contacted" | "in_progress" | "completed" | "rejected",
) {
  return request<Enquiry>(
    `/api/v1/admin/enquiries/${enquiryId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    token,
  );
}
