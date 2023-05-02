import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import medicoRouter from "./routes/medico.js";
import pacienteRouter from "./routes/paciente.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/medicos", medicoRouter);
app.use("/pacientes", pacienteRouter);
app.use("/login", authRouter);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
