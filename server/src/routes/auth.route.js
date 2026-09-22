import {Router} from 'express'
import { registerUser } from '../controllers/auth.controller.js'


const router = Router()

/**
 * @method POST
 * @endpoint /api/auth/register
 * @description Register a new user and save it to the database
 * @access Public
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} confirmPassword - The confirm password of the user
 */
router.post('/register', registerUser)

export default router