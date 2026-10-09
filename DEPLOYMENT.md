# Hostinger deployment and GoDaddy domain

This project was not deployable as a working full-stack application by uploading the original frontend folder alone. It now has a root Express entry point and a single reproducible workspace build. Account setup and live-service verification are still required.

## Hosting requirements

Use a Hostinger plan with **Node.js web apps**. Hostinger's current documentation lists Business and Cloud support, and Node.js 24 is supported. Confirm the exact purchased plan in hPanel. If your plan has only static/PHP hosting, the website/admin can be uploaded as static files, but the Express backend must run on a separate Node.js host or VPS. Do not upload backend source or `.env` into `public_html`.

Recommended combined layout:

| URL | Service |
| --- | --- |
| `https://your-domain.com/` | Public React website |
| `https://your-domain.com/admin/login` | Lead management admin |
| `https://your-domain.com/api` | Express API |
| Hostinger MySQL | Production database for all modules |
| Cloudinary | Durable media if uploads are later enabled |

The backend now uses MySQL. Use the new MySQL release archive; the earlier MongoDB archive is obsolete. See [DATABASE.md](DATABASE.md) for database setup and importing any existing data.

## 1. Configure Hostinger MySQL and the admin

1. In hPanel, open **Websites → Dashboard → Databases → Management**. Create a dedicated database and user. Save the exact database name, username (including account prefixes), password, host and port. Hostinger documents `localhost` as the usual same-host address; use the value provided for your app.
2. Add `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` and `DB_POOL_SIZE=5` in the Node.js application's Environment Variables. Remove the old `MONGODB_URI`. Keep credentials private and out of `VITE_*` variables. Confirm TLS requirements if using a remote database.
3. If starting with an empty database, set `DB_AUTO_MIGRATE=true`, `BOOTSTRAP_ADMIN=true`, `ADMIN_EMAIL`, `ADMIN_NAME`, and a unique `ADMIN_PASSWORD` of at least 12 characters (maximum 72 UTF-8 bytes) for the first deployment. Startup creates the SQL tables and admin before accepting traffic. It never resets an existing admin.
4. After verifying login, set both `DB_AUTO_MIGRATE` and `BOOTSTRAP_ADMIN` to `false`, remove `ADMIN_PASSWORD`, and restart. Use **Profile → Change password** to rotate an existing password. If you have terminal/database access, explicit alternatives are `npm run db:migrate` and `npm run seed:admin`.
5. If MongoDB contains real records, back it up and follow the dry-run import process in [DATABASE.md](DATABASE.md) before creating a new admin or switching traffic. Do not discard the old database.
6. Enable scheduled MySQL backups and verify restoration. Keep a prelaunch backup of any existing data.

## 2. Deploy the combined Node.js app

In hPanel, select **Websites → Add Website → Deploy Web App**. Use GitHub or upload a ZIP made from the contents of the generated `release/hostinger-...` folder (package.json must be at the archive root). Use the project root rather than `frontend/` or `backend/` as the app directory.

| Setting | Value |
| --- | --- |
| Framework | Express.js (or Other if auto-detection requires manual settings) |
| Node version | 24.x |
| Install | `npm ci` (production-only installs with `--omit=dev` also support building) |
| Build | `npm run build` |
| Start | `npm start` |
| Entry point, if requested | `server.js` |
| Static files | Served by Express from `frontend/dist` and `admin/dist`; do not set the app root to `frontend/dist` |

Use Hostinger's provided runtime port if one is injected. The code reads `PORT` and binds to `0.0.0.0`. hPanel settings differ by detected framework; check the deployment logs to confirm the build and start commands actually ran. Do not replace Hostinger's managed routing `.htaccess` with a frontend-only rewrite.

Set environment variables **before building**:

```dotenv
NODE_ENV=production
TZ=Asia/Kolkata
SERVE_STATIC=true
TRUST_PROXY=1
PUBLIC_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com,https://www.your-domain.com
VITE_SITE_URL=https://your-domain.com
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_hpanel_database_name
DB_USER=your_hpanel_database_user
DB_PASSWORD=your_real_database_password
DB_POOL_SIZE=5
DB_SSL=false
# Empty database: enable these only for the first successful deployment.
DB_AUTO_MIGRATE=true
BOOTSTRAP_ADMIN=true
ADMIN_NAME=Super Admin
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_unique_admin_password
JWT_SECRET=your-unique-random-secret
JWT_EXPIRES_IN=8h
```

Generate the JWT secret locally with:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Leave `VITE_API_BASE_URL` unset for this combined layout; both apps use `/api`. Only variables prefixed with `VITE_` are browser-visible, so never prefix secrets with `VITE_`. `VITE_SITE_URL` is embedded at build time; runtime edits require rebuilding. Set `PUBLIC_URL` and `VITE_SITE_URL` to the chosen canonical domain; configure its alternate `www`/apex domain to redirect to it in Hostinger.

