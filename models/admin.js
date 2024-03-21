const { ObjectId } = require("mongodb");
const db = require("../config/db_config");
const { hashData } = require("../helpers/bcrypt");

class AdminModel {
  static getCollection() {
    return db.collection("Admin");
  }

  static async create(args) {
    const { password } = args;

    return await AdminModel.getCollection().insertOne({
      ...args,
      password: hashData(password),
    });
  }

  static async destroy(query) {
    try {
      const result = await AdminModel.getCollection().deleteOne(query);
      return result.deletedCount; // Mengembalikan jumlah dokumen yang dihapus (biasanya 1)
    } catch (error) {
      throw new Error(
        `Error occurred while deleting document: ${error.message}`
      );
    }
  }

  static async findAll() {
    return await AdminModel.getCollection().find({}).toArray();
  }

  static async findByEmail(email) {
    return await AdminModel.getCollection().findOne({
      email: email,
    });
  }

  static async findById(id) {
    return await AdminModel.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }
}

module.exports = AdminModel;
