// routes.js
const express = require("express");
const router = express.Router();
const { getDispoForProperty, createReservation } = require("./controller");


router.get("/check-availability", getDispoForProperty);
router.post("/create-reservation", createReservation);


module.exports = router;