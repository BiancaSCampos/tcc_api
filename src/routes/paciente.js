import express from "express";
import { findAll } from "../models/paciente.js";

const router = express.Router();

// Ler todos os recursos
router.get("/", async (req, res) => {
  try {
    const result = await findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
