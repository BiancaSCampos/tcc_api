import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10, // limite máximo de conexões no pool
  host: "sql10.freemysqlhosting.net",
  user: "sql10623048",
  password: "EVtvXH5vYd",
  database: "sql10623048",
});

export const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

export const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .then((connection) => {
        connection.query(query, params, (err, results, fields) => {
          connection.release(); // Libera a conexão de volta para o pool
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