If media uploads are enabled in a future CMS rollout, also provide all three `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Production refuses local disk uploads because Hostinger deployment directories are replaced on redeploy. Lead submission itself does not require Cloudinary. Uploaded files already stored locally need a migration and backup before redeployment.

The complete public website ships its own content and jobs. `VITE_ENABLE_CONTENT_API` should remain unset for this release; the dormant CMS API/UI is not a published content-management workflow.

## 3. Point your GoDaddy domain

Keep domain registration at GoDaddy; transferring the domain is unnecessary. Add the domain to the Hostinger Node.js app and follow the DNS targets shown by hPanel for **that app**.

Two choices:

1. **Keep DNS at GoDaddy:** preferred if existing email is already configured. In GoDaddy Domain Portfolio → domain → DNS, set only the website records that Hostinger instructs you to set. If Hostinger supplies an IP, set the `@` A record to that IP and the `www` CNAME to the canonical target it supplies. If it supplies other record types/targets for the Node.js app, use those exact values instead. Remove conflicting website A/AAAA records only after verifying their purpose. Preserve MX, SPF, DKIM, DMARC and verification records.
2. **Move DNS to Hostinger:** first recreate existing email and verification records in the Hostinger DNS zone, then change the domain's nameservers in GoDaddy to the exact nameservers displayed by hPanel. This changes DNS management, not ownership. Do not guess nameserver values.

Hostinger documents up to 24 hours for DNS propagation. Enable SSL and force HTTPS for both the canonical and alternate domain in hPanel after DNS is connected. Check existing domain forwarding and email before switching.

## 4. Verify before launch

- Confirm `/api/health` responds **200** with `status: ok` (database connected). **503** means database unavailable; `/api/health/live` checks only the process.
- Open and refresh `/about`, `/brands`, `/gallery`, `/awards`, `/careers`, `/contact`, `/franchise-enquiry`, `/admin/login`, and `/admin/leads` directly. Confirm there are no missing assets or localhost requests.
- Submit a real contact enquiry, a franchise enquiry and a career application; verify all three appear in the admin and database. Verify validation errors, rate-limit messages and loading buttons.
- Log in, update a lead's status, save a note, assign it, set/clear follow-up, and reload to confirm persistence. Verify pagination. CSV export is explicitly **the current page**.
- Logout invalidates all tokens for that admin. Confirm a saved old token cannot call protected endpoints. Sessions are stored in browser session storage and expire after the configured JWT period.
- Confirm `/api/unknown` stays a JSON 404; `/.env` and source paths are inaccessible; `/admin` has `noindex`; unknown pages return 404.
- Rebuild with your final domain and check `/robots.txt` and `/sitemap.xml`; HTTPS builds generate a domain-correct sitemap. Client-rendered page metadata is present after JavaScript runs; crawler/social preview prerendering has not been added. `VITE_OG_IMAGE_URL` is optional and must point to a real public image if used.
- Check desktop/mobile rendering, SSL, canonical redirects, monitoring and backup restoration. Keep the previous deployment for rollback; document any data changes before restoring it.

## Static hosting fallback

If your purchased plan lacks Node.js apps: deploy the API on a Node.js server (Hostinger VPS or another provider) with `SERVE_STATIC=false`. Build both apps with `VITE_API_BASE_URL=https://api.your-domain.com/api`, `VITE_SITE_URL=https://your-domain.com`, and allow the public domain in backend `CLIENT_URL`. Upload only `frontend/dist` contents to `public_html` and `admin/dist` contents to `public_html/admin`. Configure HTTPS on the API too.

This split deployment needs SPA rewrites on the static host for both `/admin/*` and public routes; a sample is provided in `hosting/static.htaccess`. Copy it to `public_html/.htaccess` **only for this static fallback**, not Hostinger's managed Node.js app. Security headers/caching and domain-specific CSP for split hosting must also be configured in the hosting panel; the combined server already provides them.

## Evidence and limitations

Local automated checks cover environment validation, builds, SPA routing/assets, response headers, CORS, authentication/revocation, enquiry field restrictions, body limits, CSV formula handling and rate limits. A separate real-database integration suite verifies SQL schema/imports, storage writes, authentication, all module CRUD, relationships, concurrency and reconnect persistence against an isolated local MariaDB 10.4.32 instance. See [DATABASE.md](DATABASE.md). These checks do not verify your Hostinger MySQL service, Cloudinary, live routing, DNS, SSL, email delivery or live backups. Enquiries are stored for the admin; this release does not send notification emails. Rate limits use process memory and are intended for one server process; use a shared limiter store before scaling to multiple processes/instances.

Official documentation checked for this setup:

- [Hostinger Node.js deployment](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Hostinger Node.js hosting options](https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/)
- [Hostinger MySQL with Node.js](https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/)
- [Hostinger external domains](https://www.hostinger.com/support/1583408-can-external-domains-be-hosted-at-hostinger/)
- [GoDaddy website A records](https://www.godaddy.com/help/add-or-edit-an-a-record-42545)
