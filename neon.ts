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
        },
      },
    },
  },
});
