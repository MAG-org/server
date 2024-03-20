const request = require("supertest");
const app = require("../app");
const Medical_records_Model = require("../models/medical_record");

afterAll(async () => {
  await Medical_records_Model.destroy({
    where: {},
    truncate: true,
  });
});

describe("GET /api/medical-record/add-medical-records", () => {
  test("a. Berhasil Menambahkan data Medical Record", async () => {
    const dataAddedUser = {
      id_doctor: "65f7e9a52871c0b6489314d8",
      id_patient: "65f7ba4d3ccf3caf7a85926f",
      disease_name: "Stroke",
      docter_note: "Kurangi makan makanan berminyak, bersantan, ",
      date: "20/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    console.log(
      response.body,
      "<<<<<<<aaaaa>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Medical Records Added Succssfully"
    );
  });

  test("b. ID Doctor tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      id_doctor: "",
      id_patient: "65f7ba4d3ccf3caf7a85926f",
      disease_name: "Stroke",
      docter_note: "Kurangi makan makanan berminyak, bersantan, ",
      date: "20/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("c. ID Pasien tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      id_doctor: "65f7e9a52871c0b6489314d8",
      id_patient: "",
      disease_name: "Stroke",
      docter_note: "Kurangi makan makanan berminyak, bersantan, ",
      date: "20/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("d. Disease Name tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      id_doctor: "65f7e9a52871c0b6489314d8",
      id_patient: "65f7ba4d3ccf3caf7a85926f",
      disease_name: "",
      docter_note: "Kurangi makan makanan berminyak, bersantan, ",
      date: "20/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("e. Doctor Note tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      id_doctor: "65f7e9a52871c0b6489314d8",
      id_patient: "65f7ba4d3ccf3caf7a85926f",
      disease_name: "Stroke",
      docter_note: "",
      date: "20/03/2024",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("f. Date tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      id_doctor: "65f7e9a52871c0b6489314d8",
      id_patient: "65f7ba4d3ccf3caf7a85926f",
      disease_name: "",
      docter_note: "Kurangi makan makanan berminyak, bersantan, ",
      date: "",
      status: "Activ now",
      isPaid: true,
    };

    const response = await request(app)
      .post("/api/medical-record/add-medical-records")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });
});

describe("GET /api/medical-record/65f920ed745250e6a4e316a0", () => {
  test("b. Berhasil mendapatkan data Medical record berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/medical-record/65f920ed745250e6a4e316a0"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("c. Gagal mendapatkan data Medical record berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/medical-record/65f7e9a52871c0b6489314db"
    );
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Medical records Not Found");
  });
});
