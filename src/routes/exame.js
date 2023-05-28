import express from "express";

import { findByPatient } from "../models/exame.js";

const router = express.Router();
const app = express();

// Ler um recurso específico
router.get("/:id", async (req, res) => {
  // TODO: implementar
  const idPaciente = req.params.id;
  try {
    const exames = await findByPatient(idPaciente);
    res.json(exames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.use("/", router);

export default router;
