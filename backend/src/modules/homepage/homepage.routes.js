import { Router } from 'express'
import { getHomepage } from './homepage.controller.js'

const router = Router()

router.get('/', getHomepage)

export default router
