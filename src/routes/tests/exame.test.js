import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as examModel from "../../models/exame.js";
import router from "../exame.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para a rota /:id", () => {
  let app;
  let findByPatientStub;

  beforeEach(() => {
    app = express();

    // Cria um stub para a função findByPatient
    findByPatientStub = sinon.stub(examModel, "findByPatient");
    app.use("/", router);
  });

  afterEach(() => {
    // Restaura a função original após cada teste
    findByPatientStub.restore();
  });

  it("deve retornar os exames do paciente especificado", async () => {
    const idPaciente = "123"; // Defina um ID de paciente válido para teste
    const examesMock = [{ exame: "Exame 1" }, { exame: "Exame 2" }];

    // Configura o stub para retornar a lista de exames mock
    findByPatientStub.withArgs(idPaciente).resolves(examesMock);

    const res = await chai.request(app).get(`/${idPaciente}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(examesMock);
  });

  it("deve retornar um erro interno do servidor em caso de falha", async () => {
    const idPaciente = "456"; // Defina um ID de paciente que cause uma falha no findByPatient()

    // Configura o stub para lançar um erro
    findByPatientStub.withArgs(idPaciente).throws(new Error("Erro interno"));

    const res = await chai.request(app).get(`/${idPaciente}`);

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });

  it("deve retornar um erro interno do servidor quando o findByPatient falhar", async () => {
    const idPaciente = "789"; // Defina um ID de paciente para teste
    const errorMessage = "Erro ao buscar exames do paciente";

    // Configura o stub para lançar um erro personalizado
    findByPatientStub.withArgs(idPaciente).throws(new Error(errorMessage));

    const res = await chai.request(app).get(`/${idPaciente}`);

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });
});
