const db = require("../config/db_config");
const { ObjectId } = require("mongodb");

class AppointmentModel {
  static getCollection() {
    return db.collection("Appointments");
  }

  static async create(args) {
    return await AppointmentModel.getCollection().insertOne({
      ...args,
      status: "Pending",
      isPaid: false,
    });
  }

  static async destroy(query) {
    try {
      const result = await AppointmentModel.getCollection().deleteOne(query);
      return result.deletedCount; // Mengembalikan jumlah dokumen yang dihapus (biasanya 1)
    } catch (error) {
      throw new Error(
        `Error occurred while deleting document: ${error.message}`
      );
    }
  }

  static async editstatus(id) {
    return await AppointmentModel.getCollection().updateOne(
      {
        // doctor: args.doctor,
        // pasien_detail: args.pasien_detail,
        // date: args.date,
        _id: new ObjectId(String(id)),
      },
      { $set: { status: "Paid", isPaid: true } }
    );
  }

  static async findAll() {
    return await AppointmentModel.aggregate(
      [
        {
          '$match': {
            '_id': new ObjectId('65fa927b3203bf441f0d46fc')
          }
        }, {
          '$lookup': {
            'from': 'Doctors', 
            'localField': 'doctorId', 
            'foreignField': '_id', 
            'as': 'DoctorDetail'
          }
        }, {
          '$lookup': {
            'from': 'Patients', 
            'localField': 'patientId', 
            'foreignField': '_id', 
            'as': 'PatientDetails'
          }
        }, {
          '$project': {
            'PatientDetails': {
              'password': 0, 
              'IDNumber': 0
            }
          }
        }
      ]
    ).toArray();
  }

  static async findById(id) {
    return await AppointmentModel.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }
}

module.exports = AppointmentModel;
