export class RouteNumber{
    public readonly value: string;

    constructor(rawRouteId: number | string | null | undefined) {
        this.value = RouteNumber.normalize(rawRouteId);
    }

    private static normalize(raw: number | string | null | undefined): string{
        if (raw === null || raw === undefined){
            return '?';
        }
        const trimmed = String(raw).trim();
        if (!trimmed) {
            return '?';
        }

        const numericVal = Number(trimmed);
        if (!Number.isNaN(numericVal) && Number.isInteger(numericVal)){
            //usuniecie prefiksu operatora (>= 10000)
            if (numericVal >= 10000){
                return String(numericVal % 10000);
            }
            return String(numericVal);
        }
        return trimmed.toUpperCase();
    }

    public isNightLine(): boolean{
        return this.value.startsWith('N');
    }

    public equals(other: RouteNumber | null | undefined): boolean{
        if (!other){
            return false;
        }
        return this.value === other.value;
    }

    public toString(): string{
        return this.value;
    }
}