import { UserDatabase } from '../database/UserDatabase';
import { User } from '../models/User';

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
}
