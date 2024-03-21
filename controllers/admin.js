const { compareData } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const AdminModel = require("../models/admin");

class Admin {

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

      const findPatient = await AdminModel.findByEmail(email);

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

      console.log(token);

      res.status(200).json({ accessToken: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

    static async register(req, res, next) {
        try {
            const {name, email, password, role} = req.body;

            if (!name || !email || !password || !role) {
                throw {
                    name: "Invalid Input",
                    message: "Field cannot be empty",
                    status: 400
                };
            }

            const findPatient = await AdminModel.findByEmail(email);

            if (findPatient) {
                throw {
                    name: "Invalid Input",
                    message: "Account Already Exists",
                    status: 400,
                };
            }

            // if(password !== passwordConfirm){
            //     throw {
            //         name: "Invalid Input",
            //         message: "Password Does Not Match",
            //         status: 400,
            //     }
            // }

            const newAdmin = {name, email, password, role}
            const result = await AdminModel.create(newAdmin);
            console.log(result);

            res.status(201).json({ message: "Admin Added Succssfully" });

        } catch (error) {
                console.log(error);
                next(error);
        }
    }
}

module.exports = Admin;
