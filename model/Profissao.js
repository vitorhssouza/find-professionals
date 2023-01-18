const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');
const Prestadores = require('./Prestadores')

const Profissoes = sequelize.define('profissao', {
    id_profissao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao: {type: DataTypes.STRING, allowNull: false}
});



module.exports = Profissoes;
