// <<<<<<< HEAD
const express = require("express");
const Appointment = require("../controllers/appointment");
const authentication = require("../middlewares/authentication"); 
const router = express.Router();

//Get All Appointment
router.get("/", Appointment.showAppointment);

//Get All Appointment By ID
router.get("/:id", Appointment.showAppointmentById);

router.post("/payment-notification-handler", (req, res) => {
  console.log(req.body);

  //jika settelement update status appointment dan payment
  res.status(200).json(req.body);
});

router.post("/payment-charge/:id", (req, res) => {
    const { id } = req.params;
  const fetch = require("node-fetch");
  const url = "https://api.sandbox.midtrans.com/v2/charge";
  const options = {
    method: "POST",
    headers: {
      "X-Append-Notification":
        "https://f374-139-228-111-126.ngrok-free.app/api/appointment/payment-notification-handler",
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

module.exports = router;
