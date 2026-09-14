import { sign, verify } from "hono/jwt";

// Hono requires the algorithm to be named explicitly on verify.
const ALG = "HS256" as const;
import bcrypt from "bcryptjs";
import { pool } from "./db";

const SECRET = process.env.JWT_SECRET || "";
const TTL_SECONDS = 60 * 60 * 12;

export async function issueToken(username: string) {
  const now = Math.floor(Date.now() / 1000);
  const token = await sign(
    { sub: username, iat: now, exp: now + TTL_SECONDS },
    SECRET,
    ALG,
  );
  return { accessToken: token, tokenType: "bearer", expiresIn: TTL_SECONDS };
}

/** Returns the admin username, or null when the token is absent/invalid/expired. */
export async function verifyRequest(authHeader: string | undefined) {
  if (!authHeader?.toLowerCase().startsWith("bearer ")) return null;
  try {
    const payload = await verify(authHeader.slice(7), SECRET, ALG);
    const sub = payload?.sub;
    if (typeof sub !== "string") return null;

    const { rows } = await pool.query(
      "SELECT username FROM admin_users WHERE username = $1 AND is_active = TRUE",
      [sub],
    );
    return rows.length ? (rows[0].username as string) : null;
  } catch (err: any) {
    // Expired/!malformed tokens are routine; anything else is worth seeing.
    const routine = ["JwtTokenExpired", "JwtTokenInvalid", "JwtTokenSignatureMismatched"];
    if (!routine.includes(err?.constructor?.name)) console.error("[auth]", err);
    return null;
  }
}

export async function checkPassword(username: string, password: string) {
  const { rows } = await pool.query(
    "SELECT username, hashed_password FROM admin_users WHERE username = $1 AND is_active = TRUE",
    [username],
  );
  if (!rows.length) return false;
  return bcrypt.compare(password, rows[0].hashed_password as string);
}

export async function setPassword(username: string, plain: string) {
  const hash = await bcrypt.hash(plain, 10);
  await pool.query(
    "UPDATE admin_users SET hashed_password = $1, updated_at = now() WHERE username = $2",
    [hash, username],
  );
}
