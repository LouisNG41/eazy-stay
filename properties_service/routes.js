// routes.js
const express = require("express");
const router = express.Router();
const { addProperty, getProperties, getPropertyById } = require("./controller");

router.get("/properties", getProperties);
router.post("/property", addProperty);
router.get("/property/:id", getPropertyById)

module.exports = router;