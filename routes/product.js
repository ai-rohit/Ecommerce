const express = require("express");
const { body, param } = require("express-validator");
const testValidation = require("../middlewares/validationHandler");
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

router.post(
  "/",
  authFunctions.verifyLogin,
  authorize(["basic", "admin"]),
  [
    body("name")
      .exists()
      .isString()
      .withMessage("Product name is required and should be string")
      .isLength({ max: 70, min: 10 })
      .withMessage("Product name requires to have 10-70 characters"),
    body("description")
      .exists()
      .isString()
      .withMessage("Product description is required and should be string")
      .isLength({ max: 1000, min: 10 })
      .withMessage("Product description rqeuires to have 100-1000 characters"),
    body("price")
      .exists()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price needs to be in numeric form"),
    body("quantity")
      .exists()
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

module.exports = router;
