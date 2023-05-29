import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import * as authController from "../../controllers/auth.js";
import dotenv from "dotenv";
import router from "../auth.js";
dotenv.config();

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota de autenticação", () => {
  let app;
  let verifyUserStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função verifyUser
    verifyUserStub = sinon
      .stub(authController, "verifyUser")
      .resolves({ id: "123456789" });

    app.use(express.json());
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    verifyUserStub.restore();
  });

  it("deve retornar um token JWT válido ao autenticar o usuário", async () => {
    const username = "john.doe";
    const password = "password123";

    const res = await chai.request(app).post("/").send({ username, password });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).to.have.property("userId", "123456789");
  });

  it("deve retornar um erro 401 para credenciais inválidas", async () => {
    // Altera o comportamento do stub para retornar null
    verifyUserStub.resolves(null);

    const username = "john.doe";
    const password = "wrongpassword";

    const res = await chai.request(app).post("/").send({ username, password });

    expect(res).to.have.status(401);
    expect(res.body).to.have.property("message", "Credenciais inválidas");
  });
});
