import { Coordinates } from '@/src/domain/value-objects/Coordinates';

export class Stop {
    constructor(
        public readonly stopId: number,
        public readonly stopName: string,
        public readonly coordinates: Coordinates,
        public readonly stopDesc?: string,
        public readonly notes?: string
    )
    {
        if (!stopId || stopId <= 0) {
            throw new Error(`Nieprawidłowyidentyfikator przystanku: ${stopId}`);
        }
        if (!stopName?.trim()){
            throw new Error('Nazwa przystanku nie może być pusta.')
        }
    }

    public distanceToInMeters(target: Coordinates): number{
        return this.coordinates.distanceToInMeters(target);
    }

    public withNotes(notes: string): Stop {
        return new Stop(
            this.stopId,
            this.stopName,
            this.coordinates,
            this.stopDesc,
            notes
        )
    }
}