import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as sinalizacoesModel from "../../models/sinalizacoes.js";
import router from "../sinalizacoes.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota /sinalizacoes/:id", () => {
  let app;
  let findByPatientStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função findByPatient
    findByPatientStub = sinon.stub(sinalizacoesModel, "findByPatient");
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    findByPatientStub.restore();
  });

  it("deve retornar as sinalizações do paciente", async () => {
    const pacienteId = "123"; // ID fictício para teste
    const sinalizacoesMock = [
      { tipo: "A", descricao: "Sinalização A" },
      { tipo: "B", descricao: "Sinalização B" },
    ];

    // Configura o stub para retornar as sinalizações mock
    findByPatientStub.withArgs(pacienteId).resolves(sinalizacoesMock);

    const res = await chai.request(app).get(`/${pacienteId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(sinalizacoesMock);
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
