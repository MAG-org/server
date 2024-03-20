const { compareData } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const PatientModel = require("../models/patient");

class Patient {
    static async register(req, res, next) {
        try {
            const {name, email, password, passwordConfirm, birthDate, phoneNumber, IDNumber, gender, address} = req.body;

            if (!name || !email || !password || !passwordConfirm || !birthDate || !phoneNumber || !IDNumber || !gender || !address) {
                throw {
                    name: "Invalid Input",
                    message: "Field cannot be empty",
                    status: 400
                };
            }

            const findPatient = await PatientModel.findByEmail(email);

            if (findPatient) {
                throw {
                    name: "Invalid Input",
                    message: "Account Already Exists",
                    status: 400,
                };
            }

            if(password !== passwordConfirm){
                throw {
                    name: "Invalid Input",
                    message: "Password Does Not Match",
                    status: 400,
                }
            }

            const newPatient = {name, email, password, birthDate, phoneNumber, IDNumber, gender, address}
            const result = await PatientModel.create(newPatient);
            console.log(result);

            res.status(201).json({ message: "Patient Added Succssfully" });

        } catch (error) {
                console.log(error);
                next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw {
                    name: "Invalid Input",
                    message: "Field canot be empty",
                    status: 400,
                };
            }

            const findPatient = await PatientModel.findByEmail(email);

            if (!findPatient || !compareData(password, findPatient.password)) {
                throw {
                    name: "Invalid User",
                    message: "Email / Password Incorrect",
                    status: 400,
                };
            }

            const token = signToken({
                _id: findPatient._id,
                email: findPatient.email,
                name: findPatient.name,
            });

            res.status(200).json({ accessToken: token });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showPatient(req, res, next) {
        try {
            const patients = await PatientModel.findAll()
            
            res.status(200).json(patients);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showPatientById(req, res, next) {
        try {
            const { id } = req.params;
            const patient = await PatientModel.findById(id);
            
            if (!patient) {
                throw {name:"Not Found", message:"Patient Not Found", status: 404}
            }
            
            res.status(200).json(patient);
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Patient;
