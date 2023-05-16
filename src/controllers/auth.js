import { findByUser } from "../models/medico.js";

export async function verifyUser(username, password) {
  const data = await findByUser(username);

  const user = await JSON.parse(JSON.stringify(data));
  if (!user) {
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  const isPasswordCorrect = password === user[0].senha;

  if (!isPasswordCorrect) {
    return null;
  }

  return user;
}
