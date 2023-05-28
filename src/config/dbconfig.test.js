import mysql from "mysql";
import connection from "./dbconfig";

describe("Database Connection", () => {
  beforeAll((done) => {
    connection.connect((err) => {
      if (err) {
        console.log("Error to connect database", err);
        done();
      } else {
        console.log("Connection established");
        done();
      }
    });
  });

  afterAll((done) => {
    connection.end((err) => {
      if (err) {
        console.log("Error to disconnect database", err);
        done();
      } else {
        console.log("Connection closed");
        done();
      }
    });
  });

  it("should establish a database connection", (done) => {
    connection.on("connect", () => {
      expect(connection.state).toBe("connected");
      done();
    });
  });

  it("should be disconnected after ending the connection", (done) => {
    connection.end((err) => {
      if (err) {
        console.log("Error to disconnect database", err);
        done();
      }
    });

    connection.on("end", () => {
      expect(connection.state).toBe("disconnected");
      done();
    });
  });

  it("should handle connection error", (done) => {
    const invalidConnection = mysql.createConnection({
      host: "invalidhost",
      user: "invaliduser",
      password: "invalidpassword",
      database: "invaliddatabase",
    });

    invalidConnection.connect((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
