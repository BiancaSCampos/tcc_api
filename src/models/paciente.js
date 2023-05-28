import { connection } from "../config/dbconfig.js";

export function findAll(callback) {
  connection.query("SELECT * FROM paciente", (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

export function findByMedic(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `medcare`.`paciente` JOIN `medcare`.`atendimento` ON `paciente`.`idpaciente` = `atendimento`.`paciente_idpaciente` WHERE `atendimento`.`id_medico` = ? ORDER BY `paciente`.`nome` ASC",
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
