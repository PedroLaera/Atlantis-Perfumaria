import { Request, Response } from "express";
import User from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Senha inválida" });
  }

  const token = generateToken(user.id_user, user.email);

  res.status(200).json({
    message: "Usuario Logado Com Sucesso",
    token,
    id_user: user.id_user,
  });
};
