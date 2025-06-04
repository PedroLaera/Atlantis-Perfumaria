import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { error } from "console";
import bcrypt from "bcrypt";
import {
  validateUserData,
  hashPassword,
  updateUserData,
} from "../services/userValidationService";
import { AuthRequest } from "../middleware/authMiddleware";
import { Op } from "sequelize";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // pagina atual
    const limit = parseInt(req.query.limit as string) || 5; // total pag
    const offset = (page - 1) * limit;

    const { count, rows } = await UserModel.findAndCountAll({
      limit,
      offset,
      order: [["name", "ASC"]], // ordena
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro ao listar usuários", details: error.message });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  return res.json(user);
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, CPF } = req.body;

    // Verifica se o email ou CPF já existem
    const existingUser = await UserModel.findOne({
      where: {
        [Op.or]: [{ email }, { CPF }],
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "CPF";
      return res.status(400).json({ error: `${field} já cadastrado.` });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      CPF,
    });

    return res.status(201).json({
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      CPF: user.CPF,
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error.message });
  }
};

export const updaterUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, password, address } = req.body;

    const validationError = await updateUserData(name, password, address);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userIdFromToken = req.user.id_user;
    const userIdFromParams = parseInt(req.params.id);

    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({
        error: "Você não tem permissão para alterar os dados de outro usuário.",
      });
    }

    const user = await UserModel.findByPk(userIdFromToken);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name;
    user.password = password ?? user.password;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro no servidor", details: error.message });
  }
};

export const DestroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno do servidor" + error);
  }
};
