const db = require("../config/db_config");
const { ObjectId } = require("mongodb");

class DoctorModel {
  static getCollection() {
    return db.collection("Doctors");
  }

  static async create(args) {
    // const { password } = args;

    return await DoctorModel.getCollection().insertOne({
      ...args,
    });
  }

  static async destroy(query) {
    try {
      const result = await DoctorModel.getCollection().deleteOne(query);
      return result.deletedCount; // Mengembalikan jumlah dokumen yang dihapus (biasanya 1)
    } catch (error) {
      throw new Error(
        `Error occurred while deleting document: ${error.message}`
      );
    }
  }

  static async findAll() {
    return await DoctorModel.getCollection().find({}).toArray();
  }

  static async findById(id) {
    return await DoctorModel.getCollection().findOne({
      _id: new ObjectId(String(id)),
    });
  }

  static async search(args) {
    const {name, specialize, schedule} = args

    return await DoctorModel.getCollection().find({$and: [
      {name: {$regex: name, $options: 'i'}},
      {specialize: {$regex: specialize, $options: 'i'}}
  ]}).toArray();
  }
}

module.exports = DoctorModel;
