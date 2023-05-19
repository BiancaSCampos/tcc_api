import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import medicoRouter from "./routes/medico.js";
import pacienteRouter from "./routes/paciente.js";
import authRouter from "./routes/auth.js";
import atendimentoRouter from "./routes/atendimento.js";
import sinalizacaoRouter from "./routes/sinalizacoes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/medicos", medicoRouter);
app.use("/pacientes", pacienteRouter);
app.use("/login", authRouter);
app.use("/atendimento", atendimentoRouter);
app.use("/sinalizacoes", sinalizacaoRouter);

app.listen(3089, () => {
  console.log("Servidor iniciado na porta 3089");
});
