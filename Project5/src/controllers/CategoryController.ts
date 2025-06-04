import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getCategoryById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de categoria válido" });
    }

    const category = await CategoryModel.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateCategory = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de categoria válido" });
    }

    const category = await CategoryModel.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    category.name = name;

    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyCategoryById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await category.destroy();
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};
