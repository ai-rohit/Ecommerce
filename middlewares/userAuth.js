const jwt = require("jsonwebtoken");

const authFunctions = {
  generateJwt: (payload) => {
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return jwtToken;
  },
};

module.exports = authFunctions;
