import express from "express";

import { findAll, findByUser } from "../models/medico.js";

const router = express.Router();
const app = express();

// Ler todos os recursos
router.get("/all", async (req, res) => {
  findAll((result) => {
    res.json(result);
  });
});

//Ler um recurso específico
router.get("/", async (req, res) => {
  const user = req.query.user;
  try {
    const doctor = await findByUser(user);
    if (!doctor || doctor.length === 0) {
      return res.status(404).json({ message: "Médico não encontrado" });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.use("/", router);

export default router;
