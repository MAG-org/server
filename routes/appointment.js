// <<<<<<< HEAD
const express = require("express");
const Appointment = require("../controllers/appointment");
const authentication = require("../middlewares/authentication"); 
const AppointmentModel = require("../models/appointment");
const router = express.Router();

//Get All Appointment
router.get("/", Appointment.showAppointment);

router.post("/payment-notification-handler", async (req, res, next) => {
    try {
        console.log(req.body);
        const {order_id, transaction_status} = req.body

        if(transaction_status !== 'settlement'){
            throw {name: "Payment Error", message: "Payment Failed", status:401}
        }

        const [_, id] = order_id.split('-')

        const appointment = await AppointmentModel.editstatus(id)

        console.log(appointment);
        res.status(200).json(appointment);

    } catch (error) {
        console.log(error);
        next(error)
    }

//   {
//     transaction_time: '2024-03-20 16:53:45',
//     transaction_status: 'settlement',
//     transaction_id: '0abf71a7-9053-4973-ab6f-90bd5013b5ba',
//     status_message: 'midtrans payment notification',
//     status_code: '200',
//     signature_key: 'd1278c00cdeb5f8c860403d8c52632333d90be48e5966b73c3b80899e69a50bae2c72e722565a5f9c94873aa52905c8f012839e092cf375459225e2498eb3813',
//     settlement_time: '2024-03-20 16:55:18',
//     permata_va_number: '0210099334335814',
//     payment_type: 'bank_transfer',
//     order_id: '0.6233931552864918-65fab22908af31b4f465858e',
//     merchant_id: 'G777702179',
//     gross_amount: '20000.00',
//     fraud_status: 'accept',
//     expiry_time: '2024-03-21 16:53:45',
//     currency: 'IDR'
//   }
});
// https://f374-139-228-111-126.ngrok-free.app/api/appointment/payment-charge/:id"
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

router.get("/patient", authentication, Appointment.showAppointmentByPatient )

//Get All Appointment By ID
router.get("/:id", Appointment.showAppointmentById);

module.exports = router;
