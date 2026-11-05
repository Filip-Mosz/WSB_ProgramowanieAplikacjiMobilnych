import { Departure } from '@/src/domain/enities/Departure';
import { IZtmApiRepository } from '@/src/domain/repositories/IZtmApiRepository';

export class GetLiveDeparturesUseCase {
    constructor(private readonly apiRepo: IZtmApiRepository) {}

    public async execute(stopId: number): Promise<Departure[]> {
        const departures = await this.apiRepo.fetchDepartures(stopId);
        const now = Date.now();

        return departures.filter((dep) => {
            const timeStr = dep.estimatedTime || dep.theoreticalTime;
            if (!timeStr) return true;

            let depTimestamp: number;
            if (timeStr.includes('T') || timeStr.includes('-')) {
                depTimestamp = new Date(timeStr).getTime();
            } else {
                const [hours, minutes] = timeStr.split(':').map(Number);
                const depDate = new Date();
                depDate.setHours(hours, minutes, 0, 0);
                depTimestamp = depDate.getTime();
            }

            if (Number.isNaN(depTimestamp)) return true;

            const diffInMinutes = (depTimestamp - now) / (1000 * 60);
            return diffInMinutes >= -2;
        });
    }
}