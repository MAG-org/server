const db = require('../config/db_config');


class Doctor{
    static async seedData(){
        try {
            const data = require('../data/doctor.json')

            await db.collection('Doctors').insertMany(data)

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Doctor