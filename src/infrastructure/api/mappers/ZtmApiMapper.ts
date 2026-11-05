import { Departure} from "@/src/domain/enities/Departure";
import {ZtmStopDto} from "@/src/infrastructure/api/ZtmStopDto";
import {Stop} from "@/src/domain/enities/Stop";
import {Coordinates} from "@/src/domain/value-objects/Coordinates";
import {ZtmDepartureDto} from "@/src/infrastructure/api/ZtmDepartureDto";

export class ZtmApiMapper{
    public static toStopEntity(dto: ZtmStopDto): Stop{
        const fallbackName =
            dto.stopName?.trim() ||
            dto.stopDesc?.trim() ||
            `Przystanek #${dto.stopId}`;

        const coordinates = new Coordinates(
            Number(dto.stopLat), Number(dto.stopLon)
        );

        return new Stop(
            Number(dto.stopId),
            fallbackName,
            coordinates,
            dto.stopDesc?.trim() || undefined
        );
    }

    public static toDepartureEntity(dto: ZtmDepartureDto, index: number): Departure{
        const id = dto.id || `${dto.routeId}-${dto.theoreticalTime}-${index}`;

        return new Departure(
            id,
            dto.routeId,
            dto.headsign,
            dto.theoreticalTime,
            dto.estimatedTime || undefined,
            dto.delayInSeconds ?? null
        );
    }
}