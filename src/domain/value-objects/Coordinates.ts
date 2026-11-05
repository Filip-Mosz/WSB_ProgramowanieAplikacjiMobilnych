export class Coordinates{
    constructor(
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly accuracy: number | null = null
    )
    {
        if (Number.isNaN(latitude) || latitude < -90 || latitude > 90){
            throw new Error(`Nieprawidłowa szerokość geograficzna: ${latitude}`);
        }
        if (Number.isNaN(longitude) || longitude < -180 || longitude > 180){
            throw new Error(`Nieprawidłowa długosć geograficzna: ${latitude}`);
        }
    }

    public equals(other: Coordinates | null | undefined): boolean{
        if (!other) {
            return false;
        }
        return this.latitude === other.latitude && this.longitude === other.longitude;
    }

    //oblicza odległosć w linii prostej w metrach do innego punktu za pomoca wzoru Haversine'a
    public distanceToInMeters(other: Coordinates): number{
        const R = 6371e3; //promień ziemii w metrach
        const toRad = (deg: number) => (deg * Math.PI) / 180;

        const dLat= toRad(other.latitude - this.latitude);
        const dLon = toRad(other.longitude - this.longitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(this.latitude)) *
            Math.cos(toRad(other.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return Math.round(R * c);
    }
}