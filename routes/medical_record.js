const express = require("express");
const router = express.Router();
const Medical_records = require("../controllers/medical_records");

//Get All Medical_records
router.post("/add-medical-records", Medical_records.addMedicalRecords);

router.get("/patient/:patientId", Medical_records.showByPatient);

//Get All Medical_records By ID medical record
router.get("/:id", Medical_records.showMedical_recordsById);

module.exports = router;
