import { connection } from "../config/dbconfig.js";

export function findByUser(user) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM medico WHERE usuario = ?`,
      [user],
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

export function findAll(callback) {
  connection.query("SELECT * FROM medico", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}
