import {Router} from 'express'
import { registerUser, loginUser, refresh } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";


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
router.post('/register', registerValidator, registerUser)


/**
 * @method POST
 * @endpoint /api/auth/login
 * @description Authenticate user, issue access + refresh tokens
 * @access Public
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 */
router.post("/login", loginValidator, loginUser)


/**
 * @method POST
 * @endpoint /api/auth/refresh-token
 * @description Issue a new access token
 * @access Public
 */
router.post("/refresh-token", refresh)

export default router