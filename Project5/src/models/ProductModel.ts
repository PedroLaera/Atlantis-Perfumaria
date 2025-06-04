import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import CategoryModel from "./CategoryModel";

class Product extends Model {
  id_product!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  ID_category!: number;
}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* references: {
        model: CategoryModel,
        key: "ID_category",
      },*/
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Product",
    timestamps: false,
  }
);

export default Product;
