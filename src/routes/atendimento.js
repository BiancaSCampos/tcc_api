import express from "express";
import { findByMedic } from "../models/paciente.js";

const router = express.Router();

//Ler um recurso específico
router.get("/medicos/:id/pacientes", async (req, res) => {
  const idMedico = req.params.id;
  try {
    const pacientes = await findByMedic(idMedico);
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
