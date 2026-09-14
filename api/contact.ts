import { Hono } from "hono";
import { pool, rowToApi } from "./db";
import { verifyRequest } from "./auth";

const LIMITS = {
  name: 160, email: 254, location: 200, budget: 120, subject: 300, message: 5000,
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );

/** Best-effort email notification. Never throws — the message is already saved. */
async function notify(row: Record<string, any>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_TO;
  if (!key || !to) return false;

  const from = process.env.CONTACT_NOTIFY_FROM || "onboarding@resend.dev";
  const body = `
    <h2 style="margin:0 0 16px">New message from your portfolio</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${esc(row.name)}</td></tr>
      <tr><td><b>Email</b></td><td><a href="mailto:${esc(row.email)}">${esc(row.email)}</a></td></tr>
      <tr><td><b>Location</b></td><td>${esc(row.location)}</td></tr>
      <tr><td><b>Budget</b></td><td>${esc(row.budget)}</td></tr>
      <tr><td><b>Subject</b></td><td>${esc(row.subject)}</td></tr>
    </table>
    <p style="white-space:pre-wrap;margin-top:16px;padding:12px;background:#f6f8fa;border-radius:8px">${esc(row.message)}</p>
    <p style="color:#666;font-size:12px">Reply straight to this email to answer ${esc(row.name)}.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Portfolio <${from}>`,
        to: [to],
        reply_to: row.email,
        subject: `Portfolio enquiry: ${row.subject || row.name}`,
        html: body,
      }),
    });
    if (!res.ok) {
      console.error("[contact] resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] resend threw", err);
    return false;
  }
}

export function contactRoutes() {
  const app = new Hono();

  // Public submit.
  app.post("/", async (c) => {
    let body: Record<string, unknown>;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ detail: "Invalid JSON" }, 400);
    }

    // Bots fill hidden fields; humans never see this one.
    if (clean(body.website, 100)) return c.json({ ok: true }, 201);

    const row = {
      name: clean(body.name, LIMITS.name),
      email: clean(body.email, LIMITS.email),
      location: clean(body.location, LIMITS.location),
      budget: clean(body.budget, LIMITS.budget),
      subject: clean(body.subject, LIMITS.subject),
      message: clean(body.message, LIMITS.message),
    };

    if (!row.name) return c.json({ detail: "Name is required" }, 422);
    if (!looksLikeEmail(row.email)) return c.json({ detail: "A valid email is required" }, 422);
    if (!row.message) return c.json({ detail: "Message is required" }, 422);

    const { rows } = await pool.query(
      `INSERT INTO contact_messages (name, email, location, budget, subject, message)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [row.name, row.email, row.location, row.budget, row.subject, row.message],
    );
    const saved = rows[0];

    // Saved first, so a failed notification never costs the message.
    const sent = await notify(saved);
    if (sent) {
      await pool.query("UPDATE contact_messages SET notified = TRUE WHERE id = $1", [saved.id]);
    }

    return c.json({ ok: true, id: saved.id }, 201);
  });

  // --- admin ---

  const guard = async (c: any) =>
    (await verifyRequest(c.req.header("authorization")))
      ? null
      : c.json({ detail: "Could not validate credentials" }, 401);

  app.get("/admin/all", async (c) => {
    const denied = await guard(c);
    if (denied) return denied;
    const { rows } = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC",
    );
    return c.json(rows.map(rowToApi));
  });

  app.get("/admin/unread-count", async (c) => {
    const denied = await guard(c);
    if (denied) return denied;
    const { rows } = await pool.query(
      "SELECT count(*)::int AS count FROM contact_messages WHERE read = FALSE",
    );
    return c.json({ count: rows[0].count });
  });

  app.put("/:id{[0-9]+}/read", async (c) => {
    const denied = await guard(c);
    if (denied) return denied;
    const read = (await c.req.json().catch(() => ({}))).read;
    const { rows } = await pool.query(
      "UPDATE contact_messages SET read = $1 WHERE id = $2 RETURNING *",
      [read !== false, c.req.param("id")],
    );
    if (!rows.length) return c.json({ detail: "Not found" }, 404);
    return c.json(rowToApi(rows[0]));
  });

  app.delete("/:id{[0-9]+}", async (c) => {
    const denied = await guard(c);
    if (denied) return denied;
    const { rowCount } = await pool.query("DELETE FROM contact_messages WHERE id = $1", [
      c.req.param("id"),
    ]);
    if (!rowCount) return c.json({ detail: "Not found" }, 404);
    return c.body(null, 204);
  });

  return app;
}
