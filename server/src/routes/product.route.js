import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { createProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validator/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024,
  },
});

const router = Router();
/**
 * @method POST
 * @enpoint /api/products
 * @description Create a new product
 * @access Authenticated
 */
router.post(
  "/",
  authenticate,
  upload.array("images"),
  (req, res, next) => {
    try {
      if (req.body?.price) {
        req.body.price = JSON.parse(req.body.price);
      }

      if (req.body?.sizes) {
        req.body.sizes = JSON.parse(req.body.sizes);
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Invalid JSON format for price or sizes",
      });
    }
  },
  createProductValidator,
  createProduct,
);

export default router;
