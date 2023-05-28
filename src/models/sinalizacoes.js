import { executeQuery } from "../config/dbconfig.js";

export async function findByPatient(id) {
  const query = "SELECT * FROM medcare.sinalizacoes WHERE id_paciente = ?";
  const params = [id];
  try {
    const result = await executeQuery(query, params);
    return result;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}
