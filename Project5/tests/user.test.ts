import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";
import jwt from "jsonwebtoken";

// Função para gerar o token
describe("User Authentication and Update", () => {
  let token: string;
});

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.user = {
        id_user: 1,
        email: "usuarioTeste@gmail.com",
        password: "1234568@",
      };
      next();
    },
  };
});

describe("User Endpoint", () => {
  beforeAll(async () => {
    console.log("Ligando banco de dados...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Banco ligou!");
  });

  // CREATE USER
  test("POST /users shold create a new user and return success", async () => {
    const response = await request(app).post("/users").send({
      id_user: 1,
      name: "usuario teste",
      email: "usuarioTeste@gmail.com",
      CPF: "538.395.170-95",
      password: "1234568@",
    });
    expect(response.status).toBe(201);
  });

  //GET BY ID
  test("Get /users shold return a user by ID and return success", async () => {
    const response = await request(app)
      .get("/users/1")
      .set({ Authorization: "Auth" });

    expect(response.status).toBe(200);
  });

  describe("User Authentication and Update", () => {
    let token: string;

    // Primeiro, fazer login para obter o token
    test("POST /login should authenticate a user and return a token", async () => {
      const response = await request(app).post("/login").send({
        email: "usuarioTeste@gmail.com",
        password: "1234568@",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");

      token = response.body.token;
    });

    test("PUT /users/:id should update the user's data", async () => {
      const response = await request(app)
        .put("/users/1")
        .send({
          name: "usuario teste EDITADO",
          CPF: "231.339.070-50",
          password: "ReiDelas123EDIT@",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "usuario teste EDITADO");
    });
  });

  // GET ALL
  test("GET /users should return all users", async () => {
    const response = await request(app)
      .get("/users")
      .set({ Authorization: "Auth" });

    expect(response.status).toBe(200);
  });
});

// CATEGORY ENDPOINTS
describe("Category Endpoint", () => {
  test("POST /users should create a new category and return success", async () => {
    const response = await request(app)
      .post("/Category")
      .set({ Authorization: "Auth" })
      .send({
        name: "Perfume",
      });
    expect(response.status).toBe(201);
  });

  test("GET /should get a Category return success", async () => {
    const response = await request(app)
      .get("/Category")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("GET /Category/:id should get a item by id return success", async () => {
    const response = await request(app)
      .get("/Category/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("PUT /Category/:id should update a item by id return success", async () => {
    const response = await request(app)
      .put("/Category/1")
      .set({ authorization: "Auth" })
      .send({
        name: "Perfume Masculino",
      });
    expect(response.status).toBe(200);
  });

  test("DELETE /Category/:id should delete a item by id return success", async () => {
    const response = await request(app)
      .delete("/Category/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });
});

// PRODUCT ENDPOINTS
describe("Product Endpoint", () => {
  test("POST /users should create a new product and return success", async () => {
    const response = await request(app)
      .post("/products")
      .set({ Authorization: "Auth" })
      .send({
        id_product: 1,
        name: "212 black",
        description: "Fragrancia incomparavel",
        price: "50.00",
        stock: "50",
        ID_category: "1",
      });
    expect(response.status).toBe(201);
  });

  test("GET /should get a item return success", async () => {
    const response = await request(app)
      .get("/Products")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("GET /products/:id should get a item by id return success", async () => {
    const response = await request(app)
      .get("/products/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("PUT /products/:id should update a item by id return success", async () => {
    const response = await request(app)
      .put("/products/1")
      .set({ authorization: "Auth" })
      .send({
        id_product: "1",
        name: "212 black",
        description: "Cheira bem",
        price: "50.00",
        stock: "40",
        ID_category: 1,
      });
    expect(response.status).toBe(200);
  });

  test("DELETE /products/:id should delete a item by id return success", async () => {
    const response = await request(app)
      .delete("/products/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });
});

describe("comment Endpoint", () => {
  test("POST /users should create a new comment and return success", async () => {
    const response = await request(app)
      .post("/comment")
      .set({ Authorization: "Auth" })
      .send({
        id_user: "1",
        id_product: "1",
        content: "legal meu",
        rating: "5",
        creation_date: "",
      });
    expect(response.status).toBe(201);
  });

  test("GET /should get a comment return success", async () => {
    const response = await request(app)
      .get("/comment")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("GET /comment/:id should get a comment by id return success", async () => {
    const response = await request(app)
      .get("/comment/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  test("PUT /comment/:id should update a comment by id return success", async () => {
    const response = await request(app)
      .put("/comment/1")
      .set({ authorization: "Auth" })
      .send({
        id_user: "1",
        id_product: "1",
        content: "legal meu(porém editado)",
        rating: "3",
        creation_date: "01-01-2023",
      });
    expect(response.status).toBe(200);
  });

  test("DELETE /comment/:id should delete a comment by id return success", async () => {
    const response = await request(app)
      .delete("/comment/1")
      .set({ authorization: "Auth" });
    expect(response.status).toBe(200);
  });
});

// PRODUCT ENDPOINTS
describe("Product Endpoint", () => {
  test("POST /users should create a new product and return success", async () => {
    const response = await request(app)
      .post("/products")
      .set({ Authorization: "Auth" })
      .send({
        id_product: 1,
        name: "212 black",
        description: "Fragrancia incomparavel",
        price: "50.00",
        stock: "50",
        ID_category: "1",
      });
    expect(response.status).toBe(201);
  });

  test("GET /should get a item return success", async () => {
    const response = await request(app)
      .get("/Products")
      .set({ authorization: "Auth" });

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
