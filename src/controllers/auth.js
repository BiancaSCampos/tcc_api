// auth.js

// 1. Importar as dependências necessárias
import { findByUser } from "../models/medico.js";

// 2. Definir as funções para cada etapa da autenticação

// Verificar se o usuário existe no banco de dados
export async function verifyUser(username, password) {
  const data = await findByUser(username);

  const user = JSON.parse(JSON.stringify(data));

  if (!user) {
    return null;
  }

  // Verificar se a senha está correta
  const isPasswordCorrect = password === user[0].senha;

  // Se a senha estiver incorreta, retornar null
  if (!isPasswordCorrect) {
    return null;
  }

  // Retornar o usuário autenticado
  return user;
}
