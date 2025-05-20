import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? "perfumes_homolog" : "perfumes",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: !isTest,
  }
);

export default sequelize;
