import { findByUser } from "../models/medico";
import { verifyUser } from "./auth";

// Mocking the findByUser function
jest.mock("../models/medico.js", () => ({
  findByUser: jest.fn(),
}));

describe("verifyUser", () => {
  it("should return null if user does not exist", async () => {
    const username = "testuser";
    const password = "testpassword";
    const findByUserMock = findByUser.mockResolvedValue([]);

    const result = await verifyUser(username, password);

    expect(findByUserMock).toHaveBeenCalledWith(username);
    expect(result).toBeNull();
  });

  it("should return null if password is incorrect", async () => {
    const username = "testuser";
    const password = "testpassword";
    const user = {
      id: 1,
      username: "testuser",
      senha: "correctpassword",
    };
    const findByUserMock = findByUser.mockResolvedValue([user]);

    const result = await verifyUser(username, password);

    expect(findByUserMock).toHaveBeenCalledWith(username);
    expect(result).toBeNull();
  });

  it("should return the user if username and password are correct", async () => {
    const username = "testuser";
    const password = "testpassword";
    const user = {
      id: 1,
      username: "testuser",
      senha: "testpassword",
    };
    const findByUserMock = findByUser.mockResolvedValue([user]);

    const result = await verifyUser(username, password);

    expect(findByUserMock).toHaveBeenCalledWith(username);
    expect(result).toEqual([user]);
  });
});
