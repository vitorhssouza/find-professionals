const express = require('express');                 // Importando pacote/módulo express
const exphbs = require('express-handlebars');       // Importando pacote/módulo Express-Handlebars
const app = express();  

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

app.listen(3000)