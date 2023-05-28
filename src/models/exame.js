import { connection } from "../config/dbconfig.js";

export function findAll(callback) {
  connection.query("SELECT * FROM exame", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

export function findByPatient(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM exame WHERE paciente_idpaciente = ?`,
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
