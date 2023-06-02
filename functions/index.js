import express from "express";
import { json } from "body-parser";
import cors from "cors";
import medicoRouter from "../src/routes/medico.js";
import pacienteRouter from "../src/routes/paciente.js";
import authRouter from "../src/routes/auth.js";
import atendimentoRouter from "../src/routes/atendimento.js";
import sinalizacaoRouter from "../src/routes/sinalizacoes.js";
import examesRouter from "../src/routes/exame.js";
import sinaisVitaisRouter from "../src/routes/sinais_vitais.js";
import serverless from "serverless-http";

const app = express();

app.use(json());
app.use(cors());

app.use("/.netlify/functions/api/medicos", medicoRouter);
app.use("/.netlify/functions/api/pacientes", pacienteRouter);
app.use("/.netlify/functions/api/login", authRouter);
app.use("/.netlify/functions/api/atendimento", atendimentoRouter);
app.use("/.netlify/functions/api/sinalizacoes", sinalizacaoRouter);
app.use("/.netlify/functions/api/exames", examesRouter);
app.use("/.netlify/functions/api/sinais-vitais", sinaisVitaisRouter);

export const handler = serverless(app);

// app.listen(3089, () => {
//   console.log("Servidor iniciado na porta 3089");
// });
