const express = require('express');                 // Importando pacote/módulo express
const exphbs = require('express-handlebars');       // Importando pacote/módulo Express-Handlebars
const app = express();  
const conn = require('./db/conn')               // Importando o arquivo banco_dados da pasta database


// Importando modulos de autenticação 
const session = require('express-session');
const FileStore = require('session-file-store')(session);


// Importando metodo flash
const flash = require('express-flash');


//Define o Handlebars como Template Engine da nossa aplicação
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração de formulario para receber os dados
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Metodo para reconhecer arquivo css
app.use(express.static('public'));

//Verificando conexão com o base de dados e executando o servidor
conn.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor Executando em localhost:3000");
    });
}).catch((error) => {
    console.log(error);
});