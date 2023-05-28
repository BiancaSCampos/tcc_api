import { findAll, findByPatient } from "../exame.js";
import { executeQuery } from "../../config/dbconfig.js";

// Mocking the executeQuery function
jest.mock("../../config/dbconfig.js", () => ({
  executeQuery: jest.fn(),
}));

describe("findAll", () => {
  it("should return results when executeQuery succeeds", async () => {
    const expectedResults = [
      { id: 1, name: "Exam 1" },
      { id: 2, name: "Exam 2" },
    ];
    executeQuery.mockResolvedValue(expectedResults);

    const results = await findAll();

    expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM exame", []);
    expect(results).toEqual(expectedResults);
  });

  it("should throw an error when executeQuery fails", async () => {
    // Mocking the executeQuery function to throw an error
    const errorMessage = "Database error";
    executeQuery.mockRejectedValue(new Error(errorMessage));

    // Creating a mock for console.error
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    await expect(findAll()).rejects.toThrow(errorMessage);
    expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM exame", []);

    // Verifying the console.error mock
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao executar a consulta:",
      new Error(errorMessage)
    );

    // Restoring the original implementation of console.error
    consoleErrorMock.mockRestore();
  });
});

describe("findByPatient", () => {
  it("should return results when executeQuery succeeds", async () => {
    const expectedResults = [
      { id: 1, name: "Exam 1" },
      { id: 2, name: "Exam 2" },
    ];
    const patientId = 123;
    const expectedQuery = "SELECT * FROM exame WHERE paciente_idpaciente = ?";
    const expectedParams = [patientId];
    executeQuery.mockResolvedValue(expectedResults);

    const results = await findByPatient(patientId);

    expect(executeQuery).toHaveBeenCalledWith(expectedQuery, expectedParams);
    expect(results).toEqual(expectedResults);
  });

  it("should throw an error when executeQuery fails", async () => {
    // Mocking the executeQuery function to throw an error
    const errorMessage = "Database error";
    executeQuery.mockRejectedValue(new Error(errorMessage));

    // Creating a mock for console.error
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    const id = 1; // Specify the desired ID for the findByPatient test

    await expect(findByPatient(id)).rejects.toThrow(errorMessage);
    expect(executeQuery).toHaveBeenCalledWith(
      "SELECT * FROM exame WHERE paciente_idpaciente = ?",
      [id]
    );

    // Verifying the console.error mock
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao executar a consulta:",
      new Error(errorMessage)
    );

    // Restoring the original implementation of console.error
    consoleErrorMock.mockRestore();
  });
});
