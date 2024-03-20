const DoctorModel = require("../models/doctor");

class Doctor {
    static async showDoctor(req, res, next) {
        try {
            const doctors = await DoctorModel.findAll()

            res.status(200).json(doctors);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showDoctorById(req, res, next) {
        try {
            const { id } = req.params;

            const doctor = await DoctorModel.findById(id)

            if (!doctor) {
                throw {name:"Not Found", message:"Doctor Not Found", status: 404}
            }
            
            res.status(200).json(doctor);
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Doctor;
