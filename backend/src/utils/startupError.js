const hints = {
  ER_BAD_DB_ERROR: 'The DB_NAME database does not exist. Create it in MySQL/phpMyAdmin, then run npm run db:migrate.',
  ECONNREFUSED: 'MySQL is not accepting connections. Start MySQL and check DB_HOST and DB_PORT.',
  ETIMEDOUT: 'MySQL connection timed out. Check DB_HOST, DB_PORT and database network access.',
  ENOTFOUND: 'The database hostname could not be resolved. Check DB_HOST.',
  ER_ACCESS_DENIED_ERROR: 'MySQL rejected the credentials. Check DB_USER and DB_PASSWORD.',
  ER_DBACCESS_DENIED_ERROR: 'The database user cannot access DB_NAME. Assign the user to this database.',
  ER_TABLEACCESS_DENIED_ERROR: 'The database user lacks required table permissions. Check its database grants.',
  ER_NO_SUCH_TABLE: 'Database tables are missing. Run npm run db:migrate.',
  SCHEMA_MISSING: 'MySQL schema is missing. Run npm run db:migrate or enable DB_AUTO_MIGRATE=true for the first deployment.',
  SCHEMA_MISMATCH: 'Database migration checksum mismatch. Restore the original applied migration; do not delete live tables.',
  EADDRINUSE: 'The HTTP port is already in use. Stop the other backend process or change PORT.',
  ADMIN_CONFIGURATION: 'Admin setup is incomplete. Set a valid ADMIN_EMAIL and a unique ADMIN_PASSWORD (12 characters minimum, 72 UTF-8 bytes maximum).',
  HANDSHAKE_SSL_ERROR: 'Database TLS negotiation failed. Check DB_SSL and the provider certificate requirements.',
  SELF_SIGNED_CERT_IN_CHAIN: 'Database TLS certificate is not trusted. Configure the provider CA using DB_SSL_CA.',
}

// Do not log raw driver messages: they may include SQL, credentials or personal data.
export const describeStartupError = error => {
  const nestedCode = error?.errors?.find(item => hints[item.code])?.code
  const code = hints[error?.code] ? error.code : nestedCode
  return code ? `[${code}] ${hints[code]}` : 'Startup failed. Run npm run db:check to verify database configuration and schema; check admin and static build setup.'
}
