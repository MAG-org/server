// <<<<<<< HEAD
const express = require("express");
const Appointment = require("../controllers/appointment");
const router = express.Router();

//Get All Appointment
router.get("/", Appointment.showAppointment);

//Get All Appointment By ID
router.get("/:id", Appointment.showAppointmentById);

//Create Appointment
router.post("/create", Appointment.createAppointment)

//Midtrans Payment
router.get("/payment/:id", Appointment.InitiateMidTrans)

module.exports = router;


