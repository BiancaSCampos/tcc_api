import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as pacienteModel from "../../models/paciente.js";
import router from "../paciente.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota /pacientes", () => {
  let app;
  let findAllStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função findAll
    findAllStub = sinon.stub(pacienteModel, "findAll");
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    findAllStub.restore();
  });

  it("deve retornar todos os pacientes", async () => {
    const pacientesMock = [{ nome: "Paciente 1" }, { nome: "Paciente 2" }];

    // Configura o stub para retornar a lista de pacientes mock
    findAllStub.resolves(pacientesMock);

    const res = await chai.request(app).get("/");

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(pacientesMock);
  });

  it("deve retornar status 500 em caso de erro interno do servidor", async () => {
    // Configura o stub para lançar um erro
    findAllStub.rejects(new Error("Erro interno do servidor"));

    const res = await chai.request(app).get("/");

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });
});
