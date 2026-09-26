import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  createProductValidator,
  productIdValidator,
  updateProductValidator,
} from "../validator/product.validator.js";
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

/**
 * @method GET
 * @enpoint /api/products
 * @description Get all products
 * @access Public
 */
router.get("/", getProducts);

/**
 * @method GET
 * @endpoint /api/products/:id
 * @description Get a single product by ID
 * @access Public
 */
router.get("/:id", productIdValidator, getProduct);

/**
 * @method PUT
 * @endpoint /api/products/:id
 * @description Update a product
 * @access Authenticated
 */
router.put(
  "/:id",
  authenticate,
  productIdValidator,
  upload.array("images"),
  (req, res, next) => {
    try {
      if (req.body.price) {
        req.body.price = JSON.parse(req.body.price);
      }

      if (req.body.sizes) {
        req.body.sizes = JSON.parse(req.body.sizes);
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Invalid JSON format for price or sizes",
      });
    }
  },

  updateProductValidator,
  updateProduct,
);

export default router;
