import {databasePromise} from "./database";
import {IPasswordHasher} from "@/src/domain/repositories/IPasswordHasher";

export class SqliteAuthRepository {
    constructor(
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async register(
        username:string,
        password: string
    ): Promise<void> {
        const db = await databasePromise;
        const passwordHash = await this.passwordHasher.hash(password);
        await db.runAsync(
            `INSERT INTO users (username, passwordHash)
                    VALUES (?,?)`,
            username,
            passwordHash
        );
    }

    async login(
        username: string,
        password: string
    ): Promise<boolean> {
        const db = await databasePromise;

        const user = await db.getFirstAsync<{
            id: number;
            username: string;
            passwordHash: string;
        }>(
            `SELECT id, username, passwordHash
            FROM users
            WHERE username = ?`,
                username
        );

        if (!user) {
            return false
        }

        return this.passwordHasher.verify(
            password, user.passwordHash
        );
    }
}