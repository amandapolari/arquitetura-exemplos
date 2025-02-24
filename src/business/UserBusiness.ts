import { UserDatabase } from '../database/UserDatabase';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/User';
import { UserDB } from '../types';

export class UserBusiness {
    public getUsers = async (input: any) => {
        const { q } = input;

        const userDatabase = new UserDatabase();
        const usersDB = await userDatabase.findUsers(q);

        const users: User[] = usersDB.map(
            (userDB) =>
                new User(
                    userDB.id,
                    userDB.name,
                    userDB.email,
                    userDB.password,
                    userDB.created_at
                )
        );

        const output: any = users;

        return output;
    };

    public createUser = async (input: any) => {
        // Recebe o input(de controller) e valida:
        const { id, name, email, password } = input;

        if (typeof id !== 'string') {
            throw new BadRequestError("'id' deve ser string");
        }

        if (typeof name !== 'string') {
            throw new BadRequestError("'name' deve ser string");
        }

        if (typeof email !== 'string') {
            throw new BadRequestError("'email' deve ser string");
        }

        if (typeof password !== 'string') {
            throw new BadRequestError("'password' deve ser string");
        }

        // Valida se o id já existe:
        const userDatabase = new UserDatabase();
        const userDBExists = await userDatabase.findUserById(id);

        if (userDBExists) {
            throw new BadRequestError("'id' já existe");
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            new Date().toISOString()
        ); // yyyy-mm-ddThh:mm:sssZ

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            created_at: newUser.getCreatedAt(),
        };

        await userDatabase.insertUser(newUserDB);

        // modela o output:
        const output: any = {
            message: 'Usuário criado com sucesso',
            user: newUser,
        };

        // enviar o output para o controller:
        return output;
    };
}
