import express from "express";
import { findByPatient } from "../models/exame.js";

const router = express.Router();

// Ler um recurso específico
router.get("/:id", async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const exames = await findByPatient(idPaciente);
    res.json(exames);
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
