import {IAuthRepository} from "@/src/domain/repositories/IAuthRepository";
import {IStopRepository} from "@/src/domain/repositories/IStopRepository";
import {IZtmApiRepository} from "@/src/domain/repositories/IZtmApiRepository";
import {IPasswordHasher} from "@/src/domain/repositories/IPasswordHasher";
import {SqliteAuthRepository} from "@/src/infrastructure/storage/SqliteAuthRepository";
import {SqliteStopRepository} from "@/src/infrastructure/storage/SqliteStopRepository";
import {ZtmApiClient} from "@/src/infrastructure/api/ZtmApiClient";
import {BcryptPasswordHasher} from "@/src/infrastructure/security/BcryptPasswordHasher";
import {RegisterUserUseCase} from "@/src/use-cases/RegisterUserUseCase";
import {LoginUserUseCase} from "@/src/store/LoginUserUseCase";
import {SyncStopsUseCase} from "@/src/use-cases/SyncStopsUseCase";
import {GetLiveDeparturesUseCase} from "@/src/use-cases/GetLiveDeparturesUseCase";

class AppContainer {
    private _authRepo?: IAuthRepository;
    private _stopRepo?: IStopRepository;
    private _apiRepo?: IZtmApiRepository;
    private _passwordHasher?: IPasswordHasher;
    // private _locationService?: ILocationService;

    public get authRepository(): IAuthRepository {
        if (!this._authRepo) this._authRepo = new SqliteAuthRepository();
        return this._authRepo;
    }

    public get stopRepository(): IStopRepository {
        if (!this._stopRepo) this._stopRepo = new SqliteStopRepository();
        return this._stopRepo;
    }

    public get ztmApiRepository(): IZtmApiRepository {
        if (!this._apiRepo) this._apiRepo = new ZtmApiClient();
        return this._apiRepo;
    }

    public get passwordHasher(): IPasswordHasher {
        if (!this._passwordHasher) this._passwordHasher = new BcryptPasswordHasher();
        return this._passwordHasher;
    }

    // public get locationService(): ILocationService {
    //     if (!this._locationService) this._locationService = new ExpoLocationService();
    //     return this._locationService;
    // }

    public get registerUserUseCase(): RegisterUserUseCase {
        return new RegisterUserUseCase(this.authRepository, this.passwordHasher);
    }

    public get loginUserUseCase(): LoginUserUseCase {
        return new LoginUserUseCase(this.authRepository, this.passwordHasher);
    }

    public get syncStopsUseCase(): SyncStopsUseCase {
        return new SyncStopsUseCase(this.stopRepository, this.ztmApiRepository);
    }

    public get liveDeparturesUseCase(): GetLiveDeparturesUseCase {
        return new GetLiveDeparturesUseCase(this.ztmApiRepository);
    }
}

export const container = new AppContainer();