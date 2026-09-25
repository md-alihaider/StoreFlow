import { body, validationResult, param } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .trim()
    .isString()
    .withMessage("Title must be string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title length must be between 3 to 50 character"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .trim()
    .isString()
    .withMessage("Description must be string")
    .bail()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description length must be between 20 to 500 character"),
  body("price.amount")
    .exists()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than 0"),
  body("price.currency")
    .exists()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be string")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be INR or USD"),
  body("sizes")
    .exists()
    .withMessage("Sizes is required")
    .bail()
    .isArray()
    .withMessage("Sizes must be array"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be string")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size must be between XS to XXL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer value and greater than 0"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const productIdValidator = [
  param("id")
    .exists()
    .withMessage("Product ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid product ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const updateProductValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description must be between 20 and 500 characters"),

  body("price").optional().isObject().withMessage("Price must be an object"),

  body("price.amount")
    .optional()
    .isNumeric()
    .withMessage("Price amount must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price amount cannot be negative"),

  body("price.currency")
    .optional()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be INR or USD"),

  body("sizes").optional().isArray().withMessage("Sizes must be an array"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
