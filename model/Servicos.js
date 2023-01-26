const { INTEGER } = require('sequelize');
const sequelize = require('../db/conn');
const {DataTypes} = require('sequelize');
const Clientes = require('../model/Clientes');
const Prestadores = require('../model/Prestadores');


const Servicos = sequelize.define('servicos', {
    id_servico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao: {type: DataTypes.STRING(300), allowNull: false},
    status: {type: DataTypes.BOOLEAN, allowNull: false}
});


Prestadores.hasMany(Servicos, {foreignKey: 'id_prestadores'});
Servicos.belongsTo(Prestadores, {foreignKey: 'id_prestadores'});

Clientes.hasMany(Servicos, {foreignKey: 'id_clientes'});
Servicos.belongsTo(Clientes, {foreignKey: 'id_clientes'});

module.exports = Servicos;