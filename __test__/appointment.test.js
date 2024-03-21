const request = require("supertest");
const app = require("../app");
const AppointmentModel = require("../models/appointment");

afterAll(async () => {
  await AppointmentModel.destroy({
    where: {},
    truncate: true,
  });
});

describe("GET /api/appointment", () => {
  test("a. Berhasil mendapatkan data Appointment", async () => {
    const response = await request(app).get("/api/appointment");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/appointment/65fa3d632f1909132cb05724", () => {
  test("b. Berhasil mendapatkan data Appointment berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/appointment/65fa3d632f1909132cb05724"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

    test("c. Gagal mendapatkan data Appointment berdasarkan id", async () => {
      const response = await request(app).get(
        "/api/appointment/65f92cf1104281e64a36de6e"
      );
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Appointments Not Found");
    });
});

describe("GET /api/appointment/addappointment", () => {
  test("a. Berhasil Menambahkan data Appointment", async () => {
    const dataAddedUser = {
      doctor: "urbaningrum",
      pasien_detail: "urururururur",
      date: "19/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/appointment/addappointment")
      .send(dataAddedUser);
    console.log(
      response.body,
      "<<<<<<<aaaaa>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment Added Succssfully"
    );
  });

  test("b. Doctor tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      doctor: "",
      pasien_detail: "urururururur",
      disease_name: "Jantung gagal",
      docter_note: "urbaningrum",
      date: "19/03/2024",
      status: "Activeted now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/appointment/addappointment").send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });
    
    test("c. pasien detail tidak diberikan / tidak diinput", async () => {
      const dataAddedUser = {
        doctor: "urbaningrum",
        pasien_detail: "",
        disease_name: "Jantung gagal",
        docter_note: "urbaningrum",
        date: "19/03/2024",
        status: "Activeted now",
        isPaid: true,
      };

      const response = await request(app)
        .post("/api/appointment/addappointment")
        .send(dataAddedUser);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Field cannot be empty");
    });

    test("d. Date tidak diberikan / tidak diinput", async () => {
      const dataAddedUser = {
        doctor: "urbaningrum",
        pasien_detail: "urururururur",
        disease_name: "Jantung gagal",
        docter_note: "urbaningrum",
        date: "",
        status: "Activeted now",
        isPaid: true,
      };

      const response = await request(app)
        .post("/api/appointment/addappointment")
        .send(dataAddedUser);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Field cannot be empty");
    });
});

describe("PATCH /api/appointment/edit-appointment-status/:id", () => {
  // Menambahkan appointment baru untuk diubah statusnya
  let appointmentId;

  beforeAll(async () => {
    const newAppointment = await AppointmentModel.create({
      doctor: "dr. John",
      pasien_detail: "John Doe",
      disease_name: "Flu",
      docter_note: "Take rest",
      date: "2024-03-20",
      status: "Pending",
      isPaid: false,
    });
    appointmentId = "65fa3d632f1909132cb05724" //newAppointment.id;
  });

  test("a. Berhasil mengubah status appointment", async () => {
    const response = await request(app)
      .patch(`/api/appointment/edit-appointment-status/${appointmentId}`)
          .send({ status: "Active" });
      console.log(response)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment Status Active Succssfully"
    );
  });

});

describe("GET /api/appointment/payment-notification-handler", () => {
  test("a. Berhasil mendapatkan data Appointment", async () => {
    const response = await request(app).get("/api/appointment/payment-notification-handler");
    expect(response.status).toBe(200);
  });
});

describe("GET /api/appointment/payment-charge", () => {
  test("a. Berhasil mendapatkan data Appointment", async () => {
    const response = await request(app).get("/api/appointment/payment-charge");
    expect(response.status).toBe(200);
  });
});