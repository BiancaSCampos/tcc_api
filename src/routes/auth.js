import express from "express";
import jwt from "jsonwebtoken";
import { verifyUser } from "../controllers/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await verifyUser(username, password);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({ token });
});

export default router;
