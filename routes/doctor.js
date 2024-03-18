const express = require('express');
const Doctor = require('../controllers/doctor');
const router = express.Router()

router.post('/seed', Doctor.seedData)

module.exports = router