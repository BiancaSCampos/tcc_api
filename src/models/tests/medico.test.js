import { findByUser, findAll } from "../medico.js";
import { executeQuery } from "../../config/dbconfig.js";

// Mocking the executeQuery function
jest.mock("../../config/dbconfig.js", () => ({
  executeQuery: jest.fn(),
}));

describe("findByUser", () => {
  it("should return results when user exists", async () => {
    // Mocking the executeQuery function to return mock results
    executeQuery.mockResolvedValue([
      { id: 1, name: "John Doe", usuario: "johndoe" },
    ]);

    const user = "johndoe";
    const expectedResults = [{ id: 1, name: "John Doe", usuario: "johndoe" }];

    const results = await findByUser(user);

    expect(results).toEqual(expectedResults);
    expect(executeQuery).toHaveBeenCalledWith(
      "SELECT * FROM medico WHERE usuario = ?",
      ["johndoe"]
    );
  });

  it("should return an empty array when user does not exist", async () => {
    // Mocking the executeQuery function to return no results
    executeQuery.mockResolvedValue([]);

    const user = "nonexistentuser";
    const expectedResults = [];

    const results = await findByUser(user);

    expect(results).toEqual(expectedResults);
    expect(executeQuery).toHaveBeenCalledWith(
      "SELECT * FROM medico WHERE usuario = ?",
      ["nonexistentuser"]
    );
  });
});

describe("findAll", () => {
  it("should return all results", async () => {
    // Mocking the executeQuery function to return mock results
    executeQuery.mockResolvedValue([
      { id: 1, name: "John Doe", usuario: "johndoe" },
      { id: 2, name: "Jane Smith", usuario: "janesmith" },
    ]);

    const expectedResults = [
      { id: 1, name: "John Doe", usuario: "johndoe" },
      { id: 2, name: "Jane Smith", usuario: "janesmith" },
    ];

    const results = await findAll();

    expect(results).toEqual(expectedResults);
    expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM medico", []);
  });

  it("should throw an error when executeQuery fails", async () => {
    // Mocking the executeQuery function to throw an error
    const errorMessage = "Database error";
    executeQuery.mockRejectedValue(new Error(errorMessage));

    // Creating a mock for console.error
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    await expect(findAll()).rejects.toThrow(errorMessage);
    expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM medico", []);

    // Verifying the console.error mock
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao executar a consulta:",
      new Error(errorMessage)
    );

    // Restoring the original implementation of console.error
    consoleErrorMock.mockRestore();
  });
});
