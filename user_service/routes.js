// routes.js
const express = require("express");
const router = express.Router();
const { getUsers, login, signup } = require("./controller");

router.get("/users", getUsers);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
