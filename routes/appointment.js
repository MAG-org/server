const express = require("express");
const Appointment = require("../controllers/appointment");
const router = express.Router();

//Get All Appointment
router.get("/allappointments", Appointment.showAppointment);

//Get All Appointment By ID
router.get("/:id", Appointment.showAppointmentById);

module.exports = router;
