import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { randomBytes } from 'node:crypto'
import mysql from 'mysql2/promise'

if (process.env.RUN_MYSQL_TESTS !== 'true') throw new Error('Set RUN_MYSQL_TESTS=true and MYSQL_TEST_HOST/PORT/USER/PASSWORD for an isolated local test server')
const host = process.env.MYSQL_TEST_HOST || '127.0.0.1'
if (!['127.0.0.1', 'localhost', '::1'].includes(host)) throw new Error('Integration tests require an isolated loopback database server')
const database = 'papal_test_' + randomBytes(8).toString('hex')
const connectionOptions = { host, port: Number(process.env.MYSQL_TEST_PORT || 3306), user: process.env.MYSQL_TEST_USER || 'root', password: process.env.MYSQL_TEST_PASSWORD || '' }
delete process.env.MONGODB_URI
Object.assign(process.env, { NODE_ENV: 'test', TZ: 'Asia/Kolkata', SERVE_STATIC: 'false', PUBLIC_URL: 'http://localhost:5000', CLIENT_URL: 'http://localhost:5173', JWT_SECRET: randomBytes(48).toString('hex'), DB_HOST: host, DB_PORT: String(connectionOptions.port), DB_USER: connectionOptions.user, DB_PASSWORD: connectionOptions.password, DB_NAME: database, DB_SSL: 'false', DB_AUTO_MIGRATE: 'false' })
const db = await import('../src/config/db.js')
const { default: app } = await import('../src/app.js')
const { default: AuthUser } = await import('../src/modules/auth/auth.model.js')
const { default: Lead } = await import('../src/modules/leads/lead.model.js')
const leadService = await import('../src/modules/leads/lead.service.js')
const auth = await import('../src/modules/auth/auth.service.js')
const { models } = await import('../src/database/models.js')
const { importData } = await import('../src/database/import-data.js')
let adminConnection, server, base, user, token, leadId, importChecks
const request = async (route, { method = 'GET', body, authenticated = true } = {}) => {
  const response = await fetch(base + route, { method, headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(authenticated ? { Authorization: `Bearer ${token}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) })
  return { status: response.status, body: await response.json() }
}
const leadPayload = (overrides = {}) => ({ leadType: 'Contact', fullName: 'Visitor', email: 'visitor@example.com', phone: '+919876543210', subject: 'Website enquiry', message: 'Please contact me', ...overrides })

before(async () => {
  adminConnection = await mysql.createConnection(connectionOptions)
  await adminConnection.query(`CREATE DATABASE \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  await assert.rejects(db.connectDatabase(), /schema missing/)
  await db.connectDatabase({ migrate: true })
  const { migrateDatabase } = await import('../src/database/migrate.js')
  await migrateDatabase() // Repeat setup is harmless.
  const originalHash = await auth.hashPassword('Test-password-12345')
  const originalId = randomBytes(12).toString('hex')
  const legacy = { authusers: [{ _id: { $oid: originalId }, name: 'SQL Test Admin', email: 'sql-admin@example.com', password: originalHash, createdAt: { $date: '2020-01-01T00:00:00.000Z' }, tokenVersion: 0 }] }
  const dry = await importData(legacy)
  assert.equal(dry.applied, false)
  assert.equal(await AuthUser.count(), 0)
  const invalid = structuredClone(legacy)
  invalid.authusers.push({ ...legacy.authusers[0], _id: { $oid: randomBytes(12).toString('hex') }, email: 'bad@example.com', name: null })
  await assert.rejects(importData(invalid, { apply: true }))
  assert.equal(await AuthUser.count(), 0) // The first row also rolled back.
  const imported = await importData(legacy, { apply: true })
  assert.equal(imported.counts.users, 1)
  user = await AuthUser.findById(originalId)
  const stored = await AuthUser.findById(originalId).includeSecrets('password tokenVersion')
  assert.equal(stored.password, originalHash)
  assert.equal(stored.tokenVersion, 1)
  assert.equal(user.createdAt.toISOString(), '2020-01-01T00:00:00.000Z')
  await assert.rejects(importData(legacy, { apply: true }), /empty application tables/)
  importChecks = true
  server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)) }
  await db.disconnectDatabase()
  if (adminConnection) {
    // Only drop this process's randomly named database, never a configured application database.
    if (!/^papal_test_[a-f0-9]{16}$/.test(database)) throw new Error('Unsafe test cleanup target')
    await adminConnection.query(`DROP DATABASE \`${database}\``)
    await adminConnection.end()
  }
})

