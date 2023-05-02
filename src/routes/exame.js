import express from "express";

import { findAll } from "../models/exame.js";

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
router.get("/:id", (req, res) => {
  // TODO: implementar
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
