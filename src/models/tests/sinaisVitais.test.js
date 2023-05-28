import { executeQuery } from "../../config/dbconfig";
import { findByPatient } from "../sinais_vitais.js";

jest.mock("../../config/dbconfig.js");

describe("findByPatient", () => {
  it("should return the result when executeQuery is successful", async () => {
    const id = 1;
    const query = "SELECT * FROM medcare.sinais_vitais WHERE id_paciente = ?";
    const params = [id];
    const expectedResult = [{ id: 1 }]; // Provide expected result here

    executeQuery.mockResolvedValue(expectedResult);

    const result = await findByPatient(id);

    expect(executeQuery).toHaveBeenCalledWith(query, params);
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error when executeQuery fails", async () => {
    const id = 1;
    const query = "SELECT * FROM medcare.sinais_vitais WHERE id_paciente = ?";
    const params = [id];
    const errorMessage = "Database error";

    executeQuery.mockRejectedValue(new Error(errorMessage));

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    await expect(findByPatient(id)).rejects.toThrow(errorMessage);
    expect(executeQuery).toHaveBeenCalledWith(query, params);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Erro ao executar a consulta:",
      new Error(errorMessage)
    );
    consoleErrorMock.mockRestore();
  });
});
