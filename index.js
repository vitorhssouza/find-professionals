const express = require('express');                 // Importando pacote/módulo express
const exphbs = require('express-handlebars');       // Importando pacote/módulo Express-Handlebars
const app = express();  
const conn = require('./db/conn')               // Importando o arquivo banco_dados da pasta database

// Criando os models
const Endereco = require('./model/Endereco')
const Admin = require('./model/Admin')
const Clientes = require('./model/Clientes')
const Prestadores = require('./model/Prestadores')
const Profissoes = require('./model/Profissoes')
const Servicos = require('./model/Servicos')

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


// Parametro de autenticação 
app.use(
    session({
        name: 'session',
        secret: 'nosso-secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now(), + 360000),
        httpOnly: true
    }
    })
);

//Seta sessões para requisição de Cliente
app.use((req, res, next) => {
    if(req.session.userIdCliente){
        res.locals.session = req.session
    }
    next()
});

//Seta sessões para requisição de Prestador
app.use((req, res, next) => {
    if(req.session.userIdPrestador){
        res.locals.session = req.session
    }
    next()
});

// Requisição de admin
app.use((req, res, next) => {
    if(req.session.userIdAdmin){
        res.locals.session = req.session
    }
    next()
});



// configurando flash messagens
app.use(flash());


// Importando a rota principal 
const home = require('./routers/homeRoutes')
app.use('/', home)

// Importando rota principal adm
const adminHome = require('./routers/adminRoutes')
app.use('/', adminHome)

// Importando rota principal cliente
const clientesHome = require('./routers/clientesRoutes')
app.use('/', clientesHome)

// Importando rota principal de prestador
const prestadorHome = require('./routers/prestadoresRoutes')
app.use('/', prestadorHome)


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