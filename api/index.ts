import { Hono } from "hono";
import { cors } from "hono/cors";
import { pool } from "./db";
import { issueToken, verifyRequest, checkPassword, setPassword } from "./auth";
import { crudRoutes } from "./crud";
import { uploadRoutes } from "./uploads";
import { contactRoutes } from "./contact";

const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ||
  "https://abdul-salam111.github.io,http://localhost:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const app = new Hono();

app.use(
  "*",
  cors({
    // Auth rides in the Authorization header, not cookies, so credentials stay off.
    origin: (origin) => (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]),
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  }),
);

app.get("/", (c) =>
  c.json({ service: "portfolio-api", runtime: "neon-functions", health: "/health" }),
);

app.get("/health", async (c) => {
  try {
    await pool.query("SELECT 1");
    return c.json({ status: "ok", db: "up" });
  } catch {
    return c.json({ status: "degraded", db: "down" }, 503);
  }
});

// ---------- auth ----------

app.post("/api/auth/login", async (c) => {
  const { username, password } = await c.req.json<{
    username?: string;
    password?: string;
  }>();
  if (!username || !password) {
    return c.json({ detail: "username and password are required" }, 422);
  }
  // Identical error for unknown user and wrong password, so the response does
  // not reveal which usernames exist.
  if (!(await checkPassword(username, password))) {
    return c.json({ detail: "Incorrect username or password" }, 401);
  }
  return c.json(await issueToken(username));
});

app.get("/api/auth/me", async (c) => {
  const who = await verifyRequest(c.req.header("authorization"));
  if (!who) return c.json({ detail: "Could not validate credentials" }, 401);
  const { rows } = await pool.query(
    "SELECT id, username FROM admin_users WHERE username = $1",
    [who],
  );
  return c.json(rows[0]);
});

app.post("/api/auth/change-password", async (c) => {
  const who = await verifyRequest(c.req.header("authorization"));
  if (!who) return c.json({ detail: "Could not validate credentials" }, 401);

  const body = await c.req.json<Record<string, string>>();
  const current = body.current_password ?? body.currentPassword;
  const next = body.new_password ?? body.newPassword;

  if (!current || !next) return c.json({ detail: "Both passwords are required" }, 422);
  if (next.length < 8) return c.json({ detail: "New password must be 8+ characters" }, 422);
  if (!(await checkPassword(who, current))) {
    return c.json({ detail: "Current password is incorrect" }, 400);
  }
  await setPassword(who, next);
  return c.body(null, 204);
});

// ---------- content ----------

app.route("/api/projects", crudRoutes("projects"));
app.route("/api/blogs", crudRoutes("blogs"));
app.route("/api/testimonials", crudRoutes("testimonials"));
app.route("/api/clients", crudRoutes("clients"));

// ---------- images ----------

app.route("/api", uploadRoutes());

// ---------- contact ----------

app.route("/api/contact", contactRoutes());

app.notFound((c) => c.json({ detail: "Not found" }, 404));

app.onError((err, c) => {
  console.error("[api]", err);
  return c.json({ detail: "Internal server error" }, 500);
});

export default app;
