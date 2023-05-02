import express from "express";

import { findAll, findByUser } from "../models/medico.js";

const router = express.Router();
const app = express();

// Criar um novo recurso
router.post("/", (req, res) => {
  // TODO: implementar
});

// Ler todos os recursos
router.get("/all", async (req, res) => {
  findAll((result) => {
    res.json(result);
  });
  console.log("====================================");
  console.log("alou");
  console.log("====================================");
});

//Ler um recurso específico
router.get("/", async (req, res) => {
  console.log("====================================");
  console.log(req.query.user);
  console.log("====================================");

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
