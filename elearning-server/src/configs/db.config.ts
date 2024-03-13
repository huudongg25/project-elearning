import mysql2 from 'mysql2';
import {config} from 'dotenv';
import { Sequelize } from 'sequelize';

config();
const sequelize = new Sequelize(String(process.env.DB_NAME),String(process.env.DB_USER),String(process.env.DB_PASS),{
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

export default sequelize;