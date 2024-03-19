const db = require("../config/db_config");
const { ObjectId } = require("mongodb");

class AppointmentModel {
  static getCollection() {
    return db.collection("Appointments");
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
