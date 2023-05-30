import { executeQuery, getConnection } from "../config/dbconfig.js";

export async function findAll(callback) {
  const query = "SELECT * FROM exame";
  try {
    const results = await executeQuery(query, []);
    return results;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}

export async function findByPatient(id) {
  const query =
    "SELECT * FROM medcare.exame JOIN medcare.status_exame ON exame.status_id = status_exame.idstatus_exame WHERE paciente_idpaciente = ?";
  const params = [id];
  try {
    const results = await executeQuery(query, params);
    return results;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}
