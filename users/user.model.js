const mongoose = require("mongoose");
const { Role } = require("../helpers/Roles");
const Roles = require("./roles");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Roles,
    required: true,
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;
