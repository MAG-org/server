// <<<<<<< HEAD
const express = require("express");
const Appointment = require("../controllers/appointment");
const authentication = require("../middlewares/authentication"); 
const AppointmentModel = require("../models/appointment")
const router = express.Router();

//Get All Appointment
router.get("/", Appointment.showAppointment);

router.post("/payment-notification-handler", async (req, res, next) => {
  try {
    console.log(req.body);
    const { order_id, transaction_status } = req.body;

    if (transaction_status !== "settlement") {
      throw { name: "Payment Error", message: "Payment Failed", status: 401 };
    }

    const [_, id] = order_id.split("-");

    const appointment = await AppointmentModel.editstatus("Paid",id);

    console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/payment-charge/:id", (req, res) => {
    const { id } = req.params;
  const fetch = require("node-fetch");
  const url = "https://api.sandbox.midtrans.com/v2/charge";
  const options = {
    method: "POST",
    headers: {
      "X-Append-Notification":
        "https://9925-139-228-111-126.ngrok-free.app/api/appointment/payment-notification-handler",
      "content-type": "application/json",
      authorization:
        "Basic U0ItTWlkLXNlcnZlci1IZlV2MjJHWElWbTBRZ284c0hWZ0hsTk86VTBJdFRXbGtMWE5sY25abGNpMUlabFYyTWpKSFdFbFdiVEJSWjI4NGMwaFdaMGhzVGs4Ng==",
    },
    body: JSON.stringify({
      payment_type: "bank_transfer",
      bank_transfer: {
        bank: "permata",
      },
      transaction_details: {
        order_id: Math.random().toString() + "-" + id,
        gross_amount: 20000,
      },
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.status(200).json(json))
    .catch((err) => {
      console.error("error:" + err);
      res.status(500).json(err);
    });
});

//Add Appointment
router.post("/addappointment", authentication, Appointment.addAppointment);

//Add Appointment
router.patch("/edit-appointment-status/:id", Appointment.editAppointmentStatus);

router.get("/patient", authentication, Appointment.showAppointmentByPatient )

//Get All Appointment By ID
router.get("/:id", Appointment.showAppointmentById);

module.exports = router;
