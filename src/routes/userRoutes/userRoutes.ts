import express from 'express'
import { registerUser } from '../../controllers/userControllers/userRegister'

const router = express.Router()

router.post('/register', registerUser)


export default router