const express = require('express');
const router = express.Router()
const patient = require('./patient')
const doctor = require("./doctor");
const appointment = require("./appointment");
const medical_records = require("./medical_record");

router.get('/', (req, res) => {
    res.send('Connection Success, Hello World!')
})

//Route for Patient Endpoints
router.use('/patient', patient)

//Route for Doctor Endpoints
router.use('/doctor', doctor)

//Route for Appointment Endpoints
router.use('/appointment', appointment)

//Route for Medical Records Endpoints
router.use('/medical-record', medical_records)

module.exports = router