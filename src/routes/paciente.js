import express from "express";
import { findAll } from "../models/paciente.js";

const router = express.Router();
const app = express();

// Ler todos os recursos
router.get("/", async (req, res) => {
  try {
    const result = await findAll();
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
    res.status(500).json({ error: "Erro ao buscar pacientes" });
  }
});

app.use("/", router);

export default router;
