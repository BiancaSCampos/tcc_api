import { connection } from "../config/dbconfig.js";

function criar(paciente, callback) {
  connection.query("INSERT INTO paciente SET ?", paciente, callback);
}

function findByID(id, callback) {
  connection.query("SELECT * FROM paciente WHERE id = ?", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

export function findAll(callback) {
  connection.query("SELECT * FROM paciente", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

export function findByPatient(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM medcare.sinalizacoes WHERE id_paciente = ?",
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

function atualizar(id, paciente, callback) {
  connection.query(
    "UPDATE paciente SET ? WHERE id = ?",
    [paciente, id],
    callback
  );
}

function excluir(id, callback) {
  connection.query("DELETE FROM paciente WHERE id = ?", id, callback);
}
