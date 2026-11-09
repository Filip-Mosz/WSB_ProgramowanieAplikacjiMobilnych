import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { IPasswordHasher } from '../domain/repositories/IPasswordHasher';
import {User} from "@/src/domain/enities/User";

export class LoginUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async execute(username: string, password: string): Promise<User> {
        const trimmedUsername = username.trim();
        const user = await this.authRepo.findByUsername(trimmedUsername);

        if (!user || !this.passwordHasher.verify(password, user.passwordHash)) {
            throw new Error('Nieprawidłowy login lub hasło.');
        }

        return user;
    }
}