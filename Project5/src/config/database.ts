import { Sequelize } from "sequelize";
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  (isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME)!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
    logging: !isTest,
  }
);

if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database sincronizado com Sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
      process.exit(1); // Encerra o processo se a conexão falhar
    }
  })();
}

export default sequelize;
