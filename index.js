import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import medicoRouter from "./src/routes/medico.js";
import pacienteRouter from "./src/routes/paciente.js";
import authRouter from "./src/routes/auth.js";
import atendimentoRouter from "./src/routes/atendimento.js";
import sinalizacaoRouter from "./src/routes/sinalizacoes.js";
import examesRouter from "./src/routes/exame.js";
import sinaisVitaisRouter from "./src/routes/sinais_vitais.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/medicos", medicoRouter);
app.use("/pacientes", pacienteRouter);
app.use("/login", authRouter);
app.use("/atendimento", atendimentoRouter);
app.use("/sinalizacoes", sinalizacaoRouter);
app.use("/exames", examesRouter);
app.use("/sinais-vitais", sinaisVitaisRouter);

app.listen(3089, () => {
  console.log("Servidor iniciado na porta 3089");
});
