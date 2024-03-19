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

    static async findAll() {
        return await PatientModel.getCollection().find({}).toArray()
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
    }
}

module.exports = PatientModel