import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

export const Course = sequelize.define('courses',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    level: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    completedContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    priority: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isComingSoon: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    isFree: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    isSelling: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    isFinished: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    publishedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},{timestamps:true})