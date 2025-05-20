/*import { Request, Response } from "express";
import Order from "../models/OrderModel";
import OrderProduct from "../models/OrderProduct";
import Product from "../models/ProductModel";
import ShippingMethod from "../models/ShippingMethodModel";
import sequelize from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";

// Adicionar produto ao carrinho (sem criar pedido ainda)
const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity, user } = req.body;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }
  
    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Verifica se o usuário já tem um pedido ativo (status "CART")
    let order = await Order.findOne({
      where: { id_user: user.id_user, status: "CART" },
    });

    // Se não houver pedido, cria um novo
    if (!order) {
      order = await Order.create({
        id_user: user.id_user,
        status: "CART", // Status inicial do pedido
        orderDate: new Date(),
        totalAmount: 0, 
        shippingFee: 0,
      });
    }

    // Verifica se o item já está no carrinho do usuário
    const existingItem = await OrderProduct.findOne({
      where: {
        id_order: order.id_order, 
        id_product: productId,
      },
    });

    if (existingItem) {
      // Atualiza a quantidade corretamente
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
      await existingItem.save();
    } else {
      // Adiciona novo item ao carrinho
      await OrderProduct.create({
        id_order: order.id_order,
        id_product: productId,
        quantity: quantity,
      });
    }

    // Atualiza o total do pedido
    order.totalAmount = Number(order.totalAmount) + Number(product.price) * Number(quantity);
    await order.save();

    return res.status(200).json({ message: "Produto adicionado/atualizado no carrinho", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
  }
};

// Finalizar o checkout e criar a ordem
const finalizeCheckout = async (req: Request, res: Response) => {
  const { userId, shippingMethodId, discount = 0 } = req.body;

  const transaction = await sequelize.transaction(); // Inicia transação

  try {
    const shippingMethod = await ShippingMethod.findByPk(shippingMethodId);
    if (!shippingMethod) {
      return res.status(400).json({ error: "Método de envio inválido" });
    }

    // Obtém o pedido ativo do usuário
    const order = await Order.findOne({
      where: { id_user: userId, status: "CART" },
      transaction,
    });

    if (!order) {
      return res.status(400).json({ error: "O carrinho está vazio" });
    }

    // Atualiza os dados do pedido
    order.status = "PENDING";
    order.id_shippingMethod = shippingMethodId;
    order.totalAmount = Number(order.totalAmount) - Number(discount);
    //order.shippingFee = shippingMethod.fee; // Define taxa de envio
    order.discount = discount;
    await order.save({ transaction });

    await transaction.commit(); // Confirma a transação
    return res.status(201).json({ message: "Pedido criado com sucesso", order });
  } catch (error) {
    await transaction.rollback(); // Desfaz alterações se houver erro
    console.error(error);
    return res.status(500).json({ error: "Erro ao finalizar o checkout" });
  }
};

export { addToCart, finalizeCheckout };*/
