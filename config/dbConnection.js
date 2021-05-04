const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", function () {
  console.log("Error occured while connecting to database");
});
db.once("open", function () {
  console.log("Connected to Database!!");
});
module.exports = db;
