import express from "express";

import { findAll, findByPatient } from "../models/exame.js";

const router = express.Router();
const app = express();

// Criar um novo recurso
router.post("/", (req, res) => {
  // TODO: implementar
});

// Ler todos os recursos
router.get("/", async (req, res) => {
  findAll((result) => {
    res.json(result);
  });
});

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

// Atualizar um recurso
router.put("/:id", (req, res) => {
  // TODO: implementar
});

// Excluir um recurso
router.delete("/:id", (req, res) => {
  // TODO: implementar
});

app.use("/", router);

export default router;
