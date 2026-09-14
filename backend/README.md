# Portfolio API

FastAPI backend for the portfolio site: projects, blogs, testimonials and clients.
Public reads are open; every write requires a JWT.

Stack: FastAPI · SQLAlchemy 2 (async) · Postgres (Neon) · Cloudinary · Render.

## Endpoints

Interactive docs are at `/docs` once running.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | — | Exchange username + password for a token |
| `GET` | `/api/auth/me` | ✅ | Current admin |
| `POST` | `/api/auth/change-password` | ✅ | Rotate the password |
| `GET` | `/api/{resource}` | — | Published rows, ordered |
| `GET` | `/api/{resource}/{id}` | — | One published row |
| `GET` | `/api/{resource}/admin/all` | ✅ | Every row, drafts included |
| `POST` | `/api/{resource}` | ✅ | Create |
| `PUT` | `/api/{resource}/{id}` | ✅ | Partial update |
| `DELETE` | `/api/{resource}/{id}` | ✅ | Delete |
| `POST` | `/api/{resource}/reorder` | ✅ | Bulk reorder |
| `POST` | `/api/uploads/image` | ✅ | Upload to Cloudinary, returns a CDN URL |
| `GET` | `/health` | — | Liveness probe |

`{resource}` is one of `projects`, `blogs`, `testimonials`, `clients`.

Responses are camelCase (`fullDescription`, `techStack`) so the React components
consume them without a mapping layer.

### Drafts

`published: false` hides a row from every public endpoint — it is visible only
through `/admin/all`. Use it to stage a post before it goes live.

## Run locally

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt aiosqlite
cp .env.example .env          # defaults to local SQLite
uvicorn app.main:app --reload --port 8000
```

Then point the frontend at it: `VITE_API_URL=http://127.0.0.1:8000` in the
project-root `.env`.

## Deploy

### 1. Database — Neon

1. Create a project at <https://neon.tech> (free, no card).
2. Copy the connection string from **Connection Details**.

### 2. Images — Cloudinary

1. Sign up at <https://cloudinary.com> (free tier, no card).
2. From the dashboard copy **Cloud name**, **API Key**, **API Secret**.

Skip this and the API still runs — only `/api/uploads/image` returns 503, and the
admin forms still accept pasted image URLs.

### 3. API — Render

1. Push this repo to GitHub.
2. Render → **New** → **Blueprint** → select the repo. `render.yaml` is detected
   automatically.
3. Fill in the prompted values: `DATABASE_URL`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD`, and the three Cloudinary keys. `JWT_SECRET` is generated.
4. Deploy, then confirm `https://<your-service>.onrender.com/health` returns
   `{"status":"ok"}`.

Tables are created on first boot and the admin user is seeded from
`ADMIN_USERNAME` / `ADMIN_PASSWORD`.

### 4. Point the frontend at it

In the project-root `.env`:

```
VITE_API_URL=https://<your-service>.onrender.com
```

Then `npm run deploy`.

## Operational notes

**Cold starts.** Render's free tier sleeps after 15 minutes idle and takes ~50s
to wake. The frontend renders its bundled static content immediately and swaps in
API data when it arrives, so the public site never blocks on a sleeping backend —
but the first admin login after a lull will be slow. A cron ping to `/health`
every 10 minutes keeps it warm if that matters.

**Changing the admin password.** `ADMIN_USERNAME`/`ADMIN_PASSWORD` seed the
account only when the table is empty. After that, rotate via
`POST /api/auth/change-password`; editing the env vars does nothing.

**Schema changes.** `Base.metadata.create_all` creates missing tables but never
alters existing ones. Adding a column to a live database means either a manual
`ALTER TABLE` or introducing Alembic.
