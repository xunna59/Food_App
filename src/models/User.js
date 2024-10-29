const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db_config');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
});

module.exports = User;
