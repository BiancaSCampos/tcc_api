import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as pacienteModel from "../../models/paciente.js";
import router from "../atendimento.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota /medicos/:id/pacientes", () => {
  let app;
  let findByMedicStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função findByMedic
    findByMedicStub = sinon.stub(pacienteModel, "findByMedic");
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    findByMedicStub.restore();
  });

  it("deve retornar uma lista de pacientes do médico", async () => {
    const medicId = "123"; // Id fictício para teste
    const pacientesMock = [{ nome: "Paciente 1" }, { nome: "Paciente 2" }];

    // Configura o stub para retornar a lista de pacientes mock
    findByMedicStub.withArgs(medicId).resolves(pacientesMock);

    const res = await chai.request(app).get(`/medicos/${medicId}/pacientes`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(pacientesMock);
  });
});
