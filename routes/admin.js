const express = require("express");
const router = express.Router();
const Admin = require("../controllers/admin");
const authentication = require("../middlewares/authentication");

//Admin Logincms
router.post("/login-admin", Admin.login);

router.post("/register-admin", Admin.register);

module.exports = router;
