import { connection } from "../config/dbconfig.js";

function criar(exame, callback) {
  connection.query("INSERT INTO exame SET ?", exame, callback);
}

function findByID(id, callback) {
  connection.query("SELECT * FROM exame WHERE id = ?", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

export function findAll(callback) {
  connection.query("SELECT * FROM exame", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

function atualizar(id, exame, callback) {
  connection.query("UPDATE exame SET ? WHERE id = ?", [exame, id], callback);
}

function excluir(id, callback) {
  connection.query("DELETE FROM exame WHERE id = ?", id, callback);
}
