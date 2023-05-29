import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as sinaisVitaisModel from "../../models/sinais_vitais.js";
import router from "../sinais_vitais.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota /sinais_vitais/:id", () => {
  let app;
  let findByPatientStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função findByPatient
    findByPatientStub = sinon.stub(sinaisVitaisModel, "findByPatient");
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    findByPatientStub.restore();
  });

  it("deve retornar os sinais vitais do paciente", async () => {
    const pacienteId = "123"; // ID fictício para teste
    const sinaisVitaisMock = { temperatura: 36.5, pressao: "120/80" };

    // Configura o stub para retornar os sinais vitais mock
    findByPatientStub.withArgs(pacienteId).resolves(sinaisVitaisMock);

    const res = await chai.request(app).get(`/${pacienteId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(sinaisVitaisMock);
  });

  it("deve retornar status 500 em caso de erro interno do servidor", async () => {
    const pacienteId = "123"; // ID fictício para teste

    // Configura o stub para lançar um erro
    findByPatientStub
      .withArgs(pacienteId)
      .rejects(new Error("Erro interno do servidor"));

    const res = await chai.request(app).get(`/${pacienteId}`);

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });
});
