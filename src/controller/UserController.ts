import { Request, Response } from 'express';
import { UserDatabase } from '../database/UserDatabase';
import { User } from '../models/User';
import { UserDB } from '../types';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            // 1. Modelar o objeto de input:
            const input: any = { q: req.query.q as string | undefined };

            const userBusiness = new UserBusiness();
            const output = await userBusiness.getUsers(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error);

            if (res.statusCode === 200) {
                res.status(500);
            }

            if (error instanceof Error) {
                res.send(error.message);
            } else {
                res.send('Erro inesperado');
            }
        }
    };

    public createUser = async (req: Request, res: Response) => {
        try {
            // 1. Modela o objeto de input:
            const input: any = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            // 2. Pega os dados e manda para userBussiness:
            const userBusiness = new UserBusiness();

            //3. Espera uma resposta do userBusiness:
            const output = await userBusiness.createUser(input);

            //4. Manda a resposta para o client:
            res.status(201).send(output);


            // if (typeof id !== 'string') {
            //     res.status(400);
            //     throw new Error("'id' deve ser string");
            // }

            // if (typeof name !== 'string') {
            //     res.status(400);
            //     throw new Error("'name' deve ser string");
            // }

            // if (typeof email !== 'string') {
            //     res.status(400);
            //     throw new Error("'email' deve ser string");
            // }

            // if (typeof password !== 'string') {
            //     res.status(400);
            //     throw new Error("'password' deve ser string");
            // }

            // const userDatabase = new UserDatabase();
            // const userDBExists = await userDatabase.findUserById(id);

            // if (userDBExists) {
            //     res.status(400);
            //     throw new Error("'id' já existe");
            // }

            // const newUser = new User(
            //     id,
            //     name,
            //     email,
            //     password,
            //     new Date().toISOString()
            // ); // yyyy-mm-ddThh:mm:sssZ

            // const newUserDB: UserDB = {
            //     id: newUser.getId(),
            //     name: newUser.getName(),
            //     email: newUser.getEmail(),
            //     password: newUser.getPassword(),
            //     created_at: newUser.getCreatedAt(),
            // };

            // await userDatabase.insertUser(newUserDB);

        } catch (error) {
            console.log(error);

            if (res.statusCode === 200) {
                res.status(500);
            }

            if (error instanceof Error) {
                res.send(error.message);
            } else {
                res.send('Erro inesperado');
            }
        }
    };
}
