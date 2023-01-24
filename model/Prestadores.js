const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');
const Endereco = require('../model/Endereco');
const Profissoes = require('./Profissoes');

const Prestadores = sequelize.define('prestadores', {
    id_prestadores: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {type: DataTypes.STRING(100), allowNull: false},
    sobrenome: {type: DataTypes.STRING(100), allowNull: false},
    cpf_cnpj: {type: DataTypes.STRING(16), allowNull: false},
    contato: {type: DataTypes.STRING(45), allowNull: false},
    email: {type: DataTypes.STRING(70), allowNull: false},
    senha: {type: DataTypes.STRING(500), allowNull: false},
});

Prestadores.belongsTo(Endereco, {foreignKey: 'id_endereco'})
Profissoes.belongsTo(Prestadores, {foreignKey: 'id_prestadores'})

Prestadores.hasMany(Profissoes, {foreignKey: 'id_prestadores'})

module.exports = Prestadores;

