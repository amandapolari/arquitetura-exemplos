import express from 'express';
import cors from 'cors';
import { userRouter } from './router/userRouter';
import { accountRouter } from './router/accountRouter';

const app = express();

// Libera acesso externo:
app.use(cors());

// Permite lidar com json:
app.use(express.json());

// Iniciando servidor:
app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`);
});

// Toda vez que um endpoint, seja ele qual for apresentar o caminho /users, ele vai chamar o userRouter:
app.use('/users', userRouter);

// Toda vez que um endpoint, seja ele qual for apresentar o caminho /accounts, ele vai chamar o accountRouter:
app.use('/accounts', accountRouter);
