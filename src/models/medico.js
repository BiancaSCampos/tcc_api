import { connection } from "../config/dbconfig.js";

function criar(medico, callback) {
  connection.query("INSERT INTO medico SET ?", medico, callback);
}

function findByID(id, callback) {
  connection.query("SELECT * FROM medico WHERE id = ?", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

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

function atualizar(id, medico, callback) {
  connection.query("UPDATE medico SET ? WHERE id = ?", [medico, id], callback);
}

function excluir(id, callback) {
  connection.query("DELETE FROM medico WHERE id = ?", id, callback);
}
