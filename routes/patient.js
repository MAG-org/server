const express = require('express');
const Patient = require('../controllers/patient');
const router = express.Router()

//Patient Register
router.post('/register', Patient.register)

//Patient Login
router.post('/login', Patient.login)

module.exports = router