if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./config/db_config');
const router = require('./routes');

//To Enable CORS
app.use(cors())

//To Get Data From Body
app.use(express.urlencoded({extended: true}))

//To Get Data in JSON format
app.use(express.json())

//To Handle Server Routing
app.use(router)

module.exports = app