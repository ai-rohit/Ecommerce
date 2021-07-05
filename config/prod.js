const helmet = require("helmet");
const compression = require("compression");

module.exports = function () {
  app.use(helmet());
  app.use(compression());
};

//Testing git pull request
//I will merge the review branch with master
