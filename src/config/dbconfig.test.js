import { getConnection, executeQuery } from "./dbconfig";

jest.mock("mysql", () => {
  const mockConnection = {
    query: jest.fn(),
    release: jest.fn(),
  };

  const mockPool = {
    getConnection: jest.fn((callback) => {
      callback(null, mockConnection);
    }),
    releaseConnection: jest.fn(),
  };

  return {
    createPool: jest.fn(() => mockPool),
  };
});

describe("MySQL Utils", () => {
  describe("getConnection", () => {
    test("should resolve with a connection object", async () => {
      const connection = await getConnection();
      expect(connection).toBeDefined();
      expect(connection.query).toEqual(expect.any(Function));
      expect(connection.release).toEqual(expect.any(Function));
    });

    test("should reject with an error if getConnection fails", async () => {
      const error = new Error("Connection failed");
      const mockPool = require("mysql").createPool();
      mockPool.getConnection.mockImplementationOnce((callback) => {
        callback(error);
      });

      await expect(getConnection()).rejects.toThrow(error);
      expect(mockPool.getConnection).toHaveBeenCalled();
      expect(mockPool.releaseConnection).not.toHaveBeenCalled();
    });
  });

  describe("executeQuery", () => {
    const query = "SELECT * FROM medico";

    test("should resolve with query results", async () => {
      const mockResults = [{ id: 1, usuario: "ana" }];
      const connection = await getConnection();
      connection.query.mockImplementationOnce((_, __, callback) => {
        callback(null, mockResults);
      });

      const results = await executeQuery(query);
      expect(results).toEqual(mockResults);
      expect(connection.query).toHaveBeenCalledWith(
        query,
        [],
        expect.any(Function)
      );
      expect(connection.release).toHaveBeenCalled();
    });

    test("should reject with an error if query execution fails", async () => {
      const error = new Error("Query execution failed");
      const connection = await getConnection();
      connection.query.mockImplementationOnce((_, __, callback) => {
        callback(error);
      });

      await expect(executeQuery(query)).rejects.toThrow(error);
      expect(connection.query).toHaveBeenCalledWith(
        query,
        [],
        expect.any(Function)
      );
      expect(connection.release).toHaveBeenCalled();
    });
  });
});
