const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const Product = require("../models/products");
const Category = require("../models/category");
const checkValidation = require("../middlewares/validationHandler");
const authFunctions = require("../middlewares/userAuth");
const { authorize } = require("../middlewares/userAuthorization");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find({});
    return res.json({
      status: "success",
      product,
    });
  } catch (ex) {
    return res.json({
      status: "error",
      message: ex.message,
    });
  }
});

//request body will later be implemented with form data for image/file upload
router.post(
  "/",
  authFunctions.verifyLogin,
  authorize(["basic", "admin"]),
  [
    body("name")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("Product name is required and should be string")
      .isLength({ max: 70, min: 10 })
      .withMessage("Product name requires to have 10-70 characters"),
    body("description")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("Product description is required and should be string")
      .isLength({ max: 1000, min: 10 })
      .withMessage("Product description rqeuires to have 100-1000 characters"),
    body("price")
      .exists()
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price needs to be in numeric form"),
    body("quantity")
      .exists()
      .notEmpty()
      .withMessage("Quantity is required")
      .isNumeric()
      .withMessage("Quantity should have numeric value")
      .custom((value) => {
        if (value < 1) {
          console.log(value);
          throw new Error("Quantity cannot be less than 1");
        }
        return true;
      }),
    body("category")
      .exists()
      .notEmpty()
      .withMessage("Category is required")
      .custom(async (value, { req: req }) => {
        return Category.categoryExists(value)
          .then((category) => (req.category = category))
          .catch((err) => {
            throw new Error(err);
          });
      }),
  ],
  checkValidation,
  async (req, res) => {
    try {
      const product = req.body;
      await Product.create(product, (err, result) => {
        if (err) {
          return res.json({
            status: "error",
            message: err.message,
          });
        }
        return res.json({
          status: "success",
          data: {
            product: result,
          },
        });
      });
    } catch (ex) {
      return res.json({
        status: "error",
        message: ex.message,
      });
    }
  }
);

//working with single products
const singleProductRouter = express.Router();
router.use(
  "/:prod_id",
  [
    param("prod_id").custom(async (value, { req: req }) => {
      try {
        const product = await Product.findById(value);
        if (!product) {
          throw new Error("Product doesn't exist");
        } else {
          req.product = product;
        }
      } catch (ex) {
        throw new Error(ex.message);
      }
    }),
  ],
  checkValidation,
  singleProductRouter
);

singleProductRouter.get("/", async (req, res) => {
  try {
    return res.json({
      status: "success",
      data: {
        product: req.product,
      },
    });
  } catch (ex) {
    return res.json({
      status: "error",
      message: ex.message,
    });
  }
});

singleProductRouter.delete("/", (req, res) => {
  try {
    req.product.remove(function (error, result) {
      if (error) {
        return res.json({
          status: "error",
          message: error.message,
        });
      }
      return res.json({
        status: "success",
        data: null,
      });
    });
  } catch (ex) {
    return res.json({
      status: "error",
      message: ex.message,
    });
  }
});

//request body will later be changed into formdata
singleProductRouter.put(
  "/",
  [
    body("name")
      .optional()
      .isString()
      .withMessage("Product name should be string")
      .isLength({ max: 70, min: 10 })
      .withMessage("Product name requires to have 10-70 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage("Product description should be string")
      .isLength({ max: 1000, min: 10 })
      .withMessage("Product description rqeuires to have 100-1000 characters"),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("Price needs to be in numeric form"),
    body("quantity")
      .optional()
      .isNumeric()
      .withMessage("Quantity should have numeric value")
      .custom((value) => {
        if (value < 1) {
          console.log(value);
          throw new Error("Quantity cannot be less than 1");
        }
        return true;
      }),
    body("category")
      .optional()
      .custom(async (value, { req: req }) => {
        return Category.categoryExists(value)
          .then((category) => (req.category = category))
          .catch((err) => {
            throw new Error(err);
          });
      }),
  ],
  async (req, res) => {
    //code to edit product
    try {
      if (req.body.name) {
        req.product.name = req.body.name;
      }
      if (req.body.description) {
        req.product.description = req.body.description;
      }
      if (req.body.price) {
        req.product.price = req.body.price;
      }
      if (req.body.quantity) {
        req.product.quantity = req.body.quantity;
      }
      if (req.body.category) {
        req.product.category = req.body.category;
      }

      const result = await req.product.save();
      return res.json({
        status: "success",
        data: {
          product: result,
        },
      });
    } catch (ex) {
      return res.json({
        status: "error",
        message: ex.message,
      });
    }
  }
);
module.exports = router;
