import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";

import userRoutes from "./routes/UserRoutes";
import ProductRoutes from "./routes/ProdutoctRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import AddressRoutes from "./routes/AddressRoutes";
import LoginRoutes from "./routes/LoginRoutes";

import UserModel from "./models/UserModel";
import ProductModel from "./models/ProductModel";
import CategoryModel from "./models/CategoryModel";
import OrderModel from "./models/OrderModel";
import OrderProductModel from "./models/OrderProduct";
import ShippingMethodModel from "./models/ShippingMethodModel";
import PaymentMethodModel from "./models/PaymentMethodModel";
import PaymentModel from "./models/PaymentModel";
import AddressModel from "./models/AddressModel";
import CommentModel from "./models/CommentModel";

const app = express();
const port = 3000;
dotenv.config();

// HABILITA O CORS PARA O FRONTEND
app.use(
  cors({
    origin: "http://localhost:5173", // ou use '*' durante desenvolvimento
  })
);

app.use(express.json());

// Rotas
app.use(userRoutes);
app.use(CategoryRoutes);
app.use(ProductRoutes);
app.use(CommentRoutes);
app.use(AddressRoutes);
app.use(LoginRoutes);

// Teste de rota base
app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

// Sincronização com banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Database Foi Sincronizado Com Sucesso!!!");
  })
  .catch((error) => {
    console.log("A Base De Dados Não Foi Inicializada Com Sucesso!!!", error);
  });

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});

// Associações (relacionamentos entre modelos)
UserModel.hasMany(AddressModel, { foreignKey: "id_user" });
AddressModel.belongsTo(UserModel, { foreignKey: "id_user" });

UserModel.hasMany(OrderModel, { foreignKey: "id_user" });
OrderModel.belongsTo(UserModel, { foreignKey: "id_user" });

UserModel.hasMany(CommentModel, { foreignKey: "id_user" });
CommentModel.belongsTo(UserModel, { foreignKey: "id_user" });

OrderModel.hasMany(OrderProductModel, { foreignKey: "id_order" });
OrderProductModel.belongsTo(OrderModel, { foreignKey: "id_order" });

ProductModel.hasMany(OrderProductModel, { foreignKey: "id_product" });
OrderProductModel.belongsTo(ProductModel, { foreignKey: "id_product" });

OrderModel.belongsTo(ShippingMethodModel, { foreignKey: "id_shippingMethod" });
ShippingMethodModel.hasMany(OrderModel, { foreignKey: "id_shippingMethod" });

PaymentModel.belongsTo(OrderModel, { foreignKey: "id_order" });
OrderModel.hasMany(PaymentModel, { foreignKey: "id_order" });

PaymentModel.belongsTo(PaymentMethodModel, { foreignKey: "id_paymentMethod" });
PaymentMethodModel.hasMany(PaymentModel, { foreignKey: "id_paymentMethod" });

CategoryModel.hasMany(ProductModel, { foreignKey: "ID_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "ID_category" });

ProductModel.hasMany(CommentModel, { foreignKey: "id_product" });
CommentModel.belongsTo(ProductModel, { foreignKey: "id_product" });

// Exporte modelos se necessário
export {
  UserModel,
  ProductModel,
  CategoryModel,
  OrderModel,
  OrderProductModel,
  ShippingMethodModel,
  PaymentMethodModel,
  PaymentModel,
  AddressModel,
  CommentModel,
};
