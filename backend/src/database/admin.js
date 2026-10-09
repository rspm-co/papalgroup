import AuthUser from '../modules/auth/auth.model.js'

export const ensureAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Object.assign(new Error('Set a valid ADMIN_EMAIL'), { code: 'ADMIN_CONFIGURATION' })
  if (!password || password.length < 12 || Buffer.byteLength(password) > 72 || /^(admin|password|changeme|replace)/i.test(password)) throw Object.assign(new Error('ADMIN_PASSWORD must be unique, at least 12 characters, and at most 72 UTF-8 bytes'), { code: 'ADMIN_CONFIGURATION' })
  if (await AuthUser.exists({ email })) {
    console.info('Admin already exists; existing credentials were not changed.')
    return
  }
  await AuthUser.create({ name: process.env.ADMIN_NAME || 'Super Admin', email, password, role: 'SUPER_ADMIN', isActive: true })
  console.info('Super Admin created successfully.')
}
