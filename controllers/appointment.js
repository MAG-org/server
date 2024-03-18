const { compareData } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
// const PatientModel = require("../models/doctor");
const db = require("../config/db_config");
const ObjectId = require("mongodb").ObjectId;

class Patient {
  static async showAppointment(req, res, next) {
    try {
      const appointment = db.collection("Appointments");
      const allAppointment = await appointment.find().toArray();
      console.log(allAppointment, ">>>>>>>>>>>>>>>>>>>>>>>>");
      res.status(200).json(allAppointment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAppointmentById(req, res, next) {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const doctor = await db
        .collection("Appointments")
        .findOne({ _id: new ObjectId(String(id)) });

      if (!doctor) {
        throw { name: "Not Found", message: "Appointments Not Found", status: 404 };
      }

      res.status(200).json(doctor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Patient;
