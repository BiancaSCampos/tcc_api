import { executeQuery } from "../../config/dbconfig.js";
import { findByPatient } from "../sinalizacoes.js";

jest.mock("../../config/dbconfig.js");

describe("findByPatient", () => {
  it("should return the result when the query is successful", async () => {
    const id = 123;
    const expectedResults = [{ id: 1, description: "Sample sinalizacao" }];

    // Mocking the executeQuery function to return the expected results
    executeQuery.mockResolvedValue(expectedResults);

    const result = await findByPatient(id);

    expect(result).toEqual(expectedResults);
    expect(executeQuery).toHaveBeenCalledWith(
      "SELECT * FROM medcare.sinalizacoes WHERE id_paciente = ?",
      [id]
    );
  });

  it("should throw an error when the query fails", async () => {
    const id = 123;
    const errorMessage = "Database error";

    // Mocking the executeQuery function to throw an error
    executeQuery.mockRejectedValue(new Error(errorMessage));

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    await expect(findByPatient(id)).rejects.toThrow(errorMessage);
    expect(executeQuery).toHaveBeenCalledWith(
      "SELECT * FROM medcare.sinalizacoes WHERE id_paciente = ?",
      [id]
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao executar a consulta:",
      new Error(errorMessage)
    );

    consoleErrorMock.mockRestore();
  });
});
