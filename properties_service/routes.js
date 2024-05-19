// routes.js
const express = require("express");
const router = express.Router();
const { getProperties, addProperty, getPropertiesFromFilter } = require("./controller");

router.get("/properties", getProperties);
router.post("/add-property", addProperty);
router.get("/properties-filter", getPropertiesFromFilter);

module.exports = router;