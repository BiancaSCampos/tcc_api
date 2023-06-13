import mysql from "mysql";

const pool = mysql.createPool({
  host: "medcare.mysql.database.azure.com",
  user: "biancadb",
  password: "Medcare2023",
  database: "medcare",
  port: 3306,
});

export const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        reject(err);
      } else {
        console.log("====================================");
        console.log("conectou");
        console.log("====================================");
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
            console.log("====================================");
            console.log(err);
            console.log("====================================");

            reject(err);
          } else {
            console.log("====================================");
            console.log(results);
            console.log("====================================");

            resolve(results);
          }
        });
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        reject(err);
      });
  });
};
