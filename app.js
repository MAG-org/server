if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./config/db_config');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

//To Enable CORS
app.use(cors())

//To Get Data From Body
app.use(express.urlencoded({extended: true}))

//To Get Data in JSON format
app.use(express.json())

//To Handle Server Routing
app.use('/api', router)

//Error Handler
app.use(errorHandler)

module.exports = app