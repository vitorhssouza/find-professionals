const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');
const Endereco = require('../model/Endereco');

const Clientes = sequelize.define('clientes', {
    id_clientes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {type: DataTypes.STRING(100), allowNull: false},
    sobrenome: {type: DataTypes.STRING(100), allowNull: false},
    cpf: {type: DataTypes.STRING(16), allowNull: false},
    contato: {type: DataTypes.STRING(45), allowNull: false},
    email: {type: DataTypes.STRING(70), allowNull: false},
    senha: {type: DataTypes.STRING(500), allowNull: false},


});

Clientes.belongsTo(Endereco, {foreignKey: 'id_endereco'})

module.exports = Clientes;
