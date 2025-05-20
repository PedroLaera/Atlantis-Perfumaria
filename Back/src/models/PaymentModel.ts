import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import PaymentMethodModel from "./PaymentMethodModel";
import PaymentModel from "./PaymentMethodModel";

class Payment extends Model {
  id_payment!: number;
  id_order!: number;
  id_paymentMethod!: number;
  amountPaid!: number;
  paymentDate!: Date;
}

Payment.init(
  {
    id_payment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /*references: {
        model: OrderModel,
        key: "id_order",
      },*/
    },
    id_paymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "Payment",
    timestamps: false,
  }
);

export default Payment;
