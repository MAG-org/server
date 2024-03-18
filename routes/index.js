const express = require('express');
const router = express.Router()
const patient = require('./patient')
const doctor = require('./doctor')

router.get('/', (req, res) => {
    res.send('Connection Success, Hello World!')
})

//Route for Patient Endpoints
router.use('/patient', patient)

//Route for Doctor Endpoints
router.use('/doctor', doctor)

module.exports = router