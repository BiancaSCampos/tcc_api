import express from "express";
import { findByMedic } from "../models/paciente.js";

const router = express.Router();
const app = express();

//Ler um recurso específico
router.get("/medicos/:id/pacientes", async (req, res) => {
  const idMedico = req.params.id;
  try {
    const pacientes = await findByMedic(idMedico);
    res.json(pacientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.use("/", router);

export default router;
