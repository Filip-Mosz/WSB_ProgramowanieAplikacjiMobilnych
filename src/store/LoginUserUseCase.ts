import {User} from "@/src/domain/enities/User";
import {IAuthRepository} from "@/src/domain/repositories/IAuthRepository";
import { IPasswordHasher} from "@/src/domain/repositories/IPasswordHasher";

export class LoginUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async execute(username: string, password: string): Promise<User>{
        const trimmedUserName = username.trim();
        const user = await this.authRepo.findByUsername(trimmedUserName);

        if (!user || this.passwordHasher.verify(password, user.passwordHash)){
            throw new Error('Niepoprawny login lub hasło.');
        }

        return user;
    }
}