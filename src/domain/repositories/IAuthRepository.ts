import { User } from   '@/src/domain/enities/User';

export interface IAuthRepository{
    findByUsername(username: string): Promise<User | null>;
    createUser(user: User): Promise<void>;
}