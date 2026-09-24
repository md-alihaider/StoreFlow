import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();
/**
 * @method POST
 * @enpoint /api/products
 * @description Create a new product
 * @access Authenticated
 */
router.post("/", authenticate, createProduct);

export default router;
