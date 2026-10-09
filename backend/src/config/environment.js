export const validateEnvironment = (source) => {
  const isProduction = source.NODE_ENV === 'production'
  const port = Number(source.PORT || 5000)
  const trustProxy = Number(source.TRUST_PROXY ?? (isProduction ? 1 : 0))
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer between 1 and 65535')
  if (!Number.isInteger(trustProxy) || trustProxy < 0 || trustProxy > 5) throw new Error('TRUST_PROXY must be an integer from 0 to 5')
  const dbHost = source.DB_HOST || '127.0.0.1'
  const dbPort = Number(source.DB_PORT || 3306)
  const dbUser = source.DB_USER || 'root'
  const dbPassword = source.DB_PASSWORD || ''
  const dbName = source.DB_NAME || 'rspapalgroup'
  const dbPoolSize = Number(source.DB_POOL_SIZE || 5)
  if (!Number.isInteger(dbPort) || dbPort < 1 || dbPort > 65535) throw new Error('DB_PORT must be an integer between 1 and 65535')
  if (!Number.isInteger(dbPoolSize) || dbPoolSize < 1 || dbPoolSize > 20) throw new Error('DB_POOL_SIZE must be between 1 and 20')
  if (!/^[A-Za-z0-9_]{1,64}$/.test(dbName)) throw new Error('DB_NAME must contain only letters, digits and underscores')
  for (const key of ['DB_SSL', 'DB_AUTO_MIGRATE', 'BOOTSTRAP_ADMIN']) if (source[key] && !['true', 'false'].includes(source[key])) throw new Error(`${key} must be true or false`)
  if (source.DB_SSL_CA && source.DB_SSL !== 'true') throw new Error('DB_SSL_CA requires DB_SSL=true')
  if (source.MONGODB_URI) throw new Error('MongoDB is no longer supported. Remove MONGODB_URI and configure DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.')
  const jwtSecret = source.JWT_SECRET || 'development-only-secret'
  const publicUrl = source.PUBLIC_URL || `http://localhost:${port}`
  const clientOrigins = (source.CLIENT_URL || '').split(',').map(value => value.trim()).filter(Boolean)
  const validateOrigin = (value) => {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('Website URLs must be origins without paths or credentials')
    if (isProduction && (url.protocol !== 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) throw new Error('Production website URLs must use a public HTTPS domain')
    return url.origin
  }
  const origin = validateOrigin(publicUrl)
  const allowedOrigins = new Set([origin, ...clientOrigins.map(validateOrigin)])
  if (!isProduction) ['http://localhost:5173', 'http://localhost:5174'].forEach(value => allowedOrigins.add(value))
  if (isProduction) {
    for (const key of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET', 'PUBLIC_URL']) if (!source[key]) throw new Error(`Missing required production environment variable: ${key}`)
    if (dbUser.toLowerCase() === 'root') throw new Error('Production must use a dedicated database user, not root')
    if (jwtSecret.length < 48 || /development|replace|example|changeme/i.test(jwtSecret)) throw new Error('JWT_SECRET must be a unique random secret of at least 48 characters')
  }
  const cloudinaryValues = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'].map(key => source[key] || '')
  if (cloudinaryValues.some(Boolean) && (!cloudinaryValues.every(Boolean) || cloudinaryValues.some(value => /your-cloudinary|replace-with/i.test(value)))) throw new Error('Provide all three real Cloudinary values, or leave all three empty')
  return {
    port, trustProxy, dbHost, dbPort, dbUser, dbPassword, dbName, dbPoolSize, jwtSecret,
    dbSsl: source.DB_SSL === 'true', dbSslCa: source.DB_SSL_CA || '', dbAutoMigrate: source.DB_AUTO_MIGRATE === 'true',
    bootstrapAdmin: source.BOOTSTRAP_ADMIN === 'true',
    jwtExpiresIn: source.JWT_EXPIRES_IN || '8h',
    nodeEnv: source.NODE_ENV || 'development',
    publicUrl: origin, allowedOrigins,
    cloudinaryCloudName: cloudinaryValues[0], cloudinaryApiKey: cloudinaryValues[1], cloudinaryApiSecret: cloudinaryValues[2],
    isProduction,
    serveStatic: source.SERVE_STATIC ? source.SERVE_STATIC === 'true' : isProduction,
  }
}
