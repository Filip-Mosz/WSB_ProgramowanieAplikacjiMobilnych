import {Departure} from "../../domain/enities/Departure";

interface ApiDeparture {
    routeId: string;
    headsign: string;
    theoreticalTime: string;
    estimatedTime?: string | null;
}

export function mapDeparture(item: ApiDeparture): Departure {
    const theoretical = Date.parse(item.theoreticalTime);

    const estimated = item.estimatedTime == null
        ? Number.NaN
        : Date.parse(item.estimatedTime);

    let delayInSeconds: number | null = null;
    if(Number.isFinite(theoretical) && Number.isFinite(estimated)) {//isFinite checks if number isn't infinite(+-) or NaN (parsing error)
        delayInSeconds = Math.round((estimated - theoretical) / 1000);
    }

    return {
        id: `${item.routeId}-${item.theoreticalTime}`,
        routeId: item.routeId,
        headsign: item.headsign,
        theoreticalTime: item.theoreticalTime,
        estimatedTime: item.estimatedTime ?? null,
        delayInSeconds,
    }
}