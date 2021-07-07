const User = require("../models/user");
const { Role } = require("../helpers/Roles");

//accepts array of roles
function allowAcess(users) {
  return (req, res, next) => {
    //check if role is valid
    for (let i = 0; i < users.length; i++) {
      if (Role.hasOwnProperty(users[i])) {
        continue;
      } else {
        return res.json({
          status: "fail",
          data: {
            role: `${users[i]} is not a proper role for user`,
          },
        });
      }
    }
    //check if users parameter is array or what
    if (!Array.isArray(users)) {
      return res.json({
        status: "fail",
        data: {
          roles: "The roles of user must be passed in array",
        },
      });
    } else {
      //check if the logged in user has the role
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
