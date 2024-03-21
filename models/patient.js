const { ObjectId } = require("mongodb");
const db = require("../config/db_config");
const { hashData } = require("../helpers/bcrypt");

class PatientModel {
  static getCollection() {
    return db.collection("Patients");
  }

  static async create(args) {
    const { password } = args;

    return await PatientModel.getCollection().insertOne({
      ...args,
      password: hashData(password),
    });
  }

  static async destroy(query) {
    try {
      const result = await PatientModel.getCollection().deleteOne(query);
      return result.deletedCount; // Mengembalikan jumlah dokumen yang dihapus (biasanya 1)
    } catch (error) {
      throw new Error(
        `Error occurred while deleting document: ${error.message}`
      );
    }
  }

  static async findAll() {
    return await PatientModel.getCollection().find({}).toArray();
  }

  static async findByEmail(email) {
    return await PatientModel.getCollection().findOne({
      email: email,
    });
  }

  static async findById(id) {
    return await PatientModel.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });

    // console.log(id);

    // return await PatientModel.getCollection().aggregate([
    //     {
    //       '$match': {
    //         'patientId': new ObjectId(String(id))
    //       }
    //     }, {
    //       '$lookup': {
    //         'from': 'Patients', 
    //         'localField': 'patientId', 
    //         'foreignField': '_id', 
    //         'as': 'PatientDetails'
    //       }
    //     }, {
    //       '$lookup': {
    //         'from': 'Appointments', 
    //         'localField': 'appointmentId', 
    //         'foreignField': '_id', 
    //         'as': 'AppointmentDetails'
    //       }
    //     }
    //   ]).toArray()
  }
}

module.exports = PatientModel