import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import OrderModel from "./OrderModel";
import AddressModel from "./AddressModel";
import CommentModel from "./CommentModel";

class User extends Model {
  id_user!: number;
  name!: string;
  email!: string;
  CPF!: string;
  password!: string;
  address?: string;
  cart_creation_date!: Date;

  public async validatePassword(password: string): Promise<boolean> {
    const incript = await bcrypt.compare(password, this.password);

    return incript;
  }
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true /* em testes deve usar um email variado */,
    },
    CPF: {
      type: DataTypes.STRING(14),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    /*address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },*/
    cart_creation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: false,
  }
);

/*User.beforeCreate(async (user: User) => {
  await user.hashPassword();
});

User.beforeUpdate(async (user: User) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});*/

export default User;
