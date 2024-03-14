const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Connection Success, Hello World!')
})

module.exports = router