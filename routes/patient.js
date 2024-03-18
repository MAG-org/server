const express = require('express');
const Patient = require('../controllers/patient');
const router = express.Router()

//Patient Register
router.post('/register', Patient.register)

//Patient Login
router.post('/login', Patient.login)

//Get All Patient
router.get('/allpatient', Patient.showPatient)


//Get All Patient By ID
router.get('/:id', Patient.showPatientById)

module.exports = router