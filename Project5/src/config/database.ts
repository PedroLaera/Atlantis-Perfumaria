import { Sequelize } from "sequelize";
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST!,
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
