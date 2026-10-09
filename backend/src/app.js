import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from './config/env.js'
import { API_PREFIX } from './constants/app.constants.js'
import { globalErrorHandler } from './middleware/error.middleware.js'
import { notFoundHandler } from './middleware/notFound.middleware.js'
import routes from './routes/index.js'
import ApiError from './utils/ApiError.js'
import { mountWebsite } from './middleware/website.middleware.js'

const app = express()
const uploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../uploads',
)

app.set('trust proxy', env.trustProxy)
app.disable('x-powered-by')

app.use(helmet({ contentSecurityPolicy: { directives: {
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'data:', 'https:'],
  'style-src': ["'self'", "'unsafe-inline'", 'https:'],
  'connect-src': ["'self'", ...env.allowedOrigins],
  'upgrade-insecure-requests': env.isProduction ? [] : null,
} } }))

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.allowedOrigins.has(origin)) return callback(null, true)
      return callback(new ApiError(403, 'Origin is not allowed'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(morgan(env.isProduction ? 'combined' : 'dev'))
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())
app.use('/uploads', express.static(uploadsDirectory))

app.use(API_PREFIX, routes)
app.use(API_PREFIX, notFoundHandler)
if (env.serveStatic) mountWebsite(app)

app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
