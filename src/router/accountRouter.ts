import express from 'express';
import { AccountController } from '../controller/AccountController';
export const accountRouter = express.Router();

// Caminho base definido no index.ts => app.use('/accounts', accountRouter);
// Então se está dentro do accountRouter, não precisa colocar o caminho /accounts apenas o caminho que vem depois:

const accountController = new AccountController();
accountRouter.get('/', accountController.getAccounts);
accountRouter.get('/:id/balance', accountController.getAccountBalance);
accountRouter.post('/', accountController.createAccount);
accountRouter.put('/:id/balance', accountController.editAccountBalance);
