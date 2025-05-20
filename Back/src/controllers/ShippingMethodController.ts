/*import { Request, Response } from "express";
import ShippingMethodModel from "../models/ShippingMethodModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const methods = await ShippingMethodModel.findAll();
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getMethodById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res
        .status(404)
        .json({ error: "Método De Entrega não encontrada" });
    }

    return res.status(200).json(Method);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createMethod = async (req: Request, res: Response) => {
  try {
    const { name, shippingCost } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Método De Entrega válido" });
    }

    const Method = await ShippingMethodModel.create({ name, shippingCost });
    return res.status(201).json(Method);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateShippingMethod = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, shippingCost } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Método De Entrega válido" });
    }

    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res
        .status(404)
        .json({ error: "Método De Entrega não encontrada" });
    }

    Method.name = name;
    Method.shippingCost = shippingCost ?? Method.shippingCost;

    await Method.save();

    return res.status(200).json(Method);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyMethodById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res
        .status(404)
        .json({ error: "Método De Entrega não encontrada" });
    }

    await Method.destroy();
    return res
      .status(200)
      .json({ message: "Método De Entrega deletada com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};*/
