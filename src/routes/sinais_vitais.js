import express from "express";
import { findByPatient } from "../models/sinais_vitais.js";

const router = express.Router();
const app = express();

router.get("/:id", async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const sinaisVitais = await findByPatient(idPaciente);
    res.json(sinaisVitais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.use("/", router);

export default router;
