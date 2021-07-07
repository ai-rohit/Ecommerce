const User = require("../models/user");

//accepts array of roles
function allowAcess(users) {
  return (req, res, next) => {
    if (!Array.isArray(users)) {
      return res.json({
        status: "fail",
        data: {
          roles: "The roles of user must be passed in array",
        },
      });
    } else {
      console.log(users.includes(req.user.role));
      console.log(req.user.role);
      if (users.includes(req.user.role)) {
        return next();
      } else {
        return res.json({
          status: "fail",
          data: {
            user: "Access denied for the user",
          },
        });
      }
    }
  };
}

module.exports.authorize = allowAcess;
