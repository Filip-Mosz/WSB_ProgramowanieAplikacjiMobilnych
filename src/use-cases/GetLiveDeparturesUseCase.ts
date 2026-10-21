import {Departure} from "@/src/domain/enities/Departure";
import { IZtmApiRepository } from "@/src/domain/repositories/IZtmApiRepository";

export class GetLiveDeparturesUseCase {
    constructor(
        private readonly repository: IZtmApiRepository
    ) {}

    async execute(stopId: number): Promise<Departure[]> {
        const departures =
            await this.repository.fetchDepartures(stopId);

        const now = Date.now();
        const cutoff = now - 2 * 60 * 1000;

        return departures.filter((departure) => {
            const departureTimestamp = Date.parse(
                departure.estimatedTime ?? departure.theoreticalTime
            );

            const now = Date.now();

            const isExpired =
                Number.isFinite(departureTimestamp) &&
                departureTimestamp < now - 2 * 60 * 1000;

            if (!Number.isFinite(departureTimestamp)) {
                return false;
            }

            return departureTimestamp >= cutoff;
        });
    }
}
