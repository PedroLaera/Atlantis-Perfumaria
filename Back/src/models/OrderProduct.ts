import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import ProductModel from "./ProductModel";
import { ShippingMethodModel, UserModel } from "..";

class OrderProduct extends Model {
  id_order_product!: number;
  id_order!: number;
  id_product!: number;
  quantity!: number;
}

OrderProduct.init(
  {
    id_order_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      /* references: {
        model: OrderModel,
        key: 'id_order'
      }*/
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* references: {
        model: ProductModel,
        key: 'id_product'
      }*/
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProduct",
    tableName: "OrderProduct",
    timestamps: false,
  }
);

export default OrderProduct;
