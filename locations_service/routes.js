// routes.js
const express = require("express");
const router = express.Router();
const { getDispoForProperty, createReservation, reservePropertyWithCriteria } = require("./controller");


router.get("/check-availability", getDispoForProperty);
router.post("/create-reservation", createReservation);
router.post("/create-reservation-with-criteria", reservePropertyWithCriteria);


module.exports = router;