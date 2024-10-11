import express from 'express'
import { login, verify } from '../controllers/authControllers.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()
//post method
router.post('/login', login)
router.get('/verify', authMiddleware, verify)
export default router;