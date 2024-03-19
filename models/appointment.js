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

  static async editstatus(id) {
    return await AppointmentModel.getCollection().updateOne(
      {
        // doctor: args.doctor,
        // pasien_detail: args.pasien_detail,
        // date: args.date,
        _id: new ObjectId(String(id)),
      },
      { $set: { status: "Paid", isPaid: true }}
    );
  }

  static async findAll() {
    return await AppointmentModel.getCollection().find({}).toArray();
  }

  static async findById(id) {
    return await AppointmentModel.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }
}

module.exports = AppointmentModel;
