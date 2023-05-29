import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import sinon from "sinon";
import * as medicoModel from "../../models/medico.js";
import router from "../medico.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes para rota /medicos", () => {
  let app;
  let findAllStub;
  let findByUserStub;

  beforeEach(() => {
    app = express();

    // Cria stubs para as funções findAll e findByUser
    findAllStub = sinon.stub(medicoModel, "findAll");
    findByUserStub = sinon.stub(medicoModel, "findByUser");

    app.use("/", router);
  });

  afterEach(() => {
    // Restaura as funções originais após cada teste
    findAllStub.restore();
    findByUserStub.restore();
  });

  it("deve retornar todos os médicos", async () => {
    const medicosMock = [{ nome: "Médico 1" }, { nome: "Médico 2" }];

    // Configura o stub para retornar a lista de médicos mock
    findAllStub.resolves(medicosMock);

    const res = await chai.request(app).get("/all");

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(medicosMock);
  });

  it("deve retornar um médico específico", async () => {
    const user = "johndoe";
    const medicoMock = { nome: "Dr. John Doe" };

    // Configura o stub para retornar o médico mock
    findByUserStub.withArgs(user).resolves(medicoMock);

    const res = await chai.request(app).get(`/?user=${user}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(medicoMock);
  });

  it("deve retornar status 404 se o médico não for encontrado", async () => {
    const user = "nonexistent";

    // Configura o stub para retornar um médico vazio
    findByUserStub.withArgs(user).resolves(null);

    const res = await chai.request(app).get(`/?user=${user}`);

    expect(res).to.have.status(404);
    expect(res.body).to.deep.equal({ message: "Médico não encontrado" });
  });

  it("deve retornar status 500 em caso de erro interno do servidor - findAll", async () => {
    // Configura o stub para lançar um erro
    findAllStub.rejects(new Error("Erro ao obter todos os médicos"));

    const res = await chai.request(app).get("/all");

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });

  it("deve retornar status 500 em caso de erro interno do servidor - findByUser", async () => {
    const user = "johndoe";

    // Configura o stub para lançar um erro
    findByUserStub.withArgs(user).rejects(new Error("Erro ao buscar médico"));

    const res = await chai.request(app).get(`/?user=${user}`);

    expect(res).to.have.status(500);
    expect(res.body).to.deep.equal({ message: "Erro interno do servidor" });
  });
});
