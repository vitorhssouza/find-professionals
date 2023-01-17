const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');

const Endereco = sequelize.define('endereco', {
    id_endereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    logadouro: {type: DataTypes.STRING(250), allowNull: false},
    numero: {type: DataTypes.STRING(45), allowNull: false},
    bairro: {type: DataTypes.STRING(150), allowNull: false},
    cidade: {type: DataTypes.STRING(250), allowNull: false},
    cep: {type: DataTypes.STRING(45), allowNull: false},
    estado: {type: DataTypes.CHAR(2), allowNull: false},
})

module.exports = Endereco;

