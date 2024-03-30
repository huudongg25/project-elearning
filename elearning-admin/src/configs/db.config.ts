import mysql2 from "mysql2";
import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();
const sequelize = new Sequelize("project_elearning", "root", "optimusfime", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
