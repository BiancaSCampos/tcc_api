import { connection } from "../config/dbconfig.js";

export function findByPatient(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM medcare.sinais_vitais WHERE id_paciente = ?",
      [id],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
