//entry point
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const { request } = require("express");
const Category = require("./models/category");
require("./config/dbConnection");
require("dotenv").config();

app.use(helmet());
app.use(compression());

app.use(express.json());

// const users = [
//   { uId: "1", name: "User1" },
//   { uId: "2", name: "User2" },
//   { uId: "3", name: "User3" },
//   { uId: "4", name: "User4" },
//   { uId: "5", name: "User5" },
//   { uId: "6", name: "User6" },
//   { uId: "7", name: "User7" },
//   { uId: "8", name: "User8" },
//   { uId: "9", name: "User9" },
//   { uId: "10", name: "User10" },
//   { uId: "11", name: "User11" },
//   { uId: "12", name: "User12" },
// ];
app.get("/categories", paginatedResults(Category), (req, res) => {
  console.log(req.paginatedResults);
  res.status(200).json(req.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (startIndex > 0) {
      results.prevPage = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < (await model.countDocuments().exec())) {
      results.nextPage = {
        page: page + 1,
        limit: limit,
      };
    }

    results.result = await model.find().limit(limit).skip(startIndex);
    req.paginatedResults = results;
    next();
  };
}
app.use("/api/users", require("./routes/user_auth"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/products", require("./routes/product"));

app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
