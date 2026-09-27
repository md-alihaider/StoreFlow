import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address"),

  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be string")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be between 2 to 50 character"),

  body("password")
    .exists()
    .withMessage("Password is Required")
    .bail()
    .isString()
    .withMessage("Password must be string")
    .bail()
    .notEmpty()
    .withMessage("Password is Required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 character long"),

  body("confirmPassword")
    .exists()
    .withMessage("Confirm password is Required")
    .bail()
    .isString()
    .withMessage("Confirm password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Confirm password is Required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

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

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email Address"),

  body("password")
    .exists()
    .withMessage("Password is Required")
    .bail()
    .isString()
    .withMessage("Password must be string")
    .bail()
    .notEmpty()
    .withMessage("Password is Required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 character long"),

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
