const express = require("express");
const Doctor = require("../controllers/doctor");
const router = express.Router();

//Get All Doctor
router.get("/alldocters", Doctor.showDoctor);

//Get All Doctor By ID
router.get('/:id', Doctor.showDoctorById)

module.exports = router;
