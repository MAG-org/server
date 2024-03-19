const express = require('express');
const router = express.Router()
const Patient = require('../controllers/patient');

//Patient Register
router.post('/register', Patient.register)

//Patient Login
router.post('/login', Patient.login)

//Get All Patient
router.get('/', Patient.showPatient)

//Get All Patient By ID
router.get('/:id', Patient.showPatientById)

module.exports = router