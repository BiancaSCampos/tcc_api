import express from "express";
import jwt from "jsonwebtoken";
import { verifyUser } from "../controllers/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Criar um novo recurso
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário existe e se a senha está correta
  const user = await verifyUser(username, password);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  // Gerar um token JWT para o usuário
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  // Retornar o token JWT para o cliente
  res.json({ token });
});

export default router;
