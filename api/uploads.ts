import { Hono } from "hono";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { verifyRequest } from "./auth";

// Neon injects these when the branch declares object storage.
const s3 = new S3Client({
  region: process.env.AWS_REGION || "auto",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKETS = new Set(["blogs", "projects", "clients"]);
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
]);

const storageReady = () =>
  Boolean(process.env.AWS_ENDPOINT_URL_S3 && process.env.AWS_ACCESS_KEY_ID);

export function uploadRoutes() {
  const app = new Hono();

  app.post("/uploads/image", async (c) => {
    const who = await verifyRequest(c.req.header("authorization"));
    if (!who) return c.json({ detail: "Could not validate credentials" }, 401);
    if (!storageReady()) {
      return c.json({ detail: "Object storage is not configured" }, 503);
    }

    const form = await c.req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return c.json({ detail: "No file supplied" }, 400);
    if (!ALLOWED.has(file.type)) {
      return c.json({ detail: `Unsupported type ${file.type}` }, 415);
    }
    if (file.size > MAX_BYTES) {
      return c.json({ detail: `Image exceeds the ${MAX_BYTES / 1048576}MB limit` }, 413);
    }

    const requested = (form.get("bucket") as string) || "blogs";
    const bucket = BUCKETS.has(requested) ? requested : "blogs";

    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: bytes,
        ContentType: file.type,
      }),
    );

    // Buckets are private, so hand back a URL served by this function rather
    // than a presigned link that would expire out from under the site.
    const base = new URL(c.req.url).origin;
    return c.json(
      { url: `${base}/api/images/${bucket}/${key}`, publicId: `${bucket}/${key}`, bytes: file.size },
      201,
    );
  });

  // Public read-through for the private buckets.
  app.get("/images/:bucket/:key", async (c) => {
    const bucket = c.req.param("bucket");
    const key = c.req.param("key");
    if (!BUCKETS.has(bucket)) return c.json({ detail: "Unknown bucket" }, 404);
    if (!storageReady()) return c.json({ detail: "Object storage unavailable" }, 503);

    try {
      const obj = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
      const body = await obj.Body?.transformToByteArray();
      if (!body) return c.json({ detail: "Not found" }, 404);

      return c.body(body, 200, {
        "Content-Type": obj.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
    } catch {
      return c.json({ detail: "Not found" }, 404);
    }
  });

  return app;
}
