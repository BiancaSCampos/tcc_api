import express from "express";
import { findAll } from "../models/paciente.js";

const router = express.Router();
const app = express();

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

app.use("/", router);

export default router;
