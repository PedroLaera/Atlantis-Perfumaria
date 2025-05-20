import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Produtcs = await ProductModel.findAll();
    res.status(200).json(Produtcs);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getProdutcsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    return res.status(200).json(Produtcs);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createProdutcs = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, ID_category } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Produto válida" });
    }

    const Produtcs = await ProductModel.create({
      name,
      description,
      price,
      stock,
      ID_category,
    });

    return res.status(201).json(Produtcs);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id_product, name, description, price, stock, ID_category } =
      req.body;

    if (!id_product || id_product.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Produto válido" });
    }

    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    Produtcs.id_product = id_product;
    Produtcs.name = name ?? Produtcs.name;
    Produtcs.description = description ?? Produtcs.description;
    Produtcs.price = price ?? Produtcs.price;
    Produtcs.stock = stock ?? Produtcs.stock;
    Produtcs.ID_category = ID_category ?? Produtcs.ID_category;

    await Produtcs.save();

    return res.status(200).json(Produtcs);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyProdutcsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    await Produtcs.destroy();
    return res.status(200).json({ message: "Produto deletada com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};
