const express = require("express");
const router = express.Router();
const Roles = require("../models/roles");

router.get("/", async (req, res) => {
  Roles.find()
    .then((role) => {
      res.send(role);
    })
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  const { name, code, permissions } = req.body;
  Roles.create({ name, code, permissions })
    .then((role) => res.send(role))
    .catch((err) => console.log(err));
});

module.exports = router;
