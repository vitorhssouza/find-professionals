const mysql = require('mysql2');                        //Importando a biblioteca mysql2          
const {Sequelize} = require('sequelize');               //Importando o sequelize
const senha = require('../oculto/senha');               //Importando o arquivo senha

const sequelize = new Sequelize('novo_clube', 'root', senha, {host: 'localhost', dialect: 'mysql'});

try {
    sequelize.authenticate();
    console.log('Banco de Dados Conectado com Sucesso');
} catch (error) {
    console.log('Error ao conectar com o DB' + error)
}

module.exports = sequelize;
