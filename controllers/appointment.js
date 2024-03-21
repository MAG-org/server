const AppointmentModel = require("../models/appointment");
const midtransClient = require("midtrans-client");

class Appointment {
  static async showAppointment(req, res, next) {
    try {
      const appointment = await AppointmentModel.findAll();

      res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAppointmentById(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        throw {
          name: "Not Found",
          message: "Appointments Not Found",
          status: 404,
        };
      }

      res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAppointment(req, res, next) {
    try {
      const { doctorId, date, time } = req.body;

      if (!doctorId || !time || !date) {
        throw {
          name: "Invalid Input",
          message: "Field cannot be empty",
          status: 400,
        };
      }

      const newAppointment = {
        ...req.body,
        patientId: req.patient._id
      }

      console.log(newAppointment);

      const appointment = await AppointmentModel.create(newAppointment);
      console.log(appointment);

      res.status(201).json({ message: "Appointment Added Succssfully", _id: appointment.insertedId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editAppointmentStatus(req, res, next) {
    try {
      const { id } = req.params;
      const newAppointment = await AppointmentModel.editstatus(id);
      console.log(newAppointment);

      res.status(201).json({ message: "Appointment Status Active Succssfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAppointmentByPatient(req, res, next) {
    try {
      console.log(req.patient._id)
      
      const appointment = await AppointmentModel.findByPatientId(req.patient._id)
      console.log(appointment);
      
      res.status(200).json(appointment)
      
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  
}

module.exports = Appointment;
