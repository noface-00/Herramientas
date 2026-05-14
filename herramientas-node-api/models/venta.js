const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2), 
        defaultValue: 0
    }
}, {
    tableName: 'venta',
    timestamps: true 
});

module.exports = Venta;