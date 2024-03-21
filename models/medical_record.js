const { ObjectId } = require("mongodb");
const db = require("../config/db_config");
const { hashData } = require("../helpers/bcrypt");

class Medical_records_Model {
  static getCollection() {
    return db.collection("Medical_records");
  }

  static async destroy(query) {
    try {
      const result = await Medical_records_Model.getCollection().deleteOne(
        query
      );
      return result.deletedCount; // Mengembalikan jumlah dokumen yang dihapus (biasanya 1)
    } catch (error) {
      throw new Error(
        `Error occurred while deleting document: ${error.message}`
      );
    }
  }

  static async create(args) {
    const {appointmentId, patientId} = args
    return await Medical_records_Model.getCollection().insertOne({
      ...args,
      appointmentId: new ObjectId(String(appointmentId)),
      patientId: new ObjectId(String(patientId))
    });
  }

  static async findById(id) {
    return await Medical_records_Model.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }

  static async findAll() {
    return await Medical_records_Model.getCollection()
      .aggregate([
        {
          $lookup: {
            from: "Doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "DoctorDetail",
          },
        },
        {
          $lookup: {
            from: "Patients",
            localField: "patientId",
            foreignField: "_id",
            as: "PatientDetails",
          },
        },
        {
          $project: {
            PatientDetails: {
              password: 0,
              IDNumber: 0,
            },
          },
        },
      ])
      .toArray();
  }

  static async findByPatientId(id){
    // return await Medical_records_Model.getCollection().aggregate([
    //   {
    //     '$match': {
    //       'patientId': new ObjectId(String(id))
    //     }
    //   }, {
    //     '$lookup': {
    //       'from': 'Patients', 
    //       'localField': 'patientId', 
    //       'foreignField': '_id', 
    //       'as': 'PatientDetails'
    //     }
    //   }, {
    //     '$lookup': {
    //       'from': 'Appointments', 
    //       'localField': 'appointmentId', 
    //       'foreignField': '_id', 
    //       'as': 'AppointmentDetails'
    //     }
    //   }
    // ]).toArray()

    return await Medical_records_Model.getCollection().aggregate([
      {
        '$match': {
          'patientId': new ObjectId(String(id))
        }
      }, {
        '$lookup': {
          'from': 'Appointments', 
          'localField': 'appointmentId', 
          'foreignField': '_id', 
          'as': 'AppointmentDetails'
        }
      }, {
        '$lookup': {
          'from': 'Doctors', 
          'localField': 'AppointmentDetails.doctorId', 
          'foreignField': '_id', 
          'as': 'DoctorDetails'
        }
      }
    ]).toArray()
  }
}

module.exports = Medical_records_Model;
