import {IStopRepository} from "@/src/domain/repositories/IStopRepository";
import {IZtmApiRepository} from "@/src/domain/repositories/IZtmApiRepository";
import {Stop} from "@/src/domain/enities/Stop";

export class SyncStopsUseCase {
    constructor(
        private readonly stopRepo: IStopRepository,
        private readonly apiRepo: IZtmApiRepository
    ) {}

    public async execute(forceRefresh = false): Promise<Stop[]> {
        await this.stopRepo.initDatabase();

        if (!forceRefresh) {
            const cachedStops = await this.stopRepo.getAllStops();
            if (cachedStops.length > 0) {
                return cachedStops;
            }
        }

        const remoteStops = await this.apiRepo.fetchStopsFromApi();
        await this.stopRepo.saveStops(remoteStops);
        return remoteStops;
    }
}