export interface ZtmStopDto{
    stopId: number | string;
    stopName: string | null;
    stopDesc: string | null;
    stopLat: number | string;
    stopLon: number | string;
    [key: string]: unknown;
}