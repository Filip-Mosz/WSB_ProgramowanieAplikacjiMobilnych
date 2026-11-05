export interface ZtmDepartureDto{
    id?: string;
    routeId: number | string;
    headsign: string;
    theoreticalTime: string;
    estimatedTime?: string | null;
    delayInSeconds?: number | null;
    [key: string]: unknown;
}