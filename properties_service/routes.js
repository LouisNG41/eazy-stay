// routes.js
const express = require("express");
const router = express.Router();
const { getProperties, addProperty } = require("./controller");

router.get("/properties", getProperties);
router.post("/add-property", addProperty)

module.exports = router;