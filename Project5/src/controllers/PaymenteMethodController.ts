/*import { Request, Response } from "express";
import PaymentMethodModel from "../models/PaymentMethodModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const PaymentMethod = await PaymentMethodModel.findAll();
    res.status(200).json(PaymentMethod);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getPaymentMethodById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const PaymentMethod = await PaymentMethodModel.findByPk(req.params.id);

    if (!PaymentMethod) {
      return res
        .status(404)
        .json({ error: "Método De Pagamento não encontrada" });
    }

    return res.status(200).json(PaymentMethod);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createPaymentMethod = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Método De Pagamento  válido" });
    }

    const PaymentMethod = await PaymentMethodModel.create({ name });
    return res.status(201).json(PaymentMethod);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updatePaymentMethod = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Método De Pagamento válido" });
    }

    const PaymentMethod = await PaymentMethodModel.findByPk(req.params.id);

    if (!PaymentMethod) {
      return res
        .status(404)
        .json({ error: "Método De Pagamento não encontrada" });
    }

    PaymentMethod.name = name;

    await PaymentMethod.save();

    return res.status(200).json(PaymentMethod);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyPaymentMethodById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const PaymentMethod = await PaymentMethodModel.findByPk(req.params.id);

    if (!PaymentMethod) {
      return res
        .status(404)
        .json({ error: "Método De Pagamento não encontrada" });
    }

    await PaymentMethod.destroy();
    return res
      .status(200)
      .json({ message: "Método De Pagamento deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};*/
