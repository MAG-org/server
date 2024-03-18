const db = require("../config/db_config");

class DoctorModel {
    static getCollection(){
        return db.collection('Doctors')
    }

    static async findAll(){
        return await DoctorModel.getCollection().find({}).toArray()
    }

    static async findById(id){
        return await DoctorModel.getCollection().findOne({ 
            _id: new ObjectId(String(id))
        });
    }
}

module.exports = DoctorModel