const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");
const { body } = require("express-validator");
const checkValidation = require("../middlewares/validationHandler");
const authFunctions = require("../middlewares/userAuth");
const allowAcess = require("../middlewares/userAuthorization");
const { Role } = require("../helpers/Roles");
const authorize = require("../middlewares/userAuthorization");

categoryRouter.get(
  "/",
  // authFunctions.verifyLogin,
  // authorize.authorize(["admin", "basic"]),
  async (req, res) => {
    try {
      const categories = await Category.find({});
      return res.json({
        status: "success",
        data: {
          category: categories,
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

categoryRouter.post(
  "/",
  [
    body("categoryName")
      .exists()
      .withMessage("Category name is required")
      .custom(async (catName) => {
        const category = await Category.findOne({ categoryName: catName });
        if (category) {
          return Promise.reject("The category has already been added");
        } else {
          return Promise.resolve("This is new category");
        }
      }),
    body("categoryDescription")
      .exists()
      .withMessage("Catgeory description is required"),
  ],
  checkValidation,
  authFunctions.verifyLogin,
  async (req, res) => {
    try {
      const createdCategory = await Category.create({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
      });
      return res.json({
        status: "success",
        data: {
          category: createdCategory,
        },
      });
    } catch (ex) {
      return res.json({
        status: "message",
        message: ex.stack,
      });
    }
  }
);
module.exports = categoryRouter;
