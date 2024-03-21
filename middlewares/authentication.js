const { verifyToken } = require("../helpers/jwt")
const PatientModel = require("../models/patient")

const authentication = async (req,res,next) => {
    try {
        let accessToken = req.headers.authorization
        console.log(accessToken, "<<< init");

        if(!accessToken) {
            throw {name: "Invalid Token", message: "Unauthenticated", status: 401}
        }

        let [bearer, token] = accessToken.split(" ")

        console.log(token, "<<< ini token");

        if(bearer !== "Bearer"){
            throw {name: "Invalid Token", message: "Unauthenticated", status: 401}
        }

        let payload = verifyToken(token)

        let patient = await PatientModel.findByEmail(payload.email)

        if(!patient){
            throw {name: "Invalid Token", message: "Unauthenticated", status: 401}
        }

        req.patient = {
            _id : patient._id,
            name: patient.name,
            email: patient.email
        }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = authentication