// routes.js
const express = require("express");
const router = express.Router();
const { getPropertyAvailability, createReservation, createReservationPropertyWithCritera, getReservations } = require("./controller");


router.get("/availability", getPropertyAvailability);
router.get("/reservations", getReservations);
router.post("/reservation", createReservation);
router.post("/reservationWithCriteria", createReservationPropertyWithCritera);


module.exports = router;