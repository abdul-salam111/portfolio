import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  preview: {
    buckets: {
      blogs: { access: "private" },
      projects: { access: "private" },
      clients: { access: "private" },
    },
    functions: {
      api: {
        name: "portfolio api",
        source: "api/index.ts",
        env: {
          JWT_SECRET: process.env.JWT_SECRET!,
          CORS_ORIGINS: process.env.CORS_ORIGINS!,
          // Contact-form notification. Without RESEND_API_KEY the message is
          // still saved and readable in the admin panel; only the email is skipped.
          RESEND_API_KEY: process.env.RESEND_API_KEY!,
          CONTACT_NOTIFY_TO: process.env.CONTACT_NOTIFY_TO!,
          CONTACT_NOTIFY_FROM: process.env.CONTACT_NOTIFY_FROM!,
        },
      },
    },
  },
});
