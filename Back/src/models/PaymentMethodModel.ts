import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import PaymentMethodModel from "./PaymentModel";

class PaymentMethod extends Model {
  id_paymentMethod!: number;
  name!: string;
}

PaymentMethod.init(
  {
    id_paymentMethod: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
    tableName: "PaymentMethod",
    timestamps: false,
  }
);

export default PaymentMethod;
