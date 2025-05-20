import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  ID_category!: number;
  name!: string;
}

Category.init(
  {
    ID_category: {
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
    modelName: "Category",
    tableName: "Category",
    timestamps: false,
  }
);

export default Category;
