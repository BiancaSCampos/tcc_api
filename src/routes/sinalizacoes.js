import express from "express";
import { findByPatient } from "../models/sinalizacoes.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const sinalizacoes = await findByPatient(idPaciente);
    res.json(sinalizacoes);
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
