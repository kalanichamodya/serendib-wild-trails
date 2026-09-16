# Serendib Wild Trails

Three independently run applications:

| Application | Local URL | Purpose |
| --- | --- | --- |
| website-frontend | http://localhost:3000 | Public Next.js website and booking requests |
| admin-frontend | http://localhost:3001 | Next.js staff login, dashboard and bookings |
| backend | http://localhost:5000 | Express API and MongoDB persistence |

## Setup

Install Node.js 22.13+ and run a local MongoDB instance (or supply an Atlas URI). Run these commands from the repository root. On Windows PowerShell use `npm.cmd` if script execution is disabled.

```sh
npm install --prefix backend
npm install --prefix website-frontend
npm install --prefix admin-frontend
```

Copy `backend/.env.example` to `backend/.env`. Copy each frontend's `.env.example` to its `.env.local`. Set `MONGODB_URI`, two different JWT secrets of at least 32 characters, and your own `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (at least 8 characters). Generate each JWT secret separately with:

```sh
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

For local MongoDB, install MongoDB Community Server and start its MongoDB service. The default URI is `mongodb://127.0.0.1:27017/serendib`; MongoDB Compass alone is a client and does not start a database server. Alternatively, use your MongoDB Atlas connection URI, with your database user credentials and network access configured for this machine. Keep that URI in `backend/.env` only.

For a new checkout, PowerShell can create missing environment files without overwriting existing settings:

```powershell
if (!(Test-Path backend/.env)) { Copy-Item backend/.env.example backend/.env }
if (!(Test-Path website-frontend/.env.local)) { Copy-Item website-frontend/.env.example website-frontend/.env.local }
if (!(Test-Path admin-frontend/.env.local)) { Copy-Item admin-frontend/.env.example admin-frontend/.env.local }
```

Seed the administrator once:

```sh
npm run seed:admin --prefix backend
```

Start each service in its own terminal:

```sh
npm run dev --prefix backend
npm run dev --prefix website-frontend
npm run dev --prefix admin-frontend
```

Open the website at port 3000 and staff login at `http://localhost:3001/login`. Public pages have no Redux or authentication requests. The admin app keeps access tokens in Redux memory and rotates its httpOnly refresh cookie through one shared refresh operation. Sign out clears local auth even if the API is unavailable; only a non-sensitive signed-out flag is persisted to prevent a surviving cookie from restoring that session.

## Checks

Application source in all three projects uses TypeScript with strict checking. Both ESLint configurations also use TypeScript. Static website PostCSS settings live in the `postcss` section of `website-frontend/package.json`, without a JavaScript loader. The backend runs `server.ts` with `tsx` in development; `npm start --prefix backend` builds and runs `dist/server.js` for production.

```sh
npm run typecheck --prefix backend
npm run build --prefix backend
npm run typecheck --prefix website-frontend
npm run lint --prefix website-frontend
npm run build --prefix website-frontend
npm run typecheck --prefix admin-frontend
npm run lint --prefix admin-frontend
npm run build --prefix admin-frontend
```

For a full local smoke check, submit a booking on the website, sign in to the admin app, confirm it appears in the dashboard and booking list, change its status and sign out.

## Configuration and content

- Both frontends use `NEXT_PUBLIC_API_URL`. Set it before building. Backend `FRONTEND_URLS` contains the comma-separated allowed website and admin origins.
- Update safari and destination content in `website-frontend/lib/content/`. The home cards, list and detail pages use those sources.
- Contact details live in `website-frontend/lib/site.ts`; the existing primary number is used for phone and WhatsApp. WhatsApp is available from the Contact section.
- Booking dates use the Sri Lankan calendar date. Requests allow 1–30 guests, listed destinations, valid email and phone, and a message up to 1000 characters.
- Login is limited to 5 attempts per IP per 15 minutes; public booking creation to 8 requests. The default limiter is process-local. Multiple API instances require a shared limiter store. Configure trusted proxy hops explicitly for your hosting topology before using forwarded client IPs.
- In production use HTTPS. The existing refresh cookie remains httpOnly, secure in production, and restricted to `/api/auth`. Cross-site cookie restrictions depend on the browser and deployment domains.
- Keep real `.env` files and passwords out of version control. Startup validates MongoDB configuration and JWT secrets before connecting.

No public deployment is performed by these changes.
