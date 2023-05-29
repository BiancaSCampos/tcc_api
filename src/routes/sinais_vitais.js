import express from "express";
import { findByPatient } from "../models/sinais_vitais.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const sinaisVitais = await findByPatient(idPaciente);
    res.json(sinaisVitais);
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
