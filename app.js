//entry point
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");

require("./config/dbConnection");
require("dotenv").config();

app.use(helmet());
app.use(compression());

app.use(express.json());

app.use("/api/users", require("./routes/user_auth"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/products", require("./routes/product"));

app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
