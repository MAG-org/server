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

describe("GET /api/appointment/65f92cf1104281e64a36de6e", () => {
  test("b. Berhasil mendapatkan data Appointment berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/appointment/65f92cf1104281e64a36de6e"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

    test("c. Gagal mendapatkan data Appointment berdasarkan id", async () => {
      const response = await request(app).get(
        "/api/appointment/65f92cf1104281e64a36de6e"
      );
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Appointment Not Found");
    });
});

describe("GET /api/appointment/addappointment", () => {
  test("a. Berhasil Menambahkan data Appointment", async () => {
    const dataAddedUser = {
      doctor: "urbaningrum",
      pasien_detail: "urururururur",
      disease_name: "Jantung gagal",
      docter_note: "urbaningrum",
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
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Appointment Status Active Succssfully"
    );
  });

  test("b. Gagal mengubah status appointment karena id tidak valid", async () => {
    const response = await request(app)
      .patch(`/api/appointment/edit-appointment-status/invalid_id`)
      .send({ status: "Active" });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Appointment not found");
  });

  test("c. Gagal mengubah status appointment karena status tidak valid", async () => {
    const response = await request(app)
      .patch(`/api/appointment/edit-appointment-status/${appointmentId}`)
      .send({ status: "InvalidStatus" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid status provided");
  });

  test("d. Gagal mengubah status appointment karena input kosong", async () => {
    const response = await request(app)
      .patch(`/api/appointment/edit-appointment-status/${appointmentId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Status field is required");
  });
});
