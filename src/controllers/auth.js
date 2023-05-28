import { findByUser } from "../models/medico.js";

export async function verifyUser(username, password) {
  const data = await findByUser(username);

  if (!data || data.length === 0) {
    return null;
  }

  const user = JSON.parse(JSON.stringify(data));

  const isPasswordCorrect = password === user[0].senha;

  if (!isPasswordCorrect) {
    return null;
  }

  return user;
}
