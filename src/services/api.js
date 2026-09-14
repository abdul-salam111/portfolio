// Base URL of the FastAPI backend, e.g. https://portfolio-api.onrender.com
// When unset, every read falls back to the bundled static content and every
// write fails loudly — so the public site still works with no backend at all.
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const TOKEN_KEY = "portfolio_admin_token";

export const isApiConfigured = () => Boolean(BASE);

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private mode — session continues in memory only */
  }
};

export const clearToken = () => setToken(null);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, { method = "GET", body, auth = false, signal } = {}) {
  if (!BASE) throw new ApiError("VITE_API_URL is not set", 0);

  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (!token) throw new ApiError("Not signed in", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (res.status === 401 && auth) {
    clearToken();
    throw new ApiError("Session expired — please sign in again", 401);
  }

  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data?.detail === "string") detail = data.detail;
      else if (Array.isArray(data?.detail)) {
        // FastAPI validation errors
        detail = data.detail
          .map((e) => `${(e.loc || []).slice(1).join(".")}: ${e.msg}`)
          .join("; ");
      }
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(detail, res.status);
  }

  return res.status === 204 ? null : res.json();
}

/** Public read that never throws — returns `fallback` if the API is absent,
 *  asleep, erroring, or simply has no rows yet. */
export async function fetchPublic(resource, fallback = [], signal) {
  if (!BASE) return fallback;
  try {
    const data = await request(`/api/${resource}`, { signal });
    return Array.isArray(data) && data.length > 0 ? data : fallback;
  } catch {
    return fallback;
  }
}

/** Public contact-form submission. */
export const submitContact = (fields) =>
  request("/api/contact", { method: "POST", body: fields });

/** Admin inbox for contact messages. */
export const messages = {
  listAll: () => request("/api/contact/admin/all", { auth: true }),
  unreadCount: () => request("/api/contact/admin/unread-count", { auth: true }),
  setRead: (id, read) =>
    request(`/api/contact/${id}/read`, { method: "PUT", auth: true, body: { read } }),
  remove: (id) => request(`/api/contact/${id}`, { method: "DELETE", auth: true }),
};

export const auth = {
  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: { username, password } }),
  me: () => request("/api/auth/me", { auth: true }),
  changePassword: (currentPassword, newPassword) =>
    request("/api/auth/change-password", {
      method: "POST",
      auth: true,
      body: { current_password: currentPassword, new_password: newPassword },
    }),
};

/** Admin CRUD for one resource ("projects", "blogs", "testimonials", "clients"). */
export const adminResource = (resource) => ({
  listAll: () => request(`/api/${resource}/admin/all`, { auth: true }),
  create: (payload) => request(`/api/${resource}`, { method: "POST", auth: true, body: payload }),
  update: (id, payload) =>
    request(`/api/${resource}/${id}`, { method: "PUT", auth: true, body: payload }),
  remove: (id) => request(`/api/${resource}/${id}`, { method: "DELETE", auth: true }),
  reorder: (items) =>
    request(`/api/${resource}/reorder`, { method: "POST", auth: true, body: items }),
});

/** Multipart upload — deliberately not routed through request(), which is JSON-only. */
export async function uploadImage(file) {
  if (!BASE) throw new ApiError("VITE_API_URL is not set", 0);
  const token = getToken();
  if (!token) throw new ApiError("Not signed in", 401);

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/api/uploads/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) {
    let detail = `Upload failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data?.detail === "string") detail = data.detail;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(detail, res.status);
  }
  return res.json();
}
