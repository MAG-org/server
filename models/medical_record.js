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
    const {appointmentId} = args
    return await Medical_records_Model.getCollection().insertOne({
      ...args,
      appointmentId: new ObjectId(String(appointmentId))
    });
  }

  static async findById(id) {
    return await Medical_records_Model.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }
}

module.exports = Medical_records_Model;
