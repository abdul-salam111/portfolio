# Portfolio API (Neon Functions)

Hono app deployed onto the Neon `production` branch, next to the database.

- **URL:** https://br-tiny-queen-b5o3dvxd-api.compute.c-7.us-east-2.aws.neon.tech
- **Runtime:** Node.js 24 (Neon Functions, public beta)
- **Deploy:** `neon deploy --env .env`
- **Logs:** `neon logs query --branch production --source function --since 1h`

## Routes

Public reads; every write needs `Authorization: Bearer <token>`.

| Method | Path | Auth |
|---|---|---|
| `POST` | `/api/auth/login` | — |
| `GET` | `/api/auth/me` | ✅ |
| `POST` | `/api/auth/change-password` | ✅ |
| `GET` | `/api/{resource}` | — (published only) |
| `GET` | `/api/{resource}/{id}` | — (published only) |
| `GET` | `/api/{resource}/admin/all` | ✅ (drafts included) |
| `POST` `PUT` `DELETE` | `/api/{resource}[/{id}]` | ✅ |
| `POST` | `/api/{resource}/reorder` | ✅ |
| `POST` | `/api/uploads/image` | ✅ |
| `GET` | `/api/images/{bucket}/{key}` | — |
| `GET` | `/health` | — |

`{resource}` is `projects`, `blogs`, `testimonials` or `clients`.

## Notes

- **camelCase over the wire.** Columns are snake_case; `rowToApi` converts on the
  way out so the React components consume responses unchanged.
- **Writes are column-whitelisted** per resource in `crud.ts`. Unknown keys are
  dropped rather than rejected, so older clients sending stale fields still work.
- **Drafts.** `published: false` hides a row from every public route; it is
  reachable only through `/admin/all`.
- **Images** go to the branch's private object storage and are served back
  through `/api/images/...`, so URLs are stable instead of expiring presigned links.
- **Schema changes** are manual SQL — there is no migration tool wired up yet.
