# R S PAPAL GROUP

React public website, React lead-management admin, and Express/MySQL API. Node.js 24 is required. Use the repository-root package.json and package-lock.json; the project is managed as npm workspaces. MongoDB/Mongoose is no longer a runtime dependency.

## Local setup

```sh
npm ci
```

Create an empty MySQL 8+ or MariaDB 10.4+ database using your database administration tool. Copy `.env.example` to `.env`, set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` and a unique JWT secret. Never commit `.env` or paste credentials into chat. Initialize the schema and admin:

```sh
npm run db:migrate
npm run seed:admin
```

Seeding requires your own `ADMIN_EMAIL` and `ADMIN_PASSWORD`; no default password is provided. Remove the password afterward. Run these in separate terminals:

```sh
npm run dev --workspace backend
npm run dev --workspace frontend
npm run dev --workspace admin
```

The website runs at `http://localhost:5173`; admin at `http://localhost:5174/admin/`. Both proxy `/api` to the backend on port 5000. The public pages use the complete bundled content. The admin provides Dashboard, Leads and Profile; dormant CMS components are not exposed as admin routes. Set `VITE_ENABLE_CONTENT_API=true` only after implementing and verifying the matching public content contract; configuring an API URL alone does not replace bundled content.

## Production commands

```sh
npm run check
npm run db:check
npm start
```

`check` runs frontend ESLint, production builds, and backend configuration/security/hosting tests with mocked repositories. `test:integration` separately runs real SQL persistence tests against an explicitly enabled, isolated local database server; it creates and drops only its own randomly named database. See [DATABASE.md](DATABASE.md) for the command and coverage. No automated test targets your Hostinger database.

`db:migrate` applies the checked-in, versioned SQL schema; `db:check` verifies database connectivity and migration checksums. Schema setup is explicit unless `DB_AUTO_MIGRATE=true` is enabled for an initial deployment. Never edit an already applied migration. Existing MongoDB records can be transferred using the dry-run-first `db:import` command described in [DATABASE.md](DATABASE.md).

For the combined production server, set `NODE_ENV=production`, `SERVE_STATIC=true`, `PUBLIC_URL` to the real HTTPS domain, and production database/JWT values. Visit `/`, `/admin/login` and `/api/health`. All tools required by the frontend/admin builds are regular dependencies, so `npm ci --omit=dev` followed by `npm run build` works on hosts that omit development dependencies. Lint and the full `check`/`release` workflow still require `npm ci --include=dev`. Do not deploy Vite's development server or preview server.

`npm run release` runs checks and creates a timestamped, allowlisted upload folder under `release/`, excluding secrets and installed dependencies. It includes source and prebuilt static files. Domain settings must be provided at build time for canonical URLs and sitemap generation. See [DEPLOYMENT.md](DEPLOYMENT.md) for Hostinger and GoDaddy instructions and release limitations.
