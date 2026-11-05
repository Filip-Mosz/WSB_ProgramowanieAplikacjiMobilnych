import {DepartureDelay} from "../value-objects/DepartureDelay";
import {RouteNumber} from "../value-objects/RouteNumber";

export class Departure {
    public readonly routeNumber: RouteNumber;
    public readonly delay: DepartureDelay;

    constructor(
        public readonly id: string,
        rawRouteId: number | string,
        public readonly headsign: string,
        public readonly theoreticalTime: string,
        public readonly estimatedTime?: string,
        rawDelayInSeconds?: number | null
    ) {
        this.routeNumber = new RouteNumber(rawRouteId);
        this.delay = new DepartureDelay(rawDelayInSeconds);
    }
}