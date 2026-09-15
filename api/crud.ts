import { Hono } from "hono";
import { pool, rowToApi, apiToColumns } from "./db";
import { verifyRequest } from "./auth";

/** Columns each resource allows a write to touch. Anything else is dropped. */
export const RESOURCES = {
  projects: [
    "title", "category", "tagline", "about", "description", "full_description", "image",
    "screenshots", "tech_stack", "features", "play_store_link", "app_store_link",
    "order", "published",
  ],
  blogs: [
    "title", "date", "image", "category", "excerpt", "content", "read_time",
    "tags", "comments", "link", "order", "published",
  ],
  testimonials: ["name", "designation", "message", "quote", "order", "published"],
  clients: ["name", "logo", "order", "published"],
} as const;

/** Columns stored as JSONB — pg needs these serialised explicitly. */
const JSON_COLS = new Set(["screenshots", "tech_stack", "features", "tags"]);

const encode = (col: string, v: unknown) =>
  JSON_COLS.has(col) ? JSON.stringify(v ?? []) : v;

type Resource = keyof typeof RESOURCES;

async function requireAdmin(c: any) {
  const who = await verifyRequest(c.req.header("authorization"));
  if (!who) return c.json({ detail: "Could not validate credentials" }, 401);
  return null;
}

export function crudRoutes(resource: Resource) {
  const app = new Hono();
  const table = resource;
  const writable = RESOURCES[resource];

  // Public: published rows only.
  app.get("/", async (c) => {
    const { rows } = await pool.query(
      `SELECT * FROM ${table} WHERE published = TRUE ORDER BY "order", id`,
    );
    return c.json(rows.map(rowToApi));
  });

  // Admin: everything, drafts included. Declared before /:id so it is not
  // swallowed by the param route.
  app.get("/admin/all", async (c) => {
    const denied = await requireAdmin(c);
    if (denied) return denied;
    const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY "order", id`);
    return c.json(rows.map(rowToApi));
  });

  app.post("/reorder", async (c) => {
    const denied = await requireAdmin(c);
    if (denied) return denied;
    const items = await c.req.json<Array<{ id: number; order: number }>>();
    if (!Array.isArray(items)) return c.json({ detail: "Expected an array" }, 422);

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const it of items) {
        await client.query(`UPDATE ${table} SET "order" = $1 WHERE id = $2`, [
          it.order, it.id,
        ]);
      }
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
    return c.body(null, 204);
  });

  app.get("/:id{[0-9]+}", async (c) => {
    const { rows } = await pool.query(
      `SELECT * FROM ${table} WHERE id = $1 AND published = TRUE`,
      [c.req.param("id")],
    );
    if (!rows.length) return c.json({ detail: "Not found" }, 404);
    return c.json(rowToApi(rows[0]));
  });

  app.post("/", async (c) => {
    const denied = await requireAdmin(c);
    if (denied) return denied;
    const body = await c.req.json<Record<string, unknown>>();
    const cols = apiToColumns(body, writable);

    if (!cols.title && (resource === "projects" || resource === "blogs")) {
      return c.json({ detail: "title is required" }, 422);
    }
    if (!cols.name && (resource === "testimonials" || resource === "clients")) {
      return c.json({ detail: "name is required" }, 422);
    }

    const keys = Object.keys(cols);
    const quoted = keys.map((k) => `"${k}"`).join(", ");
    const params = keys.map((_, i) => `$${i + 1}`).join(", ");
    const values = keys.map((k) => encode(k, cols[k]));

    const { rows } = await pool.query(
      `INSERT INTO ${table} (${quoted}) VALUES (${params}) RETURNING *`,
      values,
    );
    return c.json(rowToApi(rows[0]), 201);
  });

  app.put("/:id{[0-9]+}", async (c) => {
    const denied = await requireAdmin(c);
    if (denied) return denied;
    const body = await c.req.json<Record<string, unknown>>();
    const cols = apiToColumns(body, writable);
    const keys = Object.keys(cols);

    if (!keys.length) return c.json({ detail: "No writable fields supplied" }, 422);

    const sets = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ");
    const values = keys.map((k) => encode(k, cols[k]));
    values.push(c.req.param("id"));

    const { rows } = await pool.query(
      `UPDATE ${table} SET ${sets}, updated_at = now() WHERE id = $${keys.length + 1} RETURNING *`,
      values,
    );
    if (!rows.length) return c.json({ detail: "Not found" }, 404);
    return c.json(rowToApi(rows[0]));
  });

  app.delete("/:id{[0-9]+}", async (c) => {
    const denied = await requireAdmin(c);
    if (denied) return denied;
    const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [
      c.req.param("id"),
    ]);
    if (!rowCount) return c.json({ detail: "Not found" }, 404);
    return c.body(null, 204);
  });

  return app;
}
