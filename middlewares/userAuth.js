const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authFunctions = {
  generateJwt: (payload) => {
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return jwtToken;
  },
  verifyLogin: async (req, res, next) => {
    try {
      if (!req.header("Authorization")) {
        return res.json({
          status: "fail",
          data: {
            user: "login required",
          },
        });
      }
      const token = await req.header("Authorization").split(" ")[1];
      if (!token) {
        return res.json({
          status: "fail",
          data: {
            user: "login required",
          },
        });
      }
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(userData.userId);
      next();
    } catch (ex) {
      return res.json({
        status: "error",
        message: ex.stack,
      });
    }
  },
};

module.exports = authFunctions;
