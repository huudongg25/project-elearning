import mysql2 from 'mysql2';
import {config} from 'dotenv';
import { Sequelize } from 'sequelize';

config();
const sequelize = new Sequelize("project_elearning","root",String(process.env.DB_PASS),{
    host: "localhost",
    dialect: 'mysql'
})

export default sequelize;