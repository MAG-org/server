const { compareData } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const PatientModel = require("../models/patient");
const db = require("../config/db_config");
const ObjectId = require("mongodb").ObjectId;

class Patient {
  
  static async showDoctor(req, res, next) {
    try {
      const doctors = db.collection("Doctors");
      const allDoctor = await doctors.find().toArray();
      console.log(allDoctor, ">>>>>>>>>>>>>>>>>>>>>>>>");
      res.status(200).json(allDoctor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

    static async showDoctorById(req, res, next) {
    try {
      const { id } = req.params;
        const objectId = new ObjectId(id);
        const patient = await db.collection("Doctors").findOne({ _id: new ObjectId(String(id))});
        
        if (!patient) {
            throw {name:"Not Found", message:"Doctor Not Found", status: 404}
        }
        
        res.status(200).json(patient);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Patient;
