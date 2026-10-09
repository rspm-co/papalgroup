import { after, before, test, mock } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'

Object.assign(process.env, { NODE_ENV: 'production', TZ: 'Asia/Kolkata', SERVE_STATIC: 'true', PUBLIC_URL: 'https://example.com', CLIENT_URL: 'https://www.example.com', JWT_SECRET: 'b'.repeat(96), DB_HOST: '127.0.0.1', DB_USER: 'test_user', DB_PASSWORD: 'test-only', DB_NAME: 'papal_unit_test' })
const { default: app } = await import('../src/app.js')
const { default: Lead } = await import('../src/modules/leads/lead.model.js')
const { default: AuthUser } = await import('../src/modules/auth/auth.model.js')
const { hashPassword, createToken } = await import('../src/modules/auth/auth.service.js')
let server, base
const user = { _id: '507f1f77bcf86cd799439011', name: 'Test admin', email: 'admin@example.com', role: 'SUPER_ADMIN', isActive: true, tokenVersion: 0 }
before(async () => {
  user.password = await hashPassword('Secure-test-password-123')
  mock.method(AuthUser, 'findOne', () => ({ includeSecrets: async () => user }))
  mock.method(AuthUser, 'findById', () => ({ includeSecrets: async () => user }))
  mock.method(AuthUser, 'updateById', (_id, patch) => {
    const result = Promise.resolve().then(async () => { Object.assign(user, await patch(user)); return user })
    result.includeSecrets = () => result
    return result
  })
  server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => { mock.restoreAll(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)) })
const request = (route, options) => fetch(base + route, options)
const post = (route, body, headers = {}) => request(route, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })

