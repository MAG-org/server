const request = require("supertest");
const app = require("../app");
// const { PatientModel, sequelize } = require("../models");
// const { queryInterface } = sequelize;
const PatientModel = require("../models/patient")
const { signToken } = require("../helpers/jwt");
const { hashData } = require("../helpers/bcrypt");

let accessToken;
beforeAll(async () => {
  const user = await PatientModel.create({
    email: "zaki@test.com",
    password: hashData("zaki123"),
  });

  accessToken = signToken({ id: user.id, email: user.email });
});

afterAll(async () => {
  await PatientModel.destroy({
    where: {},
    truncate: true,
  });
});

describe("POST /api/patient/login", () => {
  test("a. Berhasil login dan mengirimkan access_token", async () => {
    const dataLoginUser = {
      email: "zaki@test.com",
      password: "zaki123",
    };

    const response = await request(app).post("/api/patient/login").send(dataLoginUser);
    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken", expect.any(String));
  });

  test("b. Email tidak diberikan/ tidak diinput", async () => {
    const dataLoginUser = {
      email: "",
      password: "admin",
    };

    const response = await request(app).post("/api/patient/login").send(dataLoginUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field canot be empty");
  });

  test("c. Password tidak diberikan/ tidak diinput", async () => {
    const dataLoginUser = {
      email: "admin@mail.com",
      password: "",
    };

    const response = await request(app).post("/api/patient/login").send(dataLoginUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field canot be empty");
  });

  test("d. Email diberikan invalid / tidak terdaftar", async () => {
    const dataLoginUser = {
      email: "admin1000@mail.com",
      password: "admin",
    };

    const response = await request(app).post("/api/patient/login").send(dataLoginUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email / Password Incorrect");
  });

  test("e. Password diberikan salah/ tidak match", async () => {
    const dataLoginUser = {
      email: "zaki@test.com",
      password: "admin100",
    };

    const response = await request(app).post("/api/patient/login").send(dataLoginUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email / Password Incorrect");
  });
});

describe("POST /api/patient/register", () => {
  test("a. Berhasilkan menambahkan user", async () => {
    const dataAddedUser = {
      name: "shihrui",
      email: "tambahdisini12347@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "laki-laki",
      address : "indonesia"
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    console.log(accessToken);
    console.log(
      response.body,
      "<<<<<<<aaaaa>>>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Patient Added Succssfully");
  });

  test("b. Email tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      email: "",
      password: "staff",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("c. Password tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      email: "staff@mail.com",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("d. Email diberikan string kosong", async () => {
    const dataAddedUser = {
      email: " ",
      password: "staff",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    // console.log(response.status, response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("e. Password diberikan string kosong", async () => {
    const dataAddedUser = {
      email: "staff@mail.com",
      password: "",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    // console.log(response.status, response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("f. Email sudah terdaftar", async () => {
    const dataAddedUser = {
      name: "shihrui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "laki-laki",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    // console.log(response.status, response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Account Already Exists");
  });

  test("g. Nama tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "laki-laki",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("h. BirthDate tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "shirui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "laki-laki",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("i. Phone Number tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "shirui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "",
      IDNumber: "82873268716",
      gender: "laki-laki",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("j. ID Number tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "shirui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "",
      gender: "laki-laki",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("k. Gender tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "shirui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "",
      address: "indonesia",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });

  test("k. Address tidak diberikan / tidak diinput", async () => {
    const dataAddedUser = {
      name: "shirui",
      email: "staffkuy1@mail.com",
      password: "staff",
      birthDate: "19/03/2000",
      phoneNumber: "08212121",
      IDNumber: "82873268716",
      gender: "Laki-laki",
      address: "",
    };

    const response = await request(app)
      .post("/api/patient/register")
      .send(dataAddedUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Field cannot be empty");
  });
  
});

describe("GET /api/patient", () => {
  test("a. Berhasil mendapatkan data Pasien", async () => {
    const response = await request(app).get("/api/patient");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/patient/65f7ba4d3ccf3caf7a85926f", () => {
  test("b. Berhasil mendapatkan data Pasien berdasarkan id", async () => {
    const response = await request(app).get("/api/patient/65f7ba4d3ccf3caf7a85926f");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("c. Gagal mendapatkan data Pasien berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/patient/65f7ba4d3ccf3caf7a85925a"
    );
    console.log(response, ">>>>>>>>>>>>>>.ini patient")
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Patient Not Found");
  });
});

