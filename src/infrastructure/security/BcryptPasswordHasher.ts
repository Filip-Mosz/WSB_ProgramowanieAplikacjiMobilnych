import bcrypt from "bcryptjs";
import { IPasswordHasher } from "@/src/domain/repositories/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher {
        async hash(password: string): Promise<string>{
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password);
        }

        async verify(
            password: string,
            passwordHash: string
        ): Promise<boolean>{
            return bcrypt.compareSync(password, passwordHash);
        }
    }