test('serves public and admin deep links with safe browser headers', async () => {
  for (const route of ['/', '/about', '/contact', '/franchise-enquiry', '/admin/login', '/admin/dashboard', '/admin/leads']) {
    const response = await request(route)
    assert.equal(response.status, 200, route)
    assert.match(response.headers.get('content-type'), /text\/html/)
    assert.match(response.headers.get('content-security-policy'), /script-src 'self'/)
    assert.equal(response.headers.get('x-powered-by'), null)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    if (route.startsWith('/admin')) { assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow'); assert.match(await response.text(), /\/admin\/assets\//) }
  }
})
test('hashed assets are cacheable and missing assets, secrets, API paths and pages are 404', async () => {
  const index = await readFile(new URL('../../frontend/dist/index.html', import.meta.url), 'utf8')
  const asset = index.match(/src="(\/assets\/[^" ]+\.js)"/)[1]
  assert.match((await request(asset)).headers.get('cache-control'), /immutable/)
  for (const route of ['/assets/missing.js', '/.env', '/backend/src/server.js', '/does-not-exist', '/admin/does-not-exist', '/api/does-not-exist', '/apiary']) assert.equal((await request(route)).status, 404, route)
  assert.match((await request('/api/does-not-exist')).headers.get('content-type'), /json/)
})
test('readiness reflects unavailable database and liveness remains available', async () => {
  assert.equal((await request('/api/health')).status, 503)
  assert.equal((await request('/api/health/live')).status, 200)
})
test('CORS allows configured domains and rejects other origins', async () => {
  const allowed = await request('/api/health/live', { headers: { Origin: 'https://www.example.com' } })
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'https://www.example.com')
  assert.equal((await request('/api/health/live', { headers: { Origin: 'https://evil.example' } })).status, 403)
})
test('malformed and oversized JSON produce client errors without leaked details', async () => {
  const malformed = await request('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' })
  assert.equal(malformed.status, 400)
  assert.equal((await malformed.json()).details, null)
  assert.equal((await post('/api/leads', { message: 'x'.repeat(1024 * 1024 + 1) })).status, 413)
})
test('public enquiries cannot set status, notes, assignments or deletion flags', async () => {
  let saved
  mock.method(Lead, 'create', async payload => { saved = payload; return { ...payload, _id: '507f1f77bcf86cd799439012' } })
  const response = await post('/api/leads', { leadType: 'Contact', fullName: 'Visitor', email: 'visitor@example.com', phone: '+919876543210', subject: 'Enquiry', message: 'Please contact me', status: 'Won', isDeleted: true, internalNotes: [{ note: 'injected' }], assignedTo: user._id })
  assert.equal(response.status, 201)
  for (const field of ['status', 'isDeleted', 'internalNotes', 'assignedTo']) assert.equal(saved[field], undefined)
  assert.deepEqual((await response.json()).data, { id: '507f1f77bcf86cd799439012' })
})
test('invalid enquiries are rejected before database writes', async () => {
  assert.equal((await post('/api/leads', { leadType: 'Contact', fullName: 'Visitor', email: 'invalid', phone: 'bad', subject: 'Enquiry', message: 'Hi' })).status, 400)
})
test('admin routes reject anonymous and invalid-token requests', async () => {
  for (const route of ['/api/admin/leads', '/api/admin/dashboard', '/api/auth/profile']) assert.equal((await request(route)).status, 401)
  assert.equal((await request('/api/auth/profile', { headers: { Authorization: 'Bearer invalid' } })).status, 401)
})
test('login succeeds, logout invalidates the previously issued token', async () => {
  const response = await post('/api/auth/login', { email: user.email, password: 'Secure-test-password-123' })
  assert.equal(response.status, 200)
  const { token } = (await response.json()).data
  const headers = { Authorization: `Bearer ${token}` }
  assert.equal((await request('/api/auth/profile', { headers })).status, 200)
  assert.equal((await post('/api/auth/logout', {}, headers)).status, 200)
  assert.equal((await request('/api/auth/profile', { headers })).status, 401)
})
test('CRM update appends validated notes and permits clearing follow-up date', async () => {
  let update
  mock.method(Lead, 'updateFirst', (_filter, payload) => { update = payload({ internalNotes: [] }); const result = Promise.resolve({ _id: '507f1f77bcf86cd799439012' }); result.withRelations = () => result; return result })
  const response = await request('/api/admin/leads/507f1f77bcf86cd799439012', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${createToken(user)}` }, body: JSON.stringify({ status: 'Contacted', note: 'Called customer', followUpDate: null, assignedTo: '', isDeleted: true }) })
  assert.equal(response.status, 200)
  assert.equal(update.followUpDate, null)
  assert.equal(update.assignedTo, null)
  assert.equal(update.internalNotes[0].note, 'Called customer')
  assert.equal(update.isDeleted, undefined)
})
test('password change rejects incorrect current passwords and invalidates other sessions', async () => {
  const oldToken = createToken(user)
  const change = body => request('/api/auth/password', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${oldToken}` }, body: JSON.stringify(body) })
  assert.equal((await change({ currentPassword: 'incorrect', newPassword: 'New-secure-password-456' })).status, 400)
  const response = await change({ currentPassword: 'Secure-test-password-123', newPassword: 'New-secure-password-456' })
  assert.equal(response.status, 200)
  const newToken = (await response.json()).data.token
  assert.equal((await request('/api/auth/profile', { headers: { Authorization: `Bearer ${oldToken}` } })).status, 401)
  assert.equal((await request('/api/auth/profile', { headers: { Authorization: `Bearer ${newToken}` } })).status, 200)
})
test('CRM filters use literal search, brand, owner and an inclusive final date', async () => {
  let query
  mock.method(Lead, 'find', filters => {
    query = filters
    const result = Promise.resolve([])
    for (const method of ['sort', 'skip', 'limit', 'withRelations']) result[method] = () => result
    return result
  })
  mock.method(Lead, 'count', async () => 0)
  const response = await request(`/api/admin/leads?search=a%2Bb&preferredBrand=Test&assignedTo=${user._id}&fromDate=2026-09-01&toDate=2026-09-30`, { headers: { Authorization: `Bearer ${createToken(user)}` } })
  assert.equal(response.status, 200)
  assert.equal(query.or[0].fullName.contains, 'a+b')
  assert.equal(query.preferredBrand, 'Test')
  assert.equal(query.assignedTo, user._id)
  assert.equal(query.createdAt.gte.toISOString(), '2026-08-31T18:30:00.000Z')
  assert.equal(query.createdAt.lte.toISOString(), '2026-09-30T18:29:59.999Z')
})
test('login and enquiry rate limits apply', async () => {
  let response
  for (let index = 0; index < 11; index += 1) response = await post('/api/auth/login', { email: 'invalid', password: 'short' })
  assert.equal(response.status, 429)
  for (let index = 0; index < 6; index += 1) response = await post('/api/leads', {})
  assert.equal(response.status, 429)
})
