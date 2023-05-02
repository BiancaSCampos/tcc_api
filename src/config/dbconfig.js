import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "medcare",
});

connection.connect((err) => {
  if (err) {
    console.log("Error to connect database", err);
  } else {
    console.log("Connection established");
  }
});

export default connection;
