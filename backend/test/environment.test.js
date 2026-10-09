import test from 'node:test'
import assert from 'node:assert/strict'
import { validateEnvironment } from '../src/config/environment.js'
import { escapeLike, compileFilters } from '../src/database/repository.js'
import { getCsvValue } from '../../admin/src/constants/leads.js'

const production = { NODE_ENV: 'production', DB_HOST: '127.0.0.1', DB_USER: 'test_user', DB_PASSWORD: 'test-only', DB_NAME: 'papal_unit_test', JWT_SECRET: 'a'.repeat(96), PUBLIC_URL: 'https://example.com', CLIENT_URL: 'https://www.example.com,https://example.com' }
test('production requires explicit database, secret and public domain', () => {
  for (const key of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET', 'PUBLIC_URL']) {
    const source = { ...production }; delete source[key]
    assert.throws(() => validateEnvironment(source))
  }
})
test('rejects unsafe production configuration', () => {
  for (const override of [{ JWT_SECRET: 'development-only-secret' }, { PUBLIC_URL: 'http://example.com' }, { CLIENT_URL: '*' }, { PUBLIC_URL: 'https://localhost' }, { PUBLIC_URL: 'https://example.com/api' }, { PORT: '5000oops' }, { TRUST_PROXY: 'true' }, { CLOUDINARY_API_KEY: 'partial' }, { DB_USER:'root' }, { DB_PORT:'3306oops' }, { DB_NAME:'db;DROP TABLE users' }, { DB_POOL_SIZE:'1000' }, { DB_SSL:'yes' }, { DB_SSL_CA:'ca-without-tls' }, { DB_AUTO_MIGRATE:'yes' }, { BOOTSTRAP_ADMIN:'yes' }, { MONGODB_URI:'mongodb://localhost/old' }]) assert.throws(() => validateEnvironment({ ...production, ...override }))
})
test('supports a comma-separated exact origin allowlist', () => {
  const config = validateEnvironment(production)
  assert.deepEqual([...config.allowedOrigins], ['https://example.com', 'https://www.example.com'])
  assert.equal(config.serveStatic, true)
  assert.equal(config.jwtExpiresIn, '8h')
})
test('SQL search escapes wildcards and keeps values outside SQL', () => {
  assert.equal(escapeLike('a%b_c!'), 'a!%b!_c!!')
  const values = []
  const sql = compileFilters({ fields: { name: { type: 'String' } } }, { name: { contains: "x%' OR 1=1 --" } }, values)
  assert.ok(!sql.includes('OR 1=1'))
  assert.deepEqual(values, ["%x!%' OR 1=1 --%"])
  assert.throws(() => compileFilters({fields:{}}, {'name; DROP TABLE users': 'x'}, []))
})
test('CSV exports neutralize formulas and escape quotation marks', () => {
  assert.equal(getCsvValue('=HYPERLINK("evil")'), '"\'=HYPERLINK(""evil"")"')
  assert.equal(getCsvValue('Alice'), '"Alice"')
  assert.equal(getCsvValue('+919876543210'), '"\'+919876543210"')
})
