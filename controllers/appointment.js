const AppointmentModel = require("../models/appointment");
const midtransClient = require("midtrans-client");

class Appointment {
  static async createAppointment(req, res, next){
    try {
      const {doctorId} = req.body

      res.status(200).json({message: "Success"})

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async showAppointment(req, res, next) {
    try {
      const appointment = await AppointmentModel.findAll();

      res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAppointmentById(req, res, next) {
    try {
      const { id } = req.params;

      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        throw {
          name: "Not Found",
          message: "Appointments Not Found",
          status: 404,
        };
      }

      res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async InitiateMidTrans(req, res, next) {
    try {
      const { id } = req.params;

      const userId = req.user;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.API_KEY_serverKey,
        clientKey: process.env.API_KEY_clientKey,
      });

      const orderId = Math.random().toString() + "-" +  id;

      const trxAmount = 20000; //data.price;

      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: trxAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
          first_name: req.user.userName,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      console.log(transaction);
      let transactionToken = transaction.token;
      console.log(transactionToken);

      await Transaction.create({
        userId: userId.id,
        gameId: data.id,
        totalAmount: trxAmount,
        orderId: orderId,
        transactionToken: transactionToken,
        transactionDate: new Date(),
      });

      res.json({ message: "Transaction created", transactionToken, orderId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAppointment(req, res, next) {
    try {
      const { doctor, pasien_detail, date } = req.body;

      if (!doctor || !pasien_detail || !date) {
        throw {
          name: "Invalid Input",
          message: "Field cannot be empty",
          status: 400,
        };
      }

      const newAppointment = await AppointmentModel.create(req.body);
      console.log(newAppointment);

      res.status(201).json({ message: "Appointment Added Succssfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editAppointmentStatus(req, res, next) {
    try {
      const { id } = req.params;
      // const { doctor, pasien_detail, date, status } = req.body;

      // if (!doctor || !pasien_detail || !date || !status) {
      //   throw {
      //     name: "Invalid Input",
      //     message: "Field cannot be empty",
      //     status: 400,
      //   };
      // }

      const newAppointment = await AppointmentModel.editstatus(id);
      console.log(newAppointment);

      res.status(201).json({ message: "Appointment Status Active Succssfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  
}

module.exports = Appointment;
