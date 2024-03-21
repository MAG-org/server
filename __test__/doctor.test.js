const request = require("supertest");
const app = require("../app");
const DoctorModel = require("../models/doctor");
// const { signToken } = require("../helpers/jwt");
// const { hashData } = require("../helpers/bcrypt");

let accessToken;
// beforeAll(async () => {
//   const user = await DoctorModel.create({
//     email: "zaki@test.com",
//     password: hashData("zaki123"),
//   });

//   accessToken = signToken({ id: user.id, email: user.email });
// });

afterAll(async () => {
  await DoctorModel.destroy({
    where: {},
    truncate: true,
  });
});

describe("GET /api/doctor", () => {
  test("a. Berhasil mendapatkan data Doctor", async () => {
    const response = await request(app).get("/api/doctor");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/doctor/65f7e9a52871c0b6489314da", () => {
  test("b. Berhasil mendapatkan data Doctor berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/doctor/65f7e9a52871c0b6489314da"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  
  test("c. Gagal mendapatkan data Doctor berdasarkan id", async () => {
    const response = await request(app).get(
      "/api/doctor/65f7e9a52871c0b6489314db"
    );
      console.log(response)
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Doctor Not Found");
  });
});
