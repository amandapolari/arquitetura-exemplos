import express from 'express';
import { UserController } from '../controller/UserController';
export const userRouter = express.Router();

const userController = new UserController();

// Caminho base definido no index.ts => app.use('/users', userRouter);
// Então se está dentro do userRouter, não precisa colocar o caminho /users apenas o caminho que vem depois:

userRouter.get('/', userController.getUsers);
userRouter.post('/', userController.createUser);
