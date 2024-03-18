const express = require('express');
const router = express.Router();
const Doctor = require('../controllers/doctor');

//Get All Doctor
router.get("/", Doctor.showDoctor);

//Get All Doctor By ID
router.get('/:id', Doctor.showDoctorById)

module.exports = router;
