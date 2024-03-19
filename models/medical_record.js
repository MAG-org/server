const { ObjectId } = require("mongodb");
const db = require("../config/db_config");
const { hashData } = require("../helpers/bcrypt");

class Medical_records_Model {
  static getCollection() {
    return db.collection("Medical_records");
  }

  static async create(args) {
    return await Medical_records_Model.getCollection().insertOne({
      ...args,
    });
  }

  static async findById(id) {
    return await Medical_records_Model.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }
}

module.exports = Medical_records_Model;
