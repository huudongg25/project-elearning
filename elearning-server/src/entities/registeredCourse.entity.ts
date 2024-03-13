import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { User } from "./users.entity";

export const RegisteredCourse = sequelize.define('registeredCourses',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    progress: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    isFree: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    finallyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    codePayment: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps: true})

RegisteredCourse.belongsTo(User,{foreignKey: "userId", onDelete: "CASCADE", onUpdate:"CASCADE"})
User.hasMany(RegisteredCourse,{foreignKey:"userId"})