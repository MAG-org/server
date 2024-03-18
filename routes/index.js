const express = require('express');
const router = express.Router()
const patient = require('./patient')

router.get('/', (req, res) => {
    res.send('Connection Success, Hello World!')
})

//Route for Patient Endpoints
router.use('/patient', patient)

module.exports = router