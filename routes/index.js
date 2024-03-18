const express = require('express');
const router = express.Router()
const patient = require('./patient')
const doctor = require("./doctor");
const appointment = require("./appointment");


router.get('/', (req, res) => {
    res.send('Connection Success, Hello World!')
})

//Route for Patient Endpoints
router.use('/patient', patient)

//Route for Docter Endpoints
router.use('/doctor', doctor)

//Route for Docter Endpoints
router.use('/appointment', appointment)

module.exports = router