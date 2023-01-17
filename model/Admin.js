const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');

const Administradores = sequelize.define('admin', {
    id_admin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {type: DataTypes.STRING(100), allowNull: false},
    sobrenome: {type: DataTypes.STRING(100), allowNull: false},
    cpf: {type: DataTypes.STRING(16), allowNull: false},
    email: {type: DataTypes.STRING(70), allowNull: false},
    senha: {type: DataTypes.STRING(500), allowNull: false},
})

module.exports = Administradores;

