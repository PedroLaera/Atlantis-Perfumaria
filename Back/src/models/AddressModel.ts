import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import OrderModel from "./OrderModel";

class Address extends Model {
  ID_address!: number;
  number!: number;
  complement!: number;
  neighborhood!: number;
  city!: number;
  state!: Date;
  zipCode!: number;
  id_user!: number;
  ID_order!: number;
}

Address.init(
  {
    ID_address: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Address",
    timestamps: false,
  }
);

export default Address;
