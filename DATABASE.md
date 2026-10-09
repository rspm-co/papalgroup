# MySQL database setup and migration

The application now uses `mysql2` prepared statements and InnoDB tables for all nine modules: `users`, `leads`, `media`, `brands`, `awards`, `careers`, `gallery`, `homepages`, and `settings`. There is no MongoDB connection, Mongoose dependency, or MongoDB fallback. The frontend API contract and opaque 24-character IDs are preserved.

Top-level properties are SQL columns with indexes, unique email/slug constraints, and foreign keys for direct references. Nested content, attachments, media lists and notes use JSON columns. Application validation checks their structure; JSON references are resolved in batches. Lead updates and password/session changes use transactions and row locks. Dates use UTC `DATETIME(3)` storage; `TZ=Asia/Kolkata` controls business-day filters and dashboard counts. Use one consistent timezone on all app instances.

## Connection settings

Copy `.env.example` to `.env` for local use, or use hPanel Environment Variables:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_POOL_SIZE=5
DB_SSL=false
DB_AUTO_MIGRATE=false
BOOTSTRAP_ADMIN=false
```

Use the exact host/database/user values from hPanel, including account prefixes. Production requires explicit database credentials and a dedicated user; `root` is rejected. Do not put credentials in `VITE_*` variables. Remove the old `MONGODB_URI`, or startup will fail with a configuration error.

For a database reached over a public network, use `DB_SSL=true` and the provider's trusted PEM CA in `DB_SSL_CA` if required. Certificates must validate; this app does not disable certificate verification. Hostinger's same-host database may use `DB_SSL=false`; confirm the database host and TLS requirements with hPanel. A database host of `localhost` on your computer means your computer, not Hostinger.

## Create the schema

Create an empty database first. The app creates tables, not the database or database users.

```sh
npm run db:migrate
npm run db:check
```

The initial schema is `backend/migrations/001_initial.sql`. The migration runner records its SHA-256 checksum in `schema_migrations`, uses an advisory lock, and can retry an interrupted initial setup. MySQL DDL commits implicitly. Do not change this file after it has been applied; future changes need new versioned migrations and runner entries. Do not manually import only the table SQL and omit the migration ledger.

For managed hosting without a terminal, set `DB_AUTO_MIGRATE=true` for the first deployment. Startup applies the same migration before accepting HTTP traffic. After the first successful deployment, set it to `false` and restart. The database setup user needs `CREATE`, `INDEX`, `REFERENCES`, `SELECT`, `INSERT`, `UPDATE` and `DELETE` rights on this application's database. A restricted runtime user can use only `SELECT`, `INSERT`, `UPDATE` and `DELETE` after setup; keep migrations off with that user.

## Create the admin

For local setup or an authorized remote connection:

1. Set `ADMIN_EMAIL`, `ADMIN_NAME`, and a unique `ADMIN_PASSWORD` of 12 or more characters, at most 72 UTF-8 bytes.
2. Run `npm run seed:admin` after schema setup.
3. Remove `ADMIN_PASSWORD` afterward.

Alternatively, for Hostinger's first deployment only, set `BOOTSTRAP_ADMIN=true` with the same `ADMIN_*` variables. Startup creates the account after connecting and migrating. After confirming login, set `BOOTSTRAP_ADMIN=false`, remove `ADMIN_PASSWORD`, and restart. An existing account is never overwritten or reset. Change existing passwords through Profile → Change password.

## Preserve existing MongoDB data

Changing application code does not move an existing database. No existing MongoDB or Hostinger database was modified by this conversion. If there are real records, take a full backup and stop writes to the old app before exporting and switching. Keep the old application and backup available for rollback. Restoring old code alone will not copy new MySQL leads back to MongoDB.

1. Export each needed collection using MongoDB Compass or `mongoexport --jsonArray`. Include original IDs, timestamps, complete arrays and original bcrypt password hashes. These are private files: keep them outside uploaded source and source control.
2. Combine exports into one JSON object. Accepted names are `users` or `authusers`, `leads`, `media`, `brands`, `awards`, `careers`, `gallery` or `galleries`, `homepages`, and `settings`. Each value is an array. Do not supply both aliases of one table. Include every referenced user, brand and media record.

```json
{
  "authusers": [],
  "media": [],
  "brands": [],
  "awards": [],
  "careers": [],
  "galleries": [],
  "homepages": [],
  "settings": [],
  "leads": []
}
```

3. Point `DB_*` to a **new empty MySQL database**, run `npm run db:migrate`, and keep the app stopped. Do not bootstrap an admin before importing users.
4. Run a dry run, which performs SQL inserts and validation in a transaction and rolls everything back:

```sh
npm run db:import -- path/to/private-export.json
```

5. Resolve validation or missing-reference errors. When the dry run passes, commit:

```sh
npm run db:import -- path/to/private-export.json --apply
```

The importer accepts Extended JSON `$oid`, `$date` and numeric wrappers, preserves IDs and timestamps, keeps bcrypt hashes, increments user token versions to invalidate old sessions, checks references and refuses nonempty application tables. An insertion failure rolls back the entire import. It never overwrites records. Rotate `JWT_SECRET` during the switch and verify row counts, notes, relationships, login, and sample enquiries before enabling traffic. Store backups and exports securely; do not upload them with the website.

If there is no existing data, skip this import and create a new admin normally.

## Real SQL integration verification

Run against a disposable **local** MySQL-compatible server whose test user may create/drop databases. The test ignores the application's database name and generates its own `papal_test_<random>` database. It refuses non-loopback database hosts and removes only that generated database afterward.

PowerShell example:

```powershell
$env:RUN_MYSQL_TESTS='true'
$env:MYSQL_TEST_HOST='127.0.0.1'
$env:MYSQL_TEST_PORT='3306'
$env:MYSQL_TEST_USER='your_local_test_user'
$env:MYSQL_TEST_PASSWORD='your_local_test_password'
npm run test:integration
```

Verification for this change used an isolated local MariaDB 10.4.32 instance through the MySQL protocol, with separate workspace test data. It covered migration idempotence, legacy import dry runs/rollback, unique constraints, bcrypt authentication, public enquiries, Unicode, dashboard counts, SQL injection/wildcard handling, date filters, global priority pagination, concurrent notes, assignments, password rotation, token revocation, all content-module CRUD/JSON/relations, reconnect persistence and soft deletion. Hostinger's actual MySQL version, network access and credentials still require a live deployment smoke test.
