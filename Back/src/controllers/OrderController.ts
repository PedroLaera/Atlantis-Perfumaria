/*import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Orders = await OrderModel.findAll();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ error: "Erro Do Servidor", details: error });
  }
};

export const GetOrderById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Orders = await OrderModel.findByPk(req.params.id);

    if (!Orders) {
      return res.status(404).json({ error: "Pedido não encontrada" });
    }

    return res.status(200).json(Orders);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const {
      id_order,
      id_user,
      orderDate,
      totalAmount,
      shippingFee,
      status,
      ID_shippingMethod,
      discount,
    } = req.body;

    /*if (!id_order || id_order.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Pedido válido" });
    }*/

   /* const allowedStatuses = [
      "CART",
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELED",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      req.body.status = "CART";
    }

    const order = await OrderModel.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
      details: error,
    });
  }
};

/*const Orders = await OrderModel.create({
      id_order,
      id_user,
      orderDate,
      totalAmount,
      shippingFee,
      status,
      ID_shippingMethod,
      discount,
    });
    return res.status(201).json(Orders);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};*/

/*export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const {
      id_order,
      id_user,
      orderDate,
      totalAmount,
      shippingFee,
      status,
      ID_shippingMethod,
      discount,
    } = req.body;

    if (!id_order || id_order.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Pedido válido" });
    }

    const order = await OrderModel.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrada" });
    }

    order.id_order = id_order;
    order.id_user = id_user ?? order.id_user;
    order.orderDate = orderDate ?? order.orderDate;
    order.totalAmount = totalAmount ?? order.totalAmount;
    order.shippingFee = shippingFee ?? order.shippingFee;
    order.status = status ?? order.status;
    order.id_shippingMethod = ID_shippingMethod ?? order.id_shippingMethod;
    order.discount = discount ?? order.discount;

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyOrderById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Orders = await OrderModel.findByPk(req.params.id);

    if (!Orders) {
      return res.status(404).json({ error: "Pedido não encontrada" });
    }

    await Orders.destroy();
    return res.status(200).json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};*/