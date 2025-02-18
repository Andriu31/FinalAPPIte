import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const LocalModel = sequelize.define("local", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duenio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    timestamps: false
  });