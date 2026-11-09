import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { IPasswordHasher } from '../domain/repositories/IPasswordHasher';
import {User} from "@/src/domain/enities/User";

export class RegisterUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async execute(username: string, password: string): Promise<User> {
        const trimmedUsername = username.trim();

        if (!trimmedUsername || password.length < 4) {
            throw new Error('Hasło musi mieć co najmniej 4 znaki, a login nie może być pusty.');
        }

        const existing = await this.authRepo.findByUsername(trimmedUsername);
        if (existing) {
            throw new Error('Użytkownik o podanym loginie już istnieje.');
        }

        const passwordHash = this.passwordHasher.hash(password);

        const newUser: User = {
            id: Date.now().toString(),
            username: trimmedUsername,
            passwordHash,
        };

        await this.authRepo.createUser(newUser);
        return newUser;
    }
}