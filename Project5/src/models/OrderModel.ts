import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";
import ShippingMethod from "./ShippingMethodModel";

export class Order extends Model {
  id_order!: number;
  id_user!: number;
  orderDate!: Date;
  totalAmount!: number;
  shippingFee!: Date;
  status!: string;
  id_shippingMethod!: number;
  discount!: number;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* references: {
        model: User,
        key: "ID_user",
      },*/
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "CART",
        "PENDING",
        "PAID",
        "SHIPPED",
        "DELIVERED",
        "CANCELED"
      ),
      allowNull: false,
    },
    id_shippingMethod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      /* references: {
        model: ShippingMethod,
        key: "ID_shippingMethod",
      },*/
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Order",
    timestamps: false,
  }
);

export default Order;
