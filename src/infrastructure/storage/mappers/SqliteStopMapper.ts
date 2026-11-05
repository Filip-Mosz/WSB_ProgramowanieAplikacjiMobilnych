import {SqliteStopRowDto} from "@/src/infrastructure/storage/dto/SqliteStopRowDto";
import {Coordinates} from "@/src/domain/value-objects/Coordinates";
import {Stop} from "@/src/domain/enities/Stop";

export class SqliteStopMapper{
    public static toEntity(row: SqliteStopRowDto): Stop{
        const coordinates = new Coordinates(row.stopLat, row.stopLon);

        return  new Stop(
            row.stopId,
            row.stopName,
            coordinates,
            row.stopDesc || undefined,
            row.notes || undefined
        );
    }

    public static toRow(entity: Stop): SqliteStopRowDto{
        return {
          stopId: entity.stopId,
          stopName: entity.stopName,
          stopDesc: entity.stopDesc,
          stopLat: entity.coordinates.latitude,
            stopLon: entity.coordinates.longitude,
            notes: entity.notes || null
        };
    }
}