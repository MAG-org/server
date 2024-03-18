const db = require("../config/db_config");
const { hashData } = require("../helpers/bcrypt");

class PatientModel {
    static getCollection(){
        return db.collection('Patients')
    }

    static async create(args){
        const {password} = args

        return await PatientModel.getCollection().insertOne({
            ...args,
            password: hashData(password)
        })
    }

    static async findByEmail(email){
        return await PatientModel.getCollection().findOne({
            email: email
        })
    }
}

module.exports = PatientModel