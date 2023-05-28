import { executeQuery } from "../config/dbconfig.js";

export function findByUser(user) {
  const query = `SELECT * FROM medico WHERE usuario = ?`;
  const params = [user];
  return executeQuery(query, params);
}

export async function findAll(callback) {
  const query = "SELECT * FROM medico";
  try {
    const results = await executeQuery(query, []);
    return results;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}
