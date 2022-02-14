const express = require("express");
const router = express.Router();
const Permissions = require("../models/permission");

router.get("/", (req, res) => {
  Permissions.find()
    .then((perm) => res.send(perm))
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const { name, code } = req.body;
  Permissions.create({ name, code })
    .then((perm) => res.send(perm))
    .catch((err) => res.send(err));
});

module.exports = router;
