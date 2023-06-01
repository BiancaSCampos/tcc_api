import { executeQuery } from "../config/dbconfig.js";

export async function findAll() {
  const query = "SELECT * FROM paciente";
  try {
    const result = await executeQuery(query);
    return result;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}

export async function findByMedic(id) {
  const query = `
    SELECT * FROM sql10623048.paciente
    JOIN sql10623048.atendimento ON paciente.idpaciente = atendimento.paciente_idpaciente
    WHERE atendimento.id_medico = ?
    ORDER BY paciente.nome ASC
  `;
  const params = [id];
  try {
    const result = await executeQuery(query, params);
    return result;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    throw err;
  }
}
