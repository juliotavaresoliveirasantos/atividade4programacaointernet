import express from 'express';
import session from 'express-session';
import cors from 'cors'; // Importe o CORS aqui
import rotaLogin from './rotas/rotaLogin.js';
import autenticar from './seguranca/autenticar.js';
import sequelize from './config/database.js';
import eventoRoutes from './rotas/eventoRoutes.js'; 
import ingressoRoutes from './rotas/ingressoRoutes.js'; // Importação das rotas de ingressos
import './models/associations.js'; // Importa as associações

const app = express(); // Inicialização do Express

const host = 'localhost';
const porta = 4000;

// Adicionar o middleware CORS para permitir requisições do front-end
app.use(cors({
    origin: 'http://localhost:3000', // Permitir requisições apenas do front-end React
    credentials: true, // Se for usar cookies ou autenticação
}));

// Configuração da sessão
app.use(session({
    secret: 'prof3ssorm4n3ir0',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
}));

// Configuração para analisar dados do corpo da requisição
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Para suportar requisições com JSON

// Rotas
app.use("/login", rotaLogin);
app.use("/eventos", eventoRoutes);
app.use("/ingressos", ingressoRoutes); // Adiciona as rotas de ingressos

// Servir arquivos estáticos
app.use(express.static('./publico'));
app.use(autenticar, express.static('./protegido'));

// Inicialização do servidor e conexão ao banco de dados
app.listen(porta, host, async () => {
    try {
        await sequelize.sync(); // Sincroniza os modelos com o banco de dados
        console.log(`Servidor rodando em http://localhost:${porta}`);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
});
