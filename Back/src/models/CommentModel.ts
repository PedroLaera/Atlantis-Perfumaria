import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import ProductModel from "./ProductModel";

class Comment extends Model {
  id_comment!: number;
  id_user!: number;
  id_product!: number;
  content!: number;
  rating!: number;
  creation_date!: Date;
}

Comment.init(
  {
    id_comment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      /*  allowNull: false,
      references: {
        model: UserModel,
        key: "id_user",
      },*/
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /*references: {
        model: ProductModel,
        key: "id_product",
      },*/
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "Comment",
    timestamps: false,
  }
);

export default Comment;
