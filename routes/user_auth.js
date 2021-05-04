const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body } = require("express-validator");
const checkValidation = require("../middlewares/validationHandler");
const bcrypt = require("bcrypt");
const authFunctions = require("../middlewares/userAuth");

//register user
router.post(
  "/register",
  [
    body("userName").exists().withMessage("User name is required"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Not a valid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already registered");
        } else {
          return Promise.resolve("Email is not registered yet");
        }
      }),
    body("phone")
      .exists()
      .withMessage("phone is required")
      .isMobilePhone()
      .isLength({ min: 9, max: 10 })
      .withMessage("Not a valid phone number")
      .custom(async (value) => {
        const phone = await User.findOne({ phone: value });
        if (phone) {
          return Promise.reject("Phone already in use");
        } else {
          return Promise.resolve("Phone is not registered yet");
        }
      }),
    body("password")
      .exists()
      .withMessage("Password required")
      .isLength({ min: 8, max: 16 })
      .withMessage("Min length should be 8 and max should be 16"),
    body("confirmPassword")
      .exists()
      .withMessage("Password required")
      .isLength({ min: 8, max: 16 })
      .withMessage("Min length should be 8 and max should be 16")
      .custom((value, { req: req }) => {
        if (value !== req.body.password) {
          return Promise.reject("Password and confirm password doesn't match");
        } else {
          return Promise.resolve("Password is matched");
        }
      }),
  ],
  checkValidation,
  async (req, res) => {
    try {
      const user = {
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hashSync(req.body.password, 8),
      };

      await User.create(user);
      return res.json({ status: "success", data: {} });
    } catch (ex) {
      return res.json({ status: "error", message: ex.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Not a valid email")
      .custom(async (value, { req: req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          req.user = user;
          return Promise.resolve("Email registered");
        } else {
          return Promise.reject("Email not registered yet!");
        }
      }),
    body("password")
      .exists()
      .withMessage("Password required")
      .isLength({ min: 8, max: 16 })
      .withMessage("Min length should be 8 and max should be 16"),
  ],
  checkValidation,
  async (req, res) => {
    try {
      if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const jwt = authFunctions.generateJwt({ userId: req.user._id });
        res.append("X-JWT", jwt);
        return res.json({
          status: "success",
          data: {},
        });
      } else {
        return res.json({
          status: "fail",
          data: {
            password: "Password doesn't match",
          },
        });
      }
    } catch (ex) {
      return res.json({
        status: "error",
        message: ex.message,
      });
    }
  }
);
module.exports = router;
