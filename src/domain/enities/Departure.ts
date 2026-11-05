import {DepartureDelay} from "../value-objects/DepartureDelay";
import {RouteNumber} from "../value-objects/RouteNumber";

export interface Departure {
    id: string;
    routeId: number | string;
    headsign: string;
    theoreticalTime: string;
    estimatedTime?: string | null;
    delayInSeconds: number | null;
}