// import { hash } from "bcryptjs";
// import request from "supertest";
// import { DataSource } from "typeorm";
// import { v4 as uuidV4 } from "uuid";

// import { app } from "@shared/infra/http/app";
// import { createConnection } from "@shared/infra/typeorm/index";

// let connection: DataSource;
// describe("Create category controller", () => {
//   beforeAll(async () => {
//     connection = await createConnection("localhost");
//     await connection.runMigrations();

//     const id = uuidV4();
//     const password = await hash("admin", 8);

//     connection.query(`
//       INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
//       values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXX')
//     `);
//   });

//   afterAll(async () => {
//     await connection.dropDatabase();
//     await connection.destroy();
//   });

//   it("should be able to crate a new category", async () => {
//     const responseToken = await request(app).post("/sessions").send({
//       email: "admin@rentx.com",
//       password: "admin",
//     });

//     const { token } = responseToken.body;

//     const response = await request(app)
//       .post("/categories")
//       .send({
//         name: "Categoria teste",
//         description: "Descrição da categoria teste",
//       })
//       .set({
//         Authorization: `Bearer ${token}`,
//       });

//     expect(response.status).toBe(201);
//   });

//   it("should not be able to crate a new category if name exists", async () => {
//     const responseToken = await request(app).post("/sessions").send({
//       email: "admin@rentx.com",
//       password: "admin",
//     });

//     const { token } = responseToken.body;

//     const response = await request(app)
//       .post("/categories")
//       .send({
//         name: "Categoria teste",
//         description: "Descrição da categoria teste",
//       })
//       .set({
//         Authorization: `Bearer ${token}`,
//       });

//     expect(response.status).toBe(400);
//   });
// });
