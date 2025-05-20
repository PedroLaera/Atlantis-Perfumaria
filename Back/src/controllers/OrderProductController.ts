/*import { Request, Response } from "express";
const { OrderProduct, Order, Product } = require("../models"); // Ajuste os caminhos conforme necessário

// Adicionar um produto ao carrinho
const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, quantity } = req.body;

    // Verifica se o pedido já existe
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Verifica se o item já está no carrinho (status 'CART')
    const existingItem = await OrderProduct.findOne({
      where: {
        id_order: orderId,
        id_product: productId,
        status: "CART",
      },
    });

    if (existingItem) {
      // Se o item já existe, atualiza a quantidade
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({
        message: "Produto atualizado no carrinho",
        item: existingItem,
      });
    } else {
      // Se o item não existe, cria um novo item no carrinho
      const newItem = await OrderProduct.create({
        id_order: orderId,
        id_product: productId,
        quantity: quantity,
        status: "CART",
      });
      return res
        .status(201)
        .json({ message: "Produto adicionado ao carrinho", item: newItem });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao adicionar o produto ao carrinho" });
  }
};

// Obter os itens do carrinho
const getCartItems = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // Verifica se o pedido existe
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    // Obtém todos os itens do carrinho (status 'CART')
    const cartItems = await OrderProduct.findAll({
      where: {
        id_order: orderId,
        status: "CART",
      },
      include: [
        { model: Product, attributes: ["id_product", "name", "price"] }, // Inclui as informações do produto
      ],
    });

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao obter os itens do carrinho" });
  }
};

// Finalizar o pedido (transferir itens do carrinho para o pedido)
const finalizeOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // Verifica se o pedido existe
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    // Verifica se já existem itens no carrinho
    const cartItems = await OrderProduct.findAll({
      where: {
        id_order: orderId,
        status: "CART",
      },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        error: "Carrinho vazio, adicione produtos antes de finalizar o pedido",
      });
    }

    // Atualiza os itens do carrinho para 'ORDERED' e associa ao pedido
    await OrderProduct.update(
      { status: "ORDERED" },
      { where: { id_order: orderId, status: "CART" } }
    );

    return res
      .status(200)
      .json({ message: "Pedido finalizado com sucesso", orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao finalizar o pedido" });
  }
};

module.exports = {
  addProductToCart,
  getCartItems,
  finalizeOrder,
};*/
