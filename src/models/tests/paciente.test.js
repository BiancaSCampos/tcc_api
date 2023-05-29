import { executeQuery } from "../../config/dbconfig";
import { findAll, findByMedic } from "../paciente.js";

jest.mock("../../config/dbconfig.js");

describe("Paciente Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should execute the query and return the result", async () => {
      const expectedResult = [{ id: 1, nome: "John Doe" }];
      executeQuery.mockResolvedValue(expectedResult);

      const result = await findAll();

      expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM paciente");
      expect(result).toEqual(expectedResult);
    });

    it("should throw an error when executeQuery fails", async () => {
      const errorMessage = "Database error";
      executeQuery.mockRejectedValue(new Error(errorMessage));

      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation();

      await expect(findAll()).rejects.toThrow(errorMessage);
      expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM paciente");

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Erro ao executar a consulta:",
        new Error(errorMessage)
      );

      consoleErrorMock.mockRestore();
    });
  });

  describe("findByMedic", () => {
    it("should execute the query with the provided ID and return the result", async () => {
      const id = 123;
      const expectedResult = [{ id: 1, nome: "John Doe" }];
      executeQuery.mockResolvedValue(expectedResult);

      const result = await findByMedic(id);

      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM medcare.paciente"),
        [id]
      );
      expect(result).toEqual(expectedResult);
    });

    it("should throw an error when executeQuery fails", async () => {
      const id = 123;
      const errorMessage = "Database error";
      executeQuery.mockRejectedValue(new Error(errorMessage));

      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation();

      await expect(findByMedic(id)).rejects.toThrow(errorMessage);
      expect(executeQuery).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM medcare.paciente"),
        [id]
      );

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Erro ao executar a consulta:",
        new Error(errorMessage)
      );

      consoleErrorMock.mockRestore();
    });
  });
});
