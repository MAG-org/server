const Medical_records_Model = require("../models/medical_record");

class Medical_records {
  static async showMedical_recordsById(req, res, next) {
    try {
      const { id } = req.params;

      const Medical_records = await Medical_records_Model.findById(id);

      if (!Medical_records) {
        throw {
          name: "Not Found",
          message: "Medical records Not Found",
          status: 404,
        };
      }

      res.status(200).json(Medical_records);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addMedicalRecords(req, res, next) {
    try {
      const { appointmentId, patientId, disease_name, docter_note} = req.body;

      if (!appointmentId || !patientId || !disease_name || !docter_note) {
        throw {
          name: "Invalid Input",
          message: "Field cannot be empty",
          status: 400,
        };
      }

      const newMedicalRecords = await Medical_records_Model.create(req.body);
      console.log(newMedicalRecords);

      res.status(201).json({ message: "Medical Records Added Succssfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showByPatient(req, res, next){
    try {
      const { patientId } = req.params;
      console.log(patientId, "<<<");
      const record = await Medical_records_Model.findByPatientId(patientId);
      
      if (!record) {
          throw {name:"Not Found", message:"Patient Not Found", status: 404}
      }
      
      res.status(200).json(record);
      
  } catch (error) {
      console.log(error);
      next(error);
  }
  }
}

module.exports = Medical_records;
