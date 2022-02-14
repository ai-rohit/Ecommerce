//checkPermission(permCode)

function checkPermission(permission) {
  return async (req, res, next) => {
    if (req.user) {
      if (req.user.role.code == "superadmin") {
        return next();
      } else {
        if (req.user.role.permissions.includes(permission)) {
          return next();
        } else {
          return res.send("Access denied");
        }
      }
    } else {
      return res.send("Access denied");
    }
  };
}

module.exports.checkPermission = checkPermission;