test('MySQL-backed website and admin workflows', async t => {
  await t.test('legacy data import preserves IDs, hashes and dates, rolls back dry runs and failures, and refuses overwrites', () => assert.equal(importChecks, true))
  await t.test('schema creates nine tables, enforces uniqueness, and hashes passwords', async () => {
    const tables = await db.query('SHOW TABLES')
    assert.equal(tables.length, 10) // Nine modules plus migration ledger.
    const stored = await AuthUser.findById(user._id).includeSecrets('password tokenVersion')
    assert.notEqual(stored.password, 'Test-password-12345')
    assert.equal(await auth.verifyPassword('Test-password-12345', stored.password), true)
    assert.equal((await AuthUser.findById(user._id)).password, undefined)
    await assert.rejects(AuthUser.create({ name: 'Duplicate', email: user.email.toUpperCase(), password: 'Test-password-12345' }), error => error.statusCode === 409)
    const { ensureAdmin } = await import('../src/database/admin.js')
    Object.assign(process.env, { ADMIN_EMAIL: user.email, ADMIN_PASSWORD: 'Different-password-12345' })
    await ensureAdmin()
    assert.equal((await AuthUser.findById(user._id).includeSecrets('password')).password, stored.password)
    process.env.ADMIN_EMAIL = 'bootstrap-test@example.com'
    await ensureAdmin()
    const bootstrapped = await AuthUser.findOne({email:process.env.ADMIN_EMAIL}).includeSecrets('password')
    assert.equal(await auth.verifyPassword(process.env.ADMIN_PASSWORD, bootstrapped.password), true)
    assert.notEqual(bootstrapped.password, process.env.ADMIN_PASSWORD)
    await AuthUser.deleteById(bootstrapped._id)
    delete process.env.ADMIN_PASSWORD
  })
  await t.test('real database readiness and authentication', async () => {
    assert.equal((await request('/api/health', { authenticated: false })).status, 200)
    assert.equal((await request('/api/admin/leads', { authenticated: false })).status, 401)
    assert.equal((await request('/api/auth/login', { method: 'POST', authenticated: false, body: { email: user.email, password: 'wrong-password' } })).status, 401)
    const login = await request('/api/auth/login', { method: 'POST', authenticated: false, body: { email: user.email, password: 'Test-password-12345' } })
    assert.equal(login.status, 200)
    token = login.body.data.token
    assert.equal(login.body.data.user.password, undefined)
    assert.equal((await request('/api/auth/profile')).body.data.user.id, user._id)
  })
  await t.test('contact, franchise and career enquiries persist with safe defaults', async () => {
    for (const leadType of ['Contact', 'Franchise', 'Career']) {
      const created = await request('/api/leads', { method: 'POST', authenticated: false, body: leadPayload({ leadType, fullName: `Visitor ${leadType} मराठी`, status: 'Won', isDeleted: true }) })
      assert.equal(created.status, 201, JSON.stringify(created.body))
      const stored = await Lead.findById(created.body.data.id)
      assert.equal(stored.status, 'New')
      assert.equal(stored.isDeleted, false)
      assert.match(stored.fullName, /मराठी/)
      if (leadType === 'Contact') leadId = stored._id
    }
    const dashboard = await request('/api/admin/dashboard')
    assert.equal(dashboard.status, 200)
    assert.equal(dashboard.body.data.stats.totalLeads, 3)
    assert.equal(dashboard.body.data.stats.newLeadsToday, 3)
  })
  await t.test('lead notes, assignment, dates and concurrent updates persist', async () => {
    const update = await request(`/api/admin/leads/${leadId}`, { method: 'PUT', body: { status: 'Contacted', priority: 'High', assignedTo: user._id, note: 'Called customer', followUpDate: '2026-10-20T09:00:00.000Z' } })
    assert.equal(update.status, 200, JSON.stringify(update.body))
    assert.equal(update.body.data.lead.assignedTo.email, user.email)
    assert.equal(update.body.data.lead.internalNotes[0].addedBy.email, user.email)
    await Promise.all(['Follow-up A', 'Follow-up B'].map(note => leadService.updateLeadById(leadId, { note }, user._id)))
    const persisted = await leadService.getLeadById(leadId)
    assert.equal(persisted.internalNotes.length, 3)
    assert.equal(persisted.followUpDate.toISOString(), '2026-10-20T09:00:00.000Z')
    const cleared = await request(`/api/admin/leads/${leadId}`, { method: 'PUT', body: { followUpDate: null, assignedTo: '' } })
    assert.equal(cleared.status, 200)
    assert.equal(cleared.body.data.lead.followUpDate, null)
    assert.equal(cleared.body.data.lead.assignedTo, null)
    assert.equal(cleared.body.data.lead.internalNotes.length, 3)
    const invalid = await request(`/api/admin/leads/${leadId}`, { method: 'PUT', body: { assignedTo: 'aaaaaaaaaaaaaaaaaaaaaaaa' } })
    assert.equal(invalid.status, 400)
  })
  await t.test('SQL search treats wildcards and injection text literally', async () => {
    await Lead.create(leadPayload({ fullName: "a%b_c! ' OR 1=1 --", preferredBrand: 'Special', createdAt: new Date('2026-09-30T18:29:59.999Z') }))
    for (const search of ['%', '_', "' OR 1=1 --", 'a%b_c!']) {
      const result = await request('/api/admin/leads?search=' + encodeURIComponent(search))
      assert.equal(result.status, 200)
      assert.equal(result.body.data.items.length, 1)
    }
    const result = await request('/api/admin/leads?preferredBrand=Special&fromDate=2026-09-30&toDate=2026-09-30')
    assert.equal(result.body.data.items.length, 1)
    assert.equal((await request('/api/admin/leads?search=does-not-exist')).body.data.items.length, 0)
  })
  await t.test('priority sorting happens before pagination and totals stay accurate', async () => {
    await Lead.create(leadPayload({ fullName: 'Older urgent', priority: 'Urgent', createdAt: new Date('2020-01-01') }))
    const result = await request('/api/admin/leads?sort=priority&limit=1&page=1')
    assert.equal(result.body.data.items[0].fullName, 'Older urgent')
    assert.equal(result.body.data.pagination.total, 5)
    const page2 = await request('/api/admin/leads?sort=priority&limit=1&page=2')
    assert.equal(page2.body.data.items[0]._id, leadId)
  })
  await t.test('all content modules support SQL CRUD, JSON arrays and media relations', async () => {
    const Media = models.get('Media'), Brand = models.get('Brand'), Award = models.get('Award'), Career = models.get('Career'), Gallery = models.get('Gallery'), Homepage = models.get('Homepage'), Settings = models.get('Settings')
    const media = await Media.create({ publicId: 'test-image', url: 'https://example.com/a.jpg', secureUrl: 'https://example.com/a.jpg', originalName: 'a.jpg', fileName: 'a.jpg', mimeType: 'image/jpeg', extension: '.jpg', size: 100, uploadedBy: user._id, tags: ['office', 'team'] })
    const brand = await Brand.create({ name: 'SQL Brand', slug: 'sql-brand', tagline: 'Tagline', shortDescription: 'Short', fullDescription: 'Full', category: 'Food', displayOrder: 0, status: 'Active', createdBy: user._id, updatedBy: user._id, gallery: [{image:'https://example.com/a.jpg',caption:'Photo'}] })
    const award = await Award.create({ title: 'SQL Award', slug: 'sql-award', organization: 'Test', awardDate: new Date(), year: '2026', description: 'Award', category: 'Business', displayOrder: 0, createdBy: user._id, updatedBy: user._id, brand: brand._id, coverMedia: media._id, galleryMedia: [media._id] })
    const gallery = await Gallery.create({ title: 'SQL Gallery', slug: 'sql-gallery', description: 'Gallery', category: 'Corporate', media: [media._id], displayOrder: 0, eventDate: new Date(), createdBy: user._id, updatedBy: user._id, tags: ['office'] })
    const career = await Career.create({ title: 'SQL Career', slug: 'sql-career', department: 'Sales', location: 'Pune', employmentType: 'Full Time', workMode: 'On Site', experience: '1 year', vacancies: 1, description: 'Role', responsibilities: ['Sales'], requirements: ['Experience'], skills: ['Sales'], applicationDeadline: new Date(), displayOrder: 0, createdBy: user._id, updatedBy: user._id })
    const homepage = await Homepage.create({ hero: { title:'Title',subtitle:'Subtitle',description:'Description',primaryButtonText:'Contact',primaryButtonLink:'/contact',secondaryButtonText:'About',secondaryButtonLink:'/about',backgroundImage:'https://example.com/a.jpg' }, cta: { title:'CTA',description:'Description',primaryButton:{text:'Contact',link:'/contact'},secondaryButton:{text:'About',link:'/about'},backgroundImage:'https://example.com/a.jpg' }, journey:[], achievements:[], updatedBy:user._id })
    const settings = await Settings.create({ companyName:'Test',tagline:'Tagline',primaryEmail:'info@example.com',phone:'+919876543210',website:'https://example.com',address:'Office',city:'Pune',state:'Maharashtra',country:'India' })
    for (const route of ['/api/brands','/api/awards','/api/careers','/api/gallery','/api/homepage','/api/settings']) assert.equal((await request(route,{authenticated:false})).status, 200, route)
    const homepageService = await import('../src/modules/homepage/homepage.service.js')
    assert.equal((await homepageService.getAdminHomepage()).updatedBy.email, user.email)
    assert.equal((await Gallery.findById(gallery._id).withRelations('media')).media[0].publicId, 'test-image')
    assert.equal((await Award.findById(award._id).withRelations('brand', 'name')).brand.name, 'SQL Brand')
    assert.equal((await Award.findById(award._id).withRelations('galleryMedia')).galleryMedia[0]._id, media._id)
    assert.equal((await Media.find({ tags: { in:['office'] } })).length, 1)
    assert.equal((await Homepage.findOne({'hero.isActive':true}))._id, homepage._id)
    await assert.rejects(Settings.create({ ...settings, _id:undefined }), error => error.statusCode === 409)
    for (const [model, record, changes] of [[Brand,brand,{tagline:'Updated'}],[Award,award,{title:'Updated'}],[Career,career,{vacancies:2}],[Gallery,gallery,{tags:['updated']}],[Homepage,homepage,{status:'Published'}],[Settings,settings,{maintenanceMode:true}],[Media,media,{alt:'Updated'}]]) {
      const updated = await model.updateById(record._id, changes)
      for (const [key, value] of Object.entries(changes)) assert.deepEqual(updated[key], value)
    }
    for (const [model, record] of [[Award,award],[Gallery,gallery],[Career,career],[Homepage,homepage],[Settings,settings],[Brand,brand],[Media,media]]) assert.equal((await model.deleteById(record._id))._id, record._id)
  })
  await t.test('password changes roll back on failure, revoke old tokens and survive reconnect', async () => {
    const oldToken = token
    assert.equal((await request('/api/auth/password', { method:'PUT', body:{currentPassword:'incorrect',newPassword:'Updated-password-67890'} })).status, 400)
    assert.equal((await request('/api/auth/profile')).status, 200)
    const changed = await request('/api/auth/password', { method:'PUT', body:{currentPassword:'Test-password-12345',newPassword:'Updated-password-67890'} })
    assert.equal(changed.status, 200)
    token = changed.body.data.token
    await assert.rejects(auth.getProfileById(user._id, (await auth.verifyAuthToken(oldToken)).version), error => error.statusCode === 401)
    await db.disconnectDatabase()
    assert.equal(await db.databaseReady(), false)
    await db.connectDatabase()
    assert.equal((await Lead.findById(leadId)).internalNotes.length, 3)
    assert.equal((await request('/api/auth/profile')).status, 200)
    assert.equal((await request('/api/auth/logout', {method:'POST',body:{}})).status, 200)
    assert.equal((await request('/api/auth/profile')).status, 401)
    const login = await auth.loginSuperAdmin({email:user.email,password:'Updated-password-67890'})
    token = login.token
  })
  await t.test('soft deletion persists and excludes leads from counts and dashboards', async () => {
    assert.equal((await request(`/api/admin/leads/${leadId}`, { method:'DELETE' })).status, 200)
    assert.equal((await request(`/api/admin/leads/${leadId}`)).status, 404)
    assert.equal((await Lead.findById(leadId)).isDeleted, true)
    assert.equal((await request('/api/admin/dashboard')).body.data.stats.totalLeads, 4)
  })
})
