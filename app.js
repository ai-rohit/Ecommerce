//entry point
const express = require("express");
const app = express();

require("./config/dbConnection");
require("dotenv").config();

app.use(express.json());

app.use("/api/users", require("./routes/user_auth"));
app.use("/api/categories", require("./routes/category"));

app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
