import { Pool } from "pg";
import { attachDatabasePool } from "@neon/functions";

// Module scope: the isolate is reused across requests, so the pool is opened
// once on cold start and shared. Keep max small — every isolate has its own.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

// Without this, an idle-client disconnect surfaces as an uncaughtException and
// Node tears down the isolate.
attachDatabasePool(pool);

const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const toSnake = (s: string) => s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

/** DB row (snake_case) -> API shape (camelCase), which is what the React components read. */
export function rowToApi<T extends Record<string, unknown>>(row: T) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === "created_at" || k === "updated_at") continue;
    out[toCamel(k)] = v;
  }
  return out;
}

/** API shape -> DB columns, dropping anything not explicitly writable. */
export function apiToColumns(
  payload: Record<string, unknown>,
  writable: readonly string[],
) {
  const cols: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(payload)) {
    const col = toSnake(k);
    if (writable.includes(col)) cols[col] = v;
  }
  return cols;
}